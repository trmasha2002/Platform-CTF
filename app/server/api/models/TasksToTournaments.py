import hashlib
from app.server import db
from flask import session
from app.server import ma
from time import gmtime, strftime


class TasksToTournamets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    tournament = db.relationship('Tournament', backref=db.backref('taskstotournaments', lazy='select'), lazy='subquery')
    task = db.relationship('Task', backref=db.backref('taskstotournaments', lazy='select'), lazy='subquery')

    def __init__(self, tournament_id, task_id, task, tournament):
        self.tournament_id = tournament_id
        self.task_id = task_id
        self.task = task
        self.tournament = tournament

    def add(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return TasksToTournamets.query.all()
