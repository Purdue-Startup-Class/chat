Meteor.subscribe("messages");

Template.body.events({
    "click input": function () {
        var messageBox = $("#message");
        Messages.insert({text: messageBox.val(), time: new Date()});
        messageBox.val("");
    }
});

//Helpers

Template.body.messages = function () {
    return Messages.find();
};

Template.body.addTimestamp = function (context, options) {
    var ret = "";

    //see https://github.com/meteor/meteor/wiki/Spark
    //also partially based off https://github.com/meteor/meteor/blob/devel/packages/templating/deftemplate.js
    return Spark.list(context, function (item) {
        return Spark.labelBranch(item._id, function () {
            //isolate needed to preserve reactivity of template
            var html = Spark.isolate(_.bind(options.fn, null, item));
            //add the message time
            html += Spark.isolate(_.bind(Template.messageTime, null, item));
            return Spark.setDataContext(item, html);
        });
    });

    return ret;
};

// Template methods

Template.message.rendered = function () {
    $(this.find(".messageText")).animate({ fontSize: "20px" });
};