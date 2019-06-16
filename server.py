# -*- coding: utf-8 -*-
from tornado.ioloop import *
from tornado.web import *
from tornado.websocket import *


class Online(RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')
        self.write(str(len(users) + 21))
        print(len(users) + 21)


class IP(RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')
        self.write(self.request.remote_ip)


class Chat(WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print("WebSocket opened", self.request.remote_ip)
        users.add(str(self.request.remote_ip))
        print(users)

    def on_message(self, message):
        print('MESSAGE: ', message)

    def on_close(self):
        print("WebSocket closed")
        users.discard(str(self.request.remote_ip))
        print(users)


application = Application([
    ('/api/online/?$', Online),
    ('/api/ip/?$', IP),
    ('/ws/?$', Chat),
])


if __name__ == '__main__':
    users = set()
    messages = []
    application.listen(3333)
    IOLoop.current().start()
