# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm, Form
from wtforms import StringField, PasswordField, RadioField, SelectField, SelectMultipleField, SubmitField, HiddenField, \
    IntegerField, DateField, DateTimeField
from wtforms.validators import DataRequired, Length, Email, EqualTo, Required
from wtforms import ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


def latinica_only(form, field):
    if not re.match(pattern, str(field.data)):
        raise ValidationError("Допустим ввод латинских букв, цифр, -, _")


class AddTournamentForm(FlaskForm):
    name = StringField(label='Введите название Вашего турнира',
                       validators=[DataRequired(message='Это обязательное поле. name')])
    description = StringField(label='Расскажите о Вашем турнире',
                              validators=[DataRequired(message='Это обязательное поле. description')])
    time = DateTimeField(label='Во сколько Вы хотите провести турнир?', format="%d.%m.%Y %H:%M",
                         validators=[DataRequired(message='Это обязательное поле. time')])
    online = RadioField(label='В каком формате будет Ваш турнир?', choices=[('1', 'Онлайн'), ('0', 'Оффлайн')],
                        validators=[DataRequired(message='Это обязательное поле. online')])
    platform = RadioField(label='Ваш турнир будет проводиться у нас?',
                          choices=[('1', 'На нашей платформе'), ('0', 'На другой платформе')],
                          validators=[DataRequired(message='Это обязательное поле. platform')])
    place = StringField(label='Где будет проходить Ваше мероприятие?')
    private = RadioField(label='Ваш турнир будет публичным или приватным?',
                         choices=[('1', 'Приватный'), ('0', 'Публичный')],
                         validators=[DataRequired(message='Это обязательное поле. private')])
    time_to_live = DateTimeField(label='Длительность Вашего турнира', format="%d.%m.%Y %H:%M",
                                 validators=[DataRequired(message='Это обязательное поле. time_to_live')])
    for_team_allowed = RadioField(label='Доступны ли задания Вашего турнира всем командам?',
                                  choices=[('1', 'Да'), ('0', 'Нет')],
                                  validators=[DataRequired(message='Это обязательное поле. for_team_allowed')])
