import io from 'socket.io-client'

export default socket = io.connect('http://192.168.0.105:8080/')

