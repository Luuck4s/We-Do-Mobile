import io from 'socket.io-client'

var socket

export default socket = io.connect('http://192.168.0.107:8080/')

