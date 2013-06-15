#!/usr/bin/env python2
from twisted.internet import reactor, task
# from autobahn.websocket import listenWS
# from autobahn.wamp import WampServerFactory, WampServerProtocol, exportRpc
from archers.world import World
from archers.interface import Connection, pack_messages
import settings
from Box2D import *

# from twisted.internet import reactor
from autobahn.websocket import WebSocketServerFactory, WebSocketServerProtocol, listenWS


class UserCommunication(WebSocketServerProtocol):
	# def __init__(self, world, *args, **kwargs):
	# 	self.world = world
	# 	# WebSocketServerProtocol.__init__(self)

	def onMessage(self, msg, binary):
		self.sendMessage(msg, binary)

	def onOpen(self):
		self.interface = Connection(self.factory.world)
		self.interface.on('update', self.send_update)
		self.interface.on('frame', self.send_frame)

	def send_update(self, items):
		if(len(items)):
			self.sendMessage(pack_messages(items), True)

	def send_frame(self, frame):
		if(len(frame)):
			self.sendMessage(pack_messages(frame), True)


class Archers():
	def init_networking(self):
		factory = WebSocketServerFactory("ws://localhost:9000")
		factory.world = self.world
		factory.protocol = UserCommunication
		listenWS(factory)

	def init_world(self):
		self.world = World('../common/map.tmx')
		task.LoopingCall(self.world.step).start(settings.TIME_STEP)
		task.clock = self.reactor

	def init_debug_renderer(self):
		"""
		Import debug renderer (which in turn imports pygame)
		Add task to the reactor to update debug screen
		Only works when GUI is available
		Don't use in production
		"""
		from archers.debug import Renderer
		self.renderer = Renderer(self.world)
		task.LoopingCall(self.renderer.render_frame).start(settings.TIME_STEP)

	def start(self, reactor=reactor):
		self.reactor = reactor
		self.init_world()
		self.init_networking()
		if(settings.DEBUG):
			self.init_debug_renderer()
		self.reactor.run()


if __name__ == '__main__':
	archers = Archers()
	archers.start()
	