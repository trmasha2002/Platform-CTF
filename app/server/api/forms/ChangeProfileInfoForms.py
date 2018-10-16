# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Length, ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


def latinica_only(form, field):
    if not re.match(pattern, str(field.data)):
        raise ValidationError('Символы могут включать в себя латинские буквы, номера, или - _')



class ChangeNameForm(FlaskForm):
    name = StringField(label='Новое имя', validators=[DataRequired(message='Это обязательное поле.')])
    submit = SubmitField('Сохранить изменения')


class ChangeSurnameForm(FlaskForm):
    surname = StringField(label='Новая фамилия', validators=[DataRequired(message='Это обязательное поле.')])
    submit = SubmitField('Сохранить изменения')


class ChangeEmailForm(FlaskForm):
    email = StringField(label='Новая электронная почта', validators=[DataRequired(message='Это обязательное поле.')])
    password = PasswordField(label='Пароль для подтверждения', validators=[DataRequired(message='Заполните все поля!')])
    submit = SubmitField('Сохранить изменения')


class ChangePasswordForm(FlaskForm):
    old_password = PasswordField(label='Cтарый пароль', validators=[DataRequired(message='Это обязательное поле.')])
    new_password = PasswordField(label='Новый пароль', validators=[DataRequired(message='Это обязательное поле.'), Length(min=6, max=35), latinica_only])
    new_password_confirm = PasswordField(label='Новый пароль снова', validators=[EqualTo('new_password', message='Пароли должны совпадать'),
                                                                                 DataRequired(message='Это обязательное поле.'), Length(min=6, max=35)])
    submit = SubmitField('Сохранить изменения')
