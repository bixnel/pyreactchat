# -*- coding: utf-8 -*-
from tornado.ioloop import *
from tornado.web import *





class Index(RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.write('test')

application = Application([
	('/', Index),
])



if __name__ == "__main__":
	application.listen(3333)
	IOLoop.current().start()
