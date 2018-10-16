from app.server import db, ma
from app.server.api.models import UserSchema
from app.server.api.models.UserToTeam import user_to_team
from app.server.api.models.user import User
from .contestant import *


class Team(Contestant):
    id = db.Column(db.Integer, db.ForeignKey('contestant.id'), primary_key=True)
    name = db.Column(db.String(128))
    city = db.Column(db.String(128))
    invite_code = db.Column(db.String(1024))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    creator = db.relationship('User', backref=db.backref('created_teams', lazy='dynamic'), foreign_keys='Team.creator_id')
    members = db.relationship('User', secondary=user_to_team, backref=db.backref('teams', lazy='select'))
    __mapper_args__ = {
        'polymorphic_identity': 'team'
    }

    def __init__(self, name, city, invite_code, creator):
        self.name = name
        self.city = city
        self.invite_code = invite_code
        self.creator_id = creator.id
        self.creator = creator
        self.members.append(creator)

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Team.query.all()

    @staticmethod
    def get_by_code(code):
        return Team.query.filter(Team.invite_code == code).first()

    def add_new_member(self, user):
        user.team_id = self.id
        self.members.append(user)
        db.session.commit()

    def remove_member(self, user):
        self.members.remove(user)
        db.session.commit()

    def if_user_in_the_team(self, user):
        return user in self.members

    @staticmethod
    def get_by_id(id):
        return db.session.query(Team).filter(Team.id == id).first()


class TeamSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'name', 'city', 'creator')

    creator = ma.Nested(UserSchema)
