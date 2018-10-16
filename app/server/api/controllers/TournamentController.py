# -*- coding: utf-8 -*-

from flask.views import MethodView
from app.server.api.models.Tournament import TournamentSchema, Tournament
from app.server.api.models.TournametsToObjects import TournamentsToObject, TournamentsToObjectSchema, \
    TournamentsToObjectSchema2
from app.server.api.models.user import UserSchema
from app.server.helpers import *
from flask import request


class TournamentController(MethodView):
    def get(self, tournament_id):
        if Tournament.is_exist_by_id(tournament_id):
            tournament = self.get_info(tournament_id)
            creator = self.get_creator(tournament['creator'])
            contestants = self.get_contestants(tournament_id, tournament['for_team_allowed'])
            in_tournament = self.in_tournament(tournament_id)
            return return_ok_status([tournament, creator, contestants, in_tournament])
        return return_bad_status("Такого турнира не существует!")

    @staticmethod
    def get_info(tournament_id):
        tournament = Tournament.get_info(tournament_id)
        if tournament:
            return TournamentSchema().dump(tournament).data
        return False

    @staticmethod
    def in_tournament(tournament_id):
        if TournamentsToObject.is_exist(tournament_id, session['id']):
            return True
        return False

    @staticmethod
    def get_contestants(tournament_id, team):
        contestants = TournamentsToObject.get_all_people_in_tournament(tournament_id)
        if not team:
            return TournamentsToObjectSchema(many=True).dump(contestants).data
        return TournamentsToObjectSchema2(many=True).dump(contestants).data
        # print(TournamentsToObjectSchema(many=True).dump(contestants).data)

    @staticmethod
    def get_creator(creator_id):
        if User.is_exist_by_id(creator_id):
            creator = User.get_user_by_id(creator_id)
            return UserSchema().dump(creator).data
        return False


class TournamentReg(MethodView):
    def post(self, id):
        data = request.get_json()
        if TournamentsToObject.is_exist(id, data['contestant_id']):
            return return_bad_status('Вы уже зарегестрированы на этот турнир!')
        reg = TournamentsToObject(id, data['contestant_id'])
        reg.add()
        return return_ok_status('ok')


class TournamentDisReg(MethodView):
    def post(self, id):
        data = request.get_json()
        if not TournamentsToObject.is_exist(id, data['contestant_id']):
            return return_bad_status('Вы еще не регистрировались на этот турнир!')
        TournamentsToObject.delete(id, data['contestant_id'])
        return return_ok_status('ok')


class TournamentControllerPrivate(MethodView):
    def get(self, tournament_id):
        if Tournament.is_exist_by_id(tournament_id):
            tournament = self.get_info(tournament_id)
            creator = self.get_creator(tournament['creator'])
            contestants = self.get_contestants()
            in_tournament = self.in_tournament(tournament_id)
            return return_ok_status([tournament, creator, contestants, in_tournament])
        return return_bad_status("Такого турнира не существует!")

    @staticmethod
    def get_info(tournament_id):
        tournament = Tournament.get_info(tournament_id)
        if tournament:
            return TournamentSchema().dump(tournament).data
        return False

    @staticmethod
    def in_tournament(tournament_id):
        if TournamentsToObject.is_exist(tournament_id, session['id']):
            return True
        return False

    @staticmethod
    def get_contestants():
        contestants = TournamentsToObject.get_all()
        return TournamentsToObjectSchema(many=True).dump(contestants).data

    @staticmethod
    def get_creator(creator_id):
        if User.is_exist_by_id(creator_id):
            creator = User.get_user_by_id(creator_id)
            return UserSchema().dump(creator).data
        return False
