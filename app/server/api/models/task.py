from .contestant import *
from app.server import ma


class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(256))
    info = db.Column(db.String(256))
    score = db.Column(db.Integer())
    type = db.Column(db.String(256))
    flag = db.Column(db.String(128))
    resourse = db.Column(db.String(256))
    creator_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    tournament_id = db.Column(db.Integer(), db.ForeignKey('tournament.id'))
    tournament = db.relationship("Tournament", backref=db.backref("tournaments", lazy='dynamic'))

    def __init__(self, name, info, score, type, flag, tournament_id):
        self.name = name
        self.info = info
        self.score = score
        self.type = type
        self.flag = flag
        self.tournament_id = tournament_id

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_by_id(id):
        return db.session.query(Task).filter(Task.id == id).one()

    @staticmethod
    def update_by_id(id, key, value):
        db.session.query(Task).filter(Task.id == id).update({key: value}, synchronize_session='evaluate')
        db.session.commit()

    @staticmethod
    def dump_all_tasks_for_tournament_by_categories(tournament_id):
        categories = db.session.query(Task.type, Task.tournament_id).filter(Task.tournament_id == tournament_id).group_by(Task.type).all()
        result = {}
        for category in categories:
            result[category[0]] = db.session.query(Task).filter((Task.tournament_id == tournament_id) & (Task.type == category[0])).all()
        return result

    @staticmethod
    def update_by_id(id_task, key, value):
        db.session.query(Task).filter(Task.id == id_task).update({key: value}, synchronize_session='evaluate')
        db.session.commit()

    @staticmethod
    def get_all_tasks_by_tournament_id(tournament_id):
        if db.session.query(Task).filter(Task.tournament_id == tournament_id):
            return db.session.query(Task).filter(Task.tournament_id == tournament_id)
        return None

class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task

