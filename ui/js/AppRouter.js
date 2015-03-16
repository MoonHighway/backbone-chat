var AppRouter = Backbone.Router.extend({
    routes: {
        "help": "help",
        "*actions": "chat"
    },
    help: function () {
        console.log("Show Help");
    },
    chat: function () {
        this.messages = new MessageCollection();
        this.chat = new ChatView({ collection: this.messages });
        $('#target').html(this.chat.render().el);
    }
});