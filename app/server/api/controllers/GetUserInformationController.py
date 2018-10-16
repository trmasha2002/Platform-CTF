from flask.views import MethodView
from app.server.helpers import *
from app.server.api.models import User, UserSchema
from app.server.api.models.TournametsToObjects import TournamentsToObject, TournamentsToObjectSchema
from flask import session


class GetUserInformationController(MethodView):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return return_bad_status('Пользователя с таким id не существует.')
        result = UserSchema().dump(user).data
        tournaments = TournamentsToObject.get_all_by_user_id(user.id)
        tournaments_ = TournamentsToObjectSchema(many=True).dump(tournaments).data

        if user.id == session['id']:
            result['own'] = 1
        else:
            result['own'] = ''
        return return_ok_status([result, tournaments_])
