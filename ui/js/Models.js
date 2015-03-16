var UserModel = Backbone.Model.extend({});
var MessageModel = Backbone.Model.extend({});

var ChatMessageCollection = Backbone.Collection.extend({
    model: MessageModel
});