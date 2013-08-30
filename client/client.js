Meteor.subscribe("messages");

Template.body.messages = function () {
    return Messages.find();
};

Template.body.events({
    "click input": function () {
        var messageBox = $("#message");
        Messages.insert({text: messageBox.val()});
        messageBox.val("");
    }
});

//Template.body.messages = function () {
//    return [
//        {text: "Hi, everybody!"},
//        {text: "Hi Dr. Nick!"}
//    ];
//};
