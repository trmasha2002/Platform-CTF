from flask.views import MethodView

from app.server.api.models.TournametsToObjects import TournamentsToObject, TournamentsToObjectSchema
from app.server.api.models.team import *
from app.server.helpers import *


class GetTeamController(MethodView):
    def get(self, team_id):
        team = Team.get_by_id(team_id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        print(team.members)
        tournaments = TournamentsToObject.get_all_by_user_id(team.id)
        tournaments_ = TournamentsToObjectSchema(many=True).dump(tournaments).data
        result = TeamSchema().dump(team)
        members = UserSchema(many=True).dump(team.members)
        return return_ok_status([result[0], tournaments_, members])


class GetAllTeamsController(MethodView):
    def get(self):
        result = TeamSchema(many=True).dump(Team.get_all())
        return return_ok_status(result)


class GetTeamMembersController(MethodView):
    def get(self, team_id):
        team = Team.get_by_id(team_id)

        if not team:
            return return_bad_status('Команды с таким id не существует')

        result = UserSchema(many=True).dump(team.members)
        return return_ok_status(result)
