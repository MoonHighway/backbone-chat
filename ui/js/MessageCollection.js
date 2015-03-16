var MessageCollection = Backbone.Collection.extend({
    model: MessageModel,
    initialize: function() {
        this.cnx = new ConnectionModel();
        _.bindAll(this, 'welcome', 'error', 'connect', 'disconnect', 'send', 'receive');
        this.socket = io.connect("http://localhost:3210");
        this.socket.on('connect', this.connect);
        this.socket.on('welcome', this.welcome);
        this.socket.on('error', this.error);
        this.socket.once('disconnect', this.disconnect);
        this.socket.on('message', this.receive);
    },
    welcome: function(data) {
        data.oldMessages.forEach(this.receive);
        this.cnx.set({ color: data.yourColor });
    },
    error: function(err) {
        console.warn("An error has occurred with the message collection: " + err.message);
    },
    connect: function () {
        this.trigger('connect');
    },
    disconnect: function () {
        this.trigger('disconnect');
    },
    receive: function (message) {
        this.add(message);
    },
    send: function (newMessage) {
        this.socket.emit('message', {
            user: this.cnx.get('user'),
            color: this.cnx.get('color'),
            message: newMessage
        });
    }
});