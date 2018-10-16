# -*- coding: utf-8 -*-

from flask import session
from flask_wtf import FlaskForm
from flask_mail import Message

from app.server import db, mail
from .FormController import FormController
from app.server.api.forms.PasswordResetForm import PasswordResetForm
from app.server.api.models.user import User
from app.server.helpers import return_ok_status, return_bad_status

import random


class PasswordResetController(FormController):
    def get_form(self) -> FlaskForm:
        return PasswordResetForm()

    def process(self, form: FlaskForm):
        user = User.query.filter(User.email == form.email.data)
        if user.count():
            random_password = (''.join([random.choice(list('123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'))
                     for x in range(8)]))
            user[0].change_password_by_email(form.email.data, random_password)
            msg = Message('Восстановление пароля', sender="alexkoritsa@yandex.ru", recipients=[form.email.data])
            msg.body = 'Новый пароль: ' + random_password
            mail.send(msg)
            return return_ok_status('Новый пароль выслан на почту.')
        else:
            return return_bad_status('Пользователя с такой почтой не существует.')
