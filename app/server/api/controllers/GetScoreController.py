from flask.views import MethodView
from app.server.helpers import *
from app.server.api.models.TournametsToObjects import TournamentsToObject, TournamentsToObjectScorehistorySchema
from app.server.api.models.Tournament import Tournament, TournamentSchema
from flask import request

class GetScoreController(MethodView):
    def get(self):
        tournament_id = int(request.args['tournament_id'])
        return return_ok_status({'scoreboard' : TournamentsToObjectScorehistorySchema(many=True).dump(TournamentsToObject.get_all_objects_to_tournament(tournament_id)).data, 'tournament_begin' : TournamentSchema().dump(Tournament.get_info(tournament_id)).data['time']})
