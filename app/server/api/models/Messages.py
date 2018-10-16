from app.server import db


class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1024))
    creator_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    tournament_id = db.Column(db.Integer(), db.ForeignKey('tournament.id'))

    def __init__(self, text, tournament_id):
        self.text = text
        self.tournament_id = tournament_id

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self.id

    def get_all_messages_in_tournament(self, id_tournament):
        return db.session.query(Messages.text).filter(Messages.tournament_id == id_tournament)
