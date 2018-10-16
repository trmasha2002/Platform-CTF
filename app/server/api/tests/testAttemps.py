import unittest
from app.server.api.models.Attemps import Attempt
import os
from app.server import app, db
from datetime import datetime
TEST_DB = 'test.sqlite'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

url = 'http://localhost:8080/api/register'
class TestUser(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, TEST_DB)
        self.app = app.test_client()
        db.create_all()

        our_time = "2019-01-05 22:14:39"
        our_datetime = datetime.strptime(our_time, "%Y-%m-%d %H:%M:%S")
        self.attemp = Attempt('flag', True, 12, our_datetime, 'user')
        self.attemp.add()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_should_field_exist(self):
        self.assertTrue(hasattr(self.attemp, "id"))
        self.assertTrue(hasattr(self.attemp, "id_task"))
        self.assertTrue(hasattr(self.attemp, "id_sender"))
        self.assertTrue(hasattr(self.attemp, "type"))
        self.assertTrue(hasattr(self.attemp, "success"))
        self.assertTrue(hasattr(self.attemp, "try_flag"))
        self.assertTrue(hasattr(self.attemp, "time_send"))

    def test_add_attemp(self):
        our_time = "2019-01-05 22:14:39"
        our_datetime = datetime.strptime(our_time, "%Y-%m-%d %H:%M:%S")
        attemp = Attemp('flag', True, 12, our_datetime, 'user')
        db.session.add(attemp)
        db.session.commit()
