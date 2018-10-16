import hashlib
from app.server import db
from flask import session
from app.server import ma
from time import gmtime, strftime




class TournamentsToObject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.id'))
    contestant_id = db.Column(db.Integer, db.ForeignKey('contestant.id'))
    tournament = db.relationship('Tournament', backref=db.backref('tournamentstoobject', lazy='select'),
                                 lazy='subquery')
    contestant = db.relationship('Contestant', backref=db.backref('tournamentstoobject', lazy='select'),
                                 lazy='subquery')

    def __init__(self, tournament_id, contestant_id):
        self.tournament_id = tournament_id
        self.contestant_id = contestant_id

    def add(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    @staticmethod
    def delete(tournament_id, contestant_id):
        TournamentsToObject.query.filter(TournamentsToObject.tournament_id == tournament_id
                                         and TournamentsToObject.contestant_id == contestant_id).delete()
        db.session.commit()

    @staticmethod
    def get_all_obj_in_tournament(id_tournament):
        return db.session.query(TournamentsToObject.contestant).filter(TournamentsToObject.tournament_id
                                                                       == id_tournament).all()
    @staticmethod
    def get_all_objects_to_tournament(tournament_id):
        return db.session.query(TournamentsToObject).filter(TournamentsToObject.tournament_id
                                                                       == tournament_id).all()
    @staticmethod
    def is_exist(tournament_id, contestant_id):
        if db.session.query(TournamentsToObject).filter(
                TournamentsToObject.tournament_id == tournament_id and TournamentsToObject.contestant_id == contestant_id).first():
            return True
        return False
    @staticmethod
    def get_one_or_none(tournament_id, contestant_id):
        return db.session.query(TournamentsToObject).filter(
                TournamentsToObject.tournament_id == tournament_id and TournamentsToObject.contestant_id == contestant_id).first()
    @staticmethod
    def get_all():
        return TournamentsToObject.query.all()

    @staticmethod
    def get_all_people_in_tournament(id_tournament):
        return db.session.query(TournamentsToObject).filter(TournamentsToObject.tournament_id == id_tournament).all()

    @staticmethod
    def get_all_by_user_id(contestant_id):
        return db.session.query(TournamentsToObject).filter(TournamentsToObject.contestant_id == contestant_id).all()


    def get_solved_tasks_for_tournament_for_contestant_indices(self):
        return db.session.query(Attempt.task_id).filter((Attempt.success == True) & (Attempt.tournament_to_object_id == self.id))


from app.server.api.models.Attemps import Attempt, AttemptScorehistorySchema # ИММЕННО В ЭТОМ МЕСТЕ. ЕСЛИ ПЕРЕМЕСТИТЬ ЭТУ СТРОЧКУ НАВЕРХ, migrate.py не будет работать


class TournamentsToObjectSchema(ma.ModelSchema):
    class Meta:
        model = TournamentsToObject

    contestant = ma.Method('get_contestant')
    contestant_id = ma.Method('get_contestant_id')
    tournament = ma.Method('get_tournament')
    tournament_id = ma.Method('get_tournament_id')

    @staticmethod
    def get_contestant(obj):
        return obj.contestant.login

    @staticmethod
    def get_contestant_id(obj):
        return obj.contestant.id

    @staticmethod
    def get_tournament_id(obj):
        return obj.tournament.id

    @staticmethod
    def get_tournament(obj):
        return obj.tournament.name


class TournamentsToObjectSchema2(ma.ModelSchema):
    class Meta:
        model = TournamentsToObject

    contestant = ma.Method('get_contestant')
    contestant_id = ma.Method('get_contestant_id')
    tournament = ma.Method('get_tournament')
    tournament_id = ma.Method('get_tournament_id')

    @staticmethod
    def get_contestant(obj):
        return obj.contestant.name

    @staticmethod
    def get_contestant_id(obj):
        return obj.contestant.id

    @staticmethod
    def get_tournament_id(obj):
        return obj.tournament.id

    @staticmethod
    def get_tournament(obj):
        return obj.tournament.name

class TournamentsToObjectScorehistorySchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'score', 'contestant', 'history')
    contestant = ma.Method('get_contestant')
    score = ma.Method('get_score')
    history = ma.Method('get_history')

    @staticmethod
    def get_contestant(obj):
        return obj.contestant.name

    @staticmethod
    def get_score(obj):
        return sum(x.score for x in obj.attempts)

    @staticmethod
    def get_history(obj):
        if not obj.attempts:
            return []
        history = obj.attempts
        for i in range(1, len(history)):
            history[i].score += history[i - 1].score
        str =  AttemptScorehistorySchema(many=True).dump(history).data
        print(str)
        return str


        # Attempt.query.filter((Attempt.success == True) & (Attempt.tournament_id == tournament_id)

