# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from flask_mail import Message
from hashlib import sha256
import random
from .FormController import FormController
from app.server import mail
from app.server.api.forms.RegForm import RegForm
from app.server.api.models.user import User
from app.server.helpers import return_bad_status, return_ok_status
from string import ascii_letters


def get_random_string(n=8):
    return ''.join(random.choices(ascii_letters,k=n))


class RegController(FormController):
    def get_form(self) -> FlaskForm:
        return RegForm()

    def process(self, form: FlaskForm):
        user = User.query.filter(User.email == form.email.data).count()
        if user:
            return return_bad_status('Пользователь с такой почтой уже существует.')
        user = User.query.filter(User.login == form.login.data).count()
        if user:
            return return_bad_status('Пользователь с таким логином уже существует.')

        code = ''.join([random.choice(list('123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')) for x in range(8)])
        secret_link = 'http://localhost:3000/confirm?code=' + code
        msg = Message('Подтверждение', sender="alexkoritsa@yandex.ru", recipients=[form.email.data])
        msg.body = 'Для подтверждения вашей учетной записи пройдите по этой ссылке: ' + secret_link
        mail.send(msg)
        secret_pass = sha256(form.password.data.encode()).hexdigest()
        user = User(form.name.data, form.email.data, form.login.data, secret_pass, code)
        user.save()
        user_id = User.last_id()
        return return_ok_status(user_id)

