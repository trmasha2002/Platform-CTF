# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from wtforms import ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


def latinica_only(form, field):
    if not re.match(pattern, str(field.data)):
        raise ValidationError('Символы могут включать в себя латинские буквы, номера, или - _')


class LoginForm(FlaskForm):
    login = StringField(validators=[latinica_only, DataRequired(message='Заполните все поля!')])
    password = StringField(validators=[DataRequired(message='Заполните все поля!')])
