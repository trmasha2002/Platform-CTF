from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class AddMessageForm(FlaskForm):
    text = StringField(label='Напишите сообщение...', validators=[DataRequired(message='Это обязательное поле.')])
    tournament = IntegerField(label='Турнир', validators=[DataRequired(message='Это обязательное поле.')])
