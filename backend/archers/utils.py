from math import atan2, cos, sin
from Box2D import b2Vec2
from settings import PPM


def rad2vec(radians, m=1):
	return b2Vec2(cos(radians), sin(radians)) * m


def vec2rad(vector):
	return atan2(vector.y, vector.x)

def getSpeedFromVec(vector):
	xspeed = abs(vector.x)
	yspeed = abs(vector.y)
	return xspeed + yspeed;

class EventsMixins(object):
	def __init__(self, *args, **kwargs):
		self._callbacks = dict()
		return super(EventsMixins, self).__init__(*args, **kwargs)

	def on(self, event, callback, context=None):
		if not (event in self._callbacks):
			self._callbacks[event] = list()
		self._callbacks[event].append([callback, context])

	def off(self, *args):
		if(len(args) == 2):
			event, cb = args
			for kurwa in self._callbacks[event]:
				if(kurwa[0] == cb):
					self._callbacks[event].remove(kurwa)
		elif(len(args) == 1):
			del self._callbacks[args[0]]
		else:
			self._callbacks = list()

	def trigger(self, event, *args, **kwargs):
		try:
			callbacks = self._callbacks[event]
		except KeyError:
			return

		for callback in callbacks:
			if(callback[1]):
				kwargs['_context'] = self._callbacks[event][1]
			callback[0](*args, **kwargs)


def m2p(meters):
	if hasattr(meters, 'x') and hasattr(meters, 'y'):
		meters.x = m2p(meters.x)
		meters.y = m2p(meters.y)
		return meters
	elif hasattr(meters, '__iter__') and 'x' in meters and 'y' in meters:
		meters['x'] = m2p(meters['x'])
		meters['y'] = m2p(meters['y'])
		return meters
	elif hasattr(meters, '__iter__') and len(meters) == 2:
		meters[0] = p2m(meters[0])
		meters[1] = p2m(meters[1])
		return meters
	else:
		return int(meters * PPM)


def p2m(pixels):
	if hasattr(pixels, 'x') and hasattr(pixels, 'y'):
		pixels.x = p2m(pixels.x)
		pixels.y = p2m(pixels.y)
		return pixels
	elif hasattr(pixels, '__iter__') and 'x' in pixels and 'y' in pixels:
		pixels['x'] = p2m(pixels['x'])
		pixels['y'] = p2m(pixels['y'])
		return pixels
	elif hasattr(pixels, '__iter__') and len(pixels) == 2:
		pixels[0] = p2m(pixels[0])
		pixels[1] = p2m(pixels[1])
		return pixels
	else:
		return pixels / PPM


def limit(pixels):
	if(pixels < 0):
		return 0
	return pixels

def get_class( kls ):
	parts = kls.split('.')
	module = ".".join(parts[:-1])
	m = __import__( module )
	for comp in parts[1:]:
		m = getattr(m, comp)            
	return m