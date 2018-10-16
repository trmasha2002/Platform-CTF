from app.server import db
from app.server.api.controllers.FormController import FormIDController
from app.server.api.forms.ChangeTeamInfo import *
from app.server.api.models import Team
from app.server.helpers import *


class ChangeTeamNameController(FormIDController):
    def get_form(self) -> FlaskForm:
        return ChangeNameForm()

    def process(self, form, id):
        team = Team.get_by_id(id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        user = get_user()
        if user != team.creator:
            return return_bad_status('Вы не имеете прав редактировать команду')

        if form.name.data == team.name:
            return return_bad_status('Новое название команды совпадает со старым')

        team.name = form.name.data
        db.session.commit()

        return return_ok_status('Название команды изменено')


class ChangeTeamCityController(FormIDController):
    def get_form(self) -> FlaskForm:
        return ChangeCityForm()

    def process(self, form, id):
        team = Team.get_by_id(id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        user = get_user()
        if user != team.creator:
            return return_bad_status('Вы не имеете прав редактировать команду')

        if form.city.data == team.city:
            return return_bad_status('Новый город команды совпадает со старым')

        team.city = form.city.data
        db.session.commit()

        return return_ok_status('Город команды изменен')
