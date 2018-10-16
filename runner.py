from app.server import app, socketio
# from gevent import pywsgi
# from geventwebsocket.handler import WebSocketHandler

if __name__ == '__main__':
    #app.run(debug=True, port=8080, host='0.0.0.0')
    #
    app.port=8080
    app.host='0.0.0.0'
    app.debug = True
    #app.run(debug=True, port=8080, host='0.0.0.0')
    socketio.run(app, port=8080)
    # server = pywsgi.WSGIServer(('', 8080), app, handler_class=WebSocketHandler)
    # server.serve_forever()