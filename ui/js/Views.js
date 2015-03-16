var NameFormView = Backbone.View.extend({
    tagName: "div",
    template: Handlebars.compile( $('#tpl-name-form').html() ),
    events: {
        'click button': 'connect'
    },
    connect: function (e) {
        if ( $('input').val() ) {
            this.model.set({ name: $('input').val() });
            window.location += "#/connect";
        }
    },
    render: function (e) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var ChatView = Backbone.View.extend({
    tagName: 'div id="chat-view"',
    template: Handlebars.compile( $('#tpl-chat').html() ),
    events: {
        'click button': 'send'
    },
    send: function() {
        app.sendMessage($('input').val());
        $('input').val('').focus();
    },
    add: function(data) {
        this.collection.add(data);
        $('<div>').css('color', data.color)
            .text(data.userName + ': ' + data.message)
            .appendTo('#chat-target');
    },
    render: function (e) {
        $(this.el).html(this.template(this.collection.toJSON()));
        return this;
    }
});