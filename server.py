# -*- coding: utf-8 -*-
import os
import json
from random import randint
from tornado.ioloop import *
from tornado.web import *
from tornado.websocket import *



class Index(RequestHandler):
    def get(self):
        self.redirect('https://bixnel.github.io/pyreactchat/')


class Online(RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')
        self.write(str(len(users)))


class IP(RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')
        self.write(str(self.request.headers.get('X-Forwarded-For')))


class Chat(WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        users[str(self.request.headers.get('X-Forwarded-For'))] = self

    def on_message(self, message):
        message = json.loads(message)
        if message['action'] == 'get_messages':
            data = {'action': 'messages',
                    'data': messages}
            self.write_message(json.dumps(data))
        elif message['action'] == 'send_message':
            if 0 < len(message['data']) <= 140:
                messages.append([self.request.headers.get('X-Forwarded-For'), message['data'], randint(-2147483648, 2147483647)])
                data = {'action': 'messages',
                        'data': messages}
                for user in users.keys():
                    users[user].write_message(json.dumps(data))

    def on_close(self):
        del users[str(self.request.headers.get('X-Forwarded-For'))]


application = Application([
    ('/?$', Index),
    ('/api/online/?$', Online),
    ('/api/ip/?$', IP),
    ('/ws/?$', Chat),
], websocket_ping_interval = 25)


if __name__ == '__main__':
    users = {}
    messages = []
    application.listen(os.getenv('PORT', 3333), address = '0.0.0.0')
    IOLoop.current().start()
