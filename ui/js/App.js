var AppRouter = Backbone.Router.extend({
    routes: {
        "connect": "connect",
        "*actions": "defaultRoute"
    },
    connect: function () {
        this.socket = io.connect("http://localhost:3210");
        this.socket.on('welcome', this.welcome.bind(this));
        this.socket.on('connect', this.connected.bind(this));
        this.socket.on('error', this.socketError.bind(this));
        this.socket.once('disconnect', this.disconnected.bind(this));
        this.socket.on('message', this.incommingMessage.bind(this));
        $('#target').html("please wait connecting...");
    },
    connected: function () {
        this.messages = new ChatMessageCollection();
        this.chat = new ChatView({collection: this.messages});
        $('#target').html(this.chat.render().el);
    },
    welcome: function (data) {
        console.log(data.oldMessages.length);
        data.oldMessages.forEach(this.incommingMessage.bind(this));
        this.user.set({color: data.yourColor});
    },
    incommingMessage: function (data) {
        this.chat.add(data);
    },
    sendMessage: function (message) {
        this.socket.emit('message', {
            userName: this.user.get('name'),
            message: message,
            color: this.user.get('color')
        });
    },
    disconnect: function () {
        this.socket.emit('disconnect', {
            userName: this.user.get('name'),
            color: this.user.get('color')
        });
    },
    disconnected: function () {
        $('div.bg-success').removeClass('bg-success').addClass('bg-danger').text('disconnected');
    },
    socketError: function () {
        console.log('socket error');
    },
    defaultRoute: function (actions) {
        this.user = new UserModel();
        this.nameForm = new NameFormView({model: this.user});
        $('#target').html(this.nameForm.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();
