from app.server.api.models.Tournament import Tournament, TournamentSchema
from flask.views import MethodView
from app.server.helpers import return_bad_status, is_auth, return_ok_status
from app.server import db
from datetime import datetime
from sqlalchemy import and_


class AllActiveTournamentsController(MethodView):
    def get(self):
        if not is_auth():
            return_bad_status('Вы не авторизованы!')

        time = datetime.now()
        tournaments_ = db.session.query(Tournament).filter(and_(Tournament.time_to_live > time, Tournament.private == 0)).all()
        tournaments = TournamentSchema(many=True).dump(tournaments_).data
        return return_ok_status(tournaments)
