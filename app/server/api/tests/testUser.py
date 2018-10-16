import unittest
import os, requests

from flask import json

from app.server import app, db
from app.server.api.models.user import User
from app.server.api.tests.base import BaseTestCase

TEST_DB = 'test.sqlite'
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class TestUser(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.app = app.test_client()

    def test_registration(self):
        url = '/api/register'
        data = {
            'name': 'MyName',
            'email': 'MyEmail@gmail.com',
            'login': 'MyLogin',
            'password': 'MyPassword',
            'confirmpass': 'MyPassword',
        }
        resp = self.app.post(url, data=data)
        self.assertEqual(resp.status_code, 200)
        response = json.loads(resp.data)
        self.assertEqual(response['status'], 'ok')

    def test_reset_password(self):
        user = User('MyName', 'MyEmail@gmail.com', 'MyLogin', 'MyPassword', '123')
        user.save()
        url = '/api/forgetpass'
        data = {
            'email': 'MyEmail@gmail.com'
        }
        resp = self.app.post(url, data=data)
        self.assertEqual(resp.status_code, 200)
        response = json.loads(resp.data)
        self.assertEqual(response['status'], 'ok')

    def test_get_info_about_user(self):
        user = User('MyName', 'MyEmail@gmail.com', 'MyLogin', 'MyPassword', '123')
        user.save()
        url = '/api/user/1'
        resp = self.app.get(url)
        self.assertEqual(resp.status_code, 200)
        response = json.loads(resp.data)
        self.assertEqual(response['status'], 'ok')
