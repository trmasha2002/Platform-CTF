# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired, Length, Email, EqualTo
from wtforms import ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


class TaskForm(FlaskForm):
    name = StringField(label='Название', validators=[DataRequired(message='Это обязательное поле.')])
    info = StringField(label='Информация', validators=[DataRequired(message='Это обязательное поле.')])
    score = IntegerField(label='Очки', validators=[DataRequired(message='Это обязательное поле.')])
    type = StringField(label='Тип', validators=[DataRequired(message='Это обязательное поле.')])
    flag = StringField(label='Флаг', validators=[DataRequired(message='Это обязательное поле.')])
    tournament = IntegerField(label='Турнир', validators=[DataRequired(message='Это обязательное поле.')])
