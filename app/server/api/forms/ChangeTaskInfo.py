# -*- coding: utf-8 -*-StringField

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, EqualTo, Length, ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


def latinica_only(form, field):
    if not re.match(pattern, str(field.data)):
        raise ValidationError('Допустим ввод латинских букв, цифр, -, _')



class ChangeNameForm(FlaskForm):
    name = StringField(label='Новое название таска', validators=[DataRequired(message='Это обязательное поле.')])
    id_task = IntegerField()
    submit = SubmitField('Сохранить изменения')


class ChangeInfoForm(FlaskForm):
    info = StringField(label='Новая информация о таске', validators=[DataRequired(message='Это обязательное поле.')])
    id_task = IntegerField()
    submit = SubmitField('Сохранить изменения')


class ChangeScoreForm(FlaskForm):
    score = IntegerField(label='Новое количество очков за таск', validators=[DataRequired(message='Это обязательное поле.')])
    id_task = IntegerField()
    submit = SubmitField('Сохранить изменения')


class ChangeTypeForm(FlaskForm):
    type = StringField(label='Новый тип таска', validators=[DataRequired(message='Это обязательное поле.')])
    id_task = IntegerField()
    submit = SubmitField('Сохранить изменения')


class ChangeFlagForm(FlaskForm):
    flag = StringField(label='Новый флаг для таска', validators=[DataRequired(message='Это обязательное поле.')])
    id_task = IntegerField()
    submit = SubmitField('Сохранить изменения')


class ChangeResourseForm(FlaskForm):
    resourse = StringField(label='Новое решение таска')
    id_task = IntegerField()
    submit = SubmitField('Сохранить изменения')
