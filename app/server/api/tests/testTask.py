import unittest
import os, requests

from flask import json

from app.server import app, db
from app.server.api.models.task import Task
from app.server.api.models.user import User
from app.server.api.tests.base import BaseTestCase

TEST_DB = 'test.sqlite'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class TestTask(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.app = app.test_client()
        self.user = User('name', 'test@test', 'login', 'pass', 'code')
        self.user.save()
        with self.app.session_transaction() as session:
            session['username'] = 'login'
            session['id'] = self.user.id

    def test_createtask(self):
        url = '/api/createtask'
        data = {
            'name': 'Oh my god',
            'info': 'Anything',
            'score': 100,
            'type': 'Crypto',
            'flag': 'Bugi-vugi',
        }
        resp = self.app.post(url,data=data)
        self.assertEquals(resp.status_code,200)
        response = json.loads(resp.data)
        self.assertEqual(response['status'], 'ok')