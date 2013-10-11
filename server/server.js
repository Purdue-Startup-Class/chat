Meteor.publish("messages-after", function (time) {
    //default to yesterday
    if (!time) {
        time = new Date();
        time.setDate(time.getDate() - 1);
    }

    var messages = Messages.find({
        time: { $gt: time }
    });

    var userIds = _.uniq(messages.map(function (message) {
        return message.userId;
    }));

    var users = Meteor.users.find({
        userId: { $in: userIds }
    }, {
        fields: {
            profile: 1
        }
    });

    return [messages, users];
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
            doc.userId = userId;
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

Meteor.startup(function () {
    Accounts.loginServiceConfiguration.remove({
        service: "twitter"
    });

    Accounts.loginServiceConfiguration.insert({
        service: "twitter",
        consumerKey: Meteor.settings["TWITTER_CLIENTID"],
        secret: Meteor.settings["TWITTER_SECRET"]
    });
});