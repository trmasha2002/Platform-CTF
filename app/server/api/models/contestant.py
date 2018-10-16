from app.server import db, ma


class Contestant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(30))
    __mapper_args__ = {
        'polymorphic_on': type,
        'polymorphic_identity': 'contestant'
    }

    def __str__(self):
        return self.__repr__()

    def __repr__(self):
        return "<Contestant {} {}".format(self.id, self.type)

class ContestantSchema(ma.ModelSchema):
    class Meta:
        model = Contestant
