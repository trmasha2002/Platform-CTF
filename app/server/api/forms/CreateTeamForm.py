from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateTeamForm(FlaskForm):
    name = StringField(label='Название', validators=[DataRequired(message='Это обязательное поле.')])
    city = StringField(label='Город', validators=[DataRequired(message='Это обязательное поле.')])
