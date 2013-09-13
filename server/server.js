//Meteor.publish("all-messages", function () {
//    return Messages.find();
//});

//Meteor.publish("messages-after", function (time) {
//    //default to yesterday
//    if (time === null) {
//        time = new Date();
//        time.setDate(time.getDate() - 1);
//    }
//
//    return Messages.find({
//        time: { $gt: time }
//    });
//});

Meteor.publish("messages-longer-than", function (length) {
    return Messages.find({
        textLength: { $gt: length }
    });
});

Meteor.methods({
    //use with Meteor.call("clearMessagesShorterThan", 2)
    clearMessagesShorterThan: function (length) {
        Messages.remove({
            //where arbitrary javascript statement
            //avoid using where because it will be very slow
            $where: "this.text.length < " + length
            //textLength: { $lt: length }
        })
    }
});

Meteor.startup(function () {
    Messages.allow({
        insert: function (userId, doc) {
            check(doc.text, String);
            return doc.text && doc.textLength > 0;
        },
        update: function (userId, doc, fields, modifier) {
            check(doc.text, String);
            return doc.text && doc.textLength > 0;
        },
        remove: function (userId, doc) {
            return false;
        }
    });
});