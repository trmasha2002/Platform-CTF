import hashlib
from app.server import db
from flask import session
from app.server import ma
from datetime import datetime as dt
from app.server import db, ma
from .Tournament import *
from .team import *
from .user import User, UserSchema
from .team import Team, TeamSchema
from .task import Task, TaskSchema
#from .TournametsToObjects import TournamentsToObject
from sqlalchemy import func

class Attempt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer(), db.ForeignKey('task.id'))
    try_flag = db.Column(db.String(256))
    success = db.Column(db.Boolean())
    time = db.Column(db.DateTime())
    score = db.Column(db.Integer())
    tournament_to_object_id = db.Column(db.Integer, db.ForeignKey('tournaments_to_object.id'))
    tournament_to_object = db.relationship('TournamentsToObject', backref=db.backref('attempts', lazy='select'), lazy='select')
    task = db.relationship('Task', backref=db.backref('task', lazy='select'), lazy='select')


    def __init__(self, flag, success, **kwargs):
        self.try_flag = flag
        self.success = success
        self.score = 0
        self.time = dt.now()
        if 'tournament_to_object' in kwargs:
            self.tournament_to_object_id = kwargs['tournament_to_object']

        if 'task' in kwargs:
            self.task_id = kwargs['task']
            self.score = Task.get_by_id(self.task_id).score
    @staticmethod
    def get_scoreboard_for_contestant(tournament_to_object):
        scorehistory =  db.session.query(Attempt). \
            filter((Attempt.tournament_to_object_id == tournament_to_object) & Attempt.success).all()
        return scorehistory

    @staticmethod
    def already_solved(tournament_to_object_id, task_id):
        return bool(db.session.query(Attempt).filter((Attempt.tournament_to_object_id == tournament_to_object_id) & (Attempt.task_id == task_id) & (Attempt.success == True)).first())
    def save(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def get_all(self):
        return db.session(Attempt).query.all()

class AttemptScorehistorySchema(ma.ModelSchema):
    class Meta:
        fields = ('score', 'time')