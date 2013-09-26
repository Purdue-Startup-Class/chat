Meteor.publish("messages-after", function (time) {
    //simulate delay
//    for (var i = 0; i < 1500000000; i++) {
//        i = i - .5;
//    }

    //default to yesterday
    if (!time) {
        time = new Date();
        time.setDate(time.getDate() - 1);
    }

    return Messages.find({
        time: { $gt: time }
    });
});

Meteor.methods({
    //use with Meteor.call("clearMessagesShorterThan", 2)
    clearMessagesShorterThan: function (length) {
        Messages.remove({
            textLength: { $lt: length }
        });
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