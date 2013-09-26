//defaults to yesterday
Meteor.subscribe("messages-after");

Template.body.events({
    "click input": function () {
        var text = $("#message").val();
        Messages.insert({text: text, textLength: text.length, time: new Date()});
    },
    "change #minimumLengthInput": function (e) {
        var minimumLength = parseFloat($(e.currentTarget).val());
        Session.set("minimumLength", minimumLength);
    }
});

//Helpers

Template.body.messages = function () {
    return Messages.find({ textLength : {$gt : 2} });
};

// Template methods

Template.message.rendered = function () {
    $(this.find(".messageText")).animate({ fontSize: "20px" });
};