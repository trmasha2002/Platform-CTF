# -*- coding: utf-8 -*-
from flask import jsonify
from flask.views import MethodView
from app.server.helpers import *
from app.server.api.models import Tournament, TournamentSchema


class GetMapObjectsController(MethodView):
    def post(self):
        tours = Tournament.get_all()
        result = TournamentSchema(many=True).dump(tours).data
        print(result)
        return return_ok_status(result)
