# -*- coding: utf-8 -*-

from flask import session
from flask_wtf import FlaskForm
from hashlib import sha256

from app.server import db
from .FormController import FormController
from app.server.api.forms.ChangeProfileInfoForms import ChangeNameForm, ChangeSurnameForm, ChangeEmailForm, ChangePasswordForm
from app.server.api.models.user import User
from app.server.helpers import return_ok_status, return_bad_status


class ChangeNameController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeNameForm()

    def process(self, form: FlaskForm):
        login = session['username']
        if db.session.query(User.name).filter(User.login == login) != form.name.data:
            User.update_by_login(login, 'name', form.name.data)
            return return_ok_status('Name change.')
        else:
            return return_bad_status('Not change.')


class ChangeSurnameController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeSurnameForm()

    def process(self, form: FlaskForm):
        login = session['username']
        if db.session.query(User.surname).filter(User.login == login) != form.surname.data:
            User.update_by_login(login, 'surname', form.surname.data)
            return return_ok_status('Surname change.')
        else:
            return return_bad_status('Not change.')


class ChangeEmailController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangeEmailForm()

    def process(self, form: FlaskForm):
        login = session['username']
        if db.session.query(User.email).filter(User.login == login) != form.email.data and db.session.query(
                User.password).filter(User.login == login) == sha256(form.password.data.encode()).hexdigest():
            User.update_by_login(login, 'email', form.email.data)
            return return_ok_status('Email change.')
        else:
            return return_bad_status('Not change.')


class ChangePasswordController(FormController):
    def get_form(self) -> FlaskForm:
        return ChangePasswordForm()

    def process(self, form: FlaskForm):
        login = session['username']
        if db.session.query(User.password).filter(User.login == login) != form.old_password.data:
            User.update_by_login(login,'password', form.new_password.data)
            return return_ok_status('Password change.')
        else:
            return return_bad_status('Not change.')

