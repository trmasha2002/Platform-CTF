import hashlib

from flask_marshmallow import fields

from app.server import db
from flask import session
from app.server import ma
from time import gmtime, strftime

from app.server.api.models import ContestantSchema, Contestant


class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    description = db.Column(db.String(1024))
    private = db.Column(db.Boolean())
    platform = db.Column(db.Boolean())
    invite_link = db.Column(db.String(1024))
    creator_id = db.Column(db.Integer(), db.ForeignKey('contestant.id'))
    creator = db.relationship("Contestant", backref=db.backref("tournaments", lazy='dynamic'))
    time = db.Column(db.DateTime())
    time_to_live = db.Column(db.DateTime())
    place = db.Column(db.String(256))
    online = db.Column(db.Boolean())
    for_team_allowed = db.Column(db.Boolean())

    def __init__(self, name, description, creator, time, time_to_live, place, invite_link, private=False, platform=True,
                 online=False, for_team_allowed=True):
        self.name = name
        self.description = description
        self.private = private
        self.platform = platform
        self.creator = creator
        self.time = time
        self.time_to_live = time_to_live
        self.place = place.replace(';', ',')
        self.online = online
        self.invite_link = invite_link
        self.for_team_allowed = for_team_allowed

    def add(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Tournament.query.all()

    @staticmethod
    def get_tournaments_in_future(time_to_live):
        return db.session.query(Tournament).filter(Tournament.time > time_to_live).all()

    @staticmethod
    def allowed_to_user(user_id, tournament_id):
        return True  # TODO: check

    @staticmethod
    def update_by_id(id, key, value):
        db.session.query(Tournament).filter(Tournament.id == id).update({key: value}, synchronize_session='evaluate')
        db.session.commit()

    @staticmethod
    def is_exist_by_id(id):
        if Tournament.query.filter(Tournament.id == id):
            return True
        return False

    @staticmethod
    def get_info(tournament_id):
        return db.session.query(Tournament).filter(Tournament.id == tournament_id).one()


class TournamentSchema(ma.ModelSchema):
    class Meta:
        model = Tournament

    author_name = ma.Method('get_author_name')

    def get_author_name(self,obj):
        # return "ASD"
        return str(obj.creator.login)
