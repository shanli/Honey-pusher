(function() {
  "use strict";
  module.exports = function(io) {
    io.set('log level', 1);
    return io.sockets.on('connection', function(socket) {
      socket.on('client-session', function(data) {
        var channel, key, _i, _len, _ref, _results;
        key = "" + data.project + ":" + data.key;
        console.log(socket.id);
        socket.broadcast.emit('add_user', socket.id);
        socket.join(key);
        socket.join(data.project);
        if (data.channels) {
          _ref = data.channels.split(',');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            channel = _ref[_i];
            channel = S(channel).trim().s;
            _results.push(socket.join("" + data.project + ":channel:" + channel));
          }
          return _results;
        }
      });
      return socket.on('disconnect', function() {
        console.log('----disconnect---');
        console.log(socket.id);
        return console.log('----disconnect end---');
      });
    });
  };

}).call(this);
