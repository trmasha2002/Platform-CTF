# -*- coding: utf-8 -*-StringField

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Length, ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


def latinica_only(form, field):
    if not re.match(pattern, str(field.data)):
        raise ValidationError('Допустим ввод латинских букв, цифр, -, _')


class ChangeNameForm(FlaskForm):
    name = StringField(label='Новое название команды', validators=[DataRequired(message='Это обязательное поле.')])
    submit = SubmitField('Сохранить изменения')


class ChangeCityForm(FlaskForm):
    city = StringField(label='Новый город команды', validators=[DataRequired(message='Это обязательное поле.')])
    submit = SubmitField('Сохранить изменения')
