# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ConfirmCodeForm(FlaskForm):
    code = StringField(label='Код подтверждения', validators=[DataRequired(message='Это обязательное поле.')])
