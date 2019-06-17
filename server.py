# -*- coding: utf-8 -*-
import json
from random import randint
from tornado.ioloop import *
from tornado.web import *
from tornado.websocket import *


class Online(RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')
        self.write(str(len(users)))


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
        users[str(self.request.remote_ip)] = self
        print(users)

    def on_message(self, message):
        message = json.loads(message)
        print('MESSAGE: ', message)
        if message['action'] == 'get_messages':
            data = {'action': 'messages',
                    'data': messages}
            self.write_message(json.dumps(data))
        elif message['action'] == 'send_message':
            messages.append([self.request.remote_ip, message['data'], randint(-2147483648, 2147483647)])
            data = {'action': 'messages',
                    'data': messages}
            for user in users.keys():
                users[user].write_message(json.dumps(data))

    def on_close(self):
        print("WebSocket closed")
        del users[str(self.request.remote_ip)]
        print(users)


application = Application([
    ('/api/online/?$', Online),
    ('/api/ip/?$', IP),
    ('/ws/?$', Chat),
])


if __name__ == '__main__':
    users = {}
    messages = []
    application.listen(3333)
    IOLoop.current().start()
