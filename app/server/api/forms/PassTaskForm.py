from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PassTaskForm(FlaskForm):
    id = StringField(validators=[DataRequired('id cant be null')])
    tournament_id = StringField(validators=[DataRequired('id cant be null')])
    flag = StringField(label='Флаг', validators=[DataRequired(message='Это обязательное поле.')])