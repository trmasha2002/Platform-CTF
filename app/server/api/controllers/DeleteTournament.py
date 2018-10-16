from app.server.api.models.Tournament import Tournament
from flask.views import MethodView
from app.server.helpers import return_ok_status, return_bad_status, is_auth
from app.server import db
from flask import session

class DeleteTournamentController(MethodView):
    def post(self, id):
        creator = db.session.query(Tournament.creator).filter(Tournament.id == id)
        if session['username'] != creator:
            return_bad_status('Вы не создатель турнира!')
        if not is_auth():
            return_bad_status('Вы не авторизованы!')

        Tournament.query.filter(Tournament.id == id).delete()
        db.session.commit()
        return return_ok_status('Турнир успешно удален!')
