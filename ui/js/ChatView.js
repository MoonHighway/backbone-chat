var ChatView = Backbone.View.extend({
    tagName: 'chat-view',
    chatTemplate: Handlebars.compile( $('#tpl-chat').html() ),
    nameTemplate: Handlebars.compile( $('#tpl-chat-name').html() ),
    events: {
        "click #connect": 'newUser',
        "click #send": 'send'
    },
    initialize: function () {
        _.bindAll(this, 'newUser', 'send', 'render');
        this.collection.cnx.on('change', this.render);
        this.collection.on('add', this.render);
        this.collection.on('connect', this.connect);
        this.collection.on('disconnect', this.disconnect);
    },
    disconnect: function() {
        $('div.bg-success').removeClass('bg-success').addClass('bg-danger').text('disconnected');
    },
    newUser: function () {
        var val = $('#user-name').val();
        if (val) {
            this.collection.cnx.set("user", val);
        }
    },
    send: function () {
       this.collection.send( $('#new-message').val() );
    },
    render: function (e) {
        if (this.collection.cnx.get('user')) {
            $(this.el).html(this.chatTemplate({ color: this.collection.cnx.get('color'), messages: this.collection.toJSON() }));
        } else {
            $(this.el).html(this.nameTemplate());
        }
        return this;
    }
});