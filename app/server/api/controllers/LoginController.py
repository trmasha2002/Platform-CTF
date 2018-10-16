# -*- coding: utf-8 -*-

from flask import session
from flask_wtf import FlaskForm
from hashlib import sha256
from .FormController import FormController
from app.server.api.forms.LoginForm import LoginForm
from app.server.api.models.user import User
from app.server.helpers import return_ok_status, return_bad_status


class LoginController(FormController):
    def get_form(self) -> FlaskForm:
        return LoginForm()

    def process(self, form: FlaskForm):
        password = sha256(form.password.data.encode()).hexdigest()
        user = User.query.filter(User.login == form.login.data).filter(User.password == password)
        if user.count():
            if user[0].is_confirmed:
                session['username'] = form.login.data
                session['id'] = user[0].id
                session['team_id'] = user[0].teams[0].name if user[0].teams else 'null'
                data = {
                    'username': session['username'],
                    'id': session['id'],
                    'team_id': session['team_id']
                }
                return return_ok_status(data)
            return return_bad_status('Аккаунт не подтверждён! Введите код подтверждения на почте')
        return return_bad_status('Неправильный логин или пароль!')
