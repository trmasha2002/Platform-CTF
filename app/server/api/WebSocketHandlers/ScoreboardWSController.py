from app.server import socketio, app
from app.server.helpers import *
from app.server.api.models import TournamentsToObject, TournamentsToObjectScorehistorySchema, Tournament, TournamentSchema
from flask import request, abort
from flask_socketio import join_room, leave_room, emit, send


def get_scoreboard(tournament_id):
    return {'status': 'ok', 'result': {'scoreboard' : TournamentsToObjectScorehistorySchema(many=True).dump(TournamentsToObject.get_all_objects_to_tournament(tournament_id)).data, 'tournament_begin' : TournamentSchema().dump(Tournament.get_info(tournament_id)).data['time']}}

@socketio.on("join_scoreboard")
def join_scoreboard(data):
    tournament = data['tournament_id']
    join_room("scoreboardroom" + str(tournament))
    print("joined room")
    sc = get_scoreboard(tournament)
    #emit('scoreboard_update', sc)

@socketio.on("leave_scoreboard")
def leave_scoreboard(data):
    room = data['tournament_id']
    leave_room(room)

def send_scoreboard_to_room(tournament_id):
    emit('scoreboard_update', get_scoreboard(tournament_id), room=("scoreboardroom" + str(tournament_id)), namespace='/')