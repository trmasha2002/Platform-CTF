# -*- coding: utf-8 -*-StringField

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateTimeField, RadioField
from wtforms.validators import DataRequired, EqualTo, Length, ValidationError
import re

pattern = r'^[A-Za-z0-9_-]*$'


def latinica_only(form, field):
    if not re.match(pattern, str(field.data)):
        raise ValidationError('Допустим ввод латинских букв, цифр, -, _')


class ChangeInfoForm(FlaskForm):
    name = StringField(label='Новое название турнира', validators=[DataRequired(message='Это обязательное поле.')])
    description = StringField(label='Новое описание турнира',
                              validators=[DataRequired(message='Это обязательное поле.')])
    time = DateTimeField(label='Новое время турнира', format="%d.%m.%Y %H:%M")
    online = RadioField(label='Изменить формат вашего турнира. Теперь турнир ',
                        choices=[('1', 'Онлайн'), ('0', 'Оффлайн')],
                        validators=[DataRequired(message='Это обязательное поле.')])
    platform = RadioField(label='Изменить платформу вашего турнира. Теперь турнир ',
                          choices=[('1', 'На нашей платформе'), ('0', 'На другой платформе')],
                          validators=[DataRequired(message='Это обязательное поле.')])
    place = StringField(label='Новое место турнира')
    private = RadioField(label='Изменить приватность вашего турнира. Теперь турнир',
                         choices=[('1', 'Приватный'), ('0', 'Публичный')],
                         validators=[DataRequired(message='Это обязательное поле.')])
    time_to_live = DateTimeField(label='Новая длительность вашего турнира',
                                 validators=[DataRequired(message='Это обязательное поле.')], format="%d.%m.%Y %H:%M")
    for_team_allowed = RadioField(label='Изменить доступность вашего турнира всем командам: доступен?',
                                  choices=[('1', 'Да'), ('0', 'Нет')],
                                  validators=[DataRequired(message='Это обязательное поле.')])
