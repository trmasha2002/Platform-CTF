# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PasswordResetForm(FlaskForm):
    email = StringField(label='Почта', validators=[DataRequired(message='Это обязательное поле.')])
