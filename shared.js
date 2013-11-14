Messages = new Meteor.Collection("messages", {
    transform: function (document) {
        return new Message(document);
    }
});
