//defaults to yesterday
var messagesSubscription = Meteor.subscribe("messages-after");

Accounts.ui.config({
    requestPermissions: {
        facebook: ["user_likes"]
    }
});

Template.front.events({
    "click button": function () {
        //future? continue generating if the room already exists
        var name = generatePlanetName().toLowerCase();

//        console.log(Router.url("room", {name: name}));
        Router.go("room", {name: name});
    }
});

Template.about.events({
    "click button": function () {
        Router.go("front");
    }
});

Template.message.userName = function (userId) {
    return Meteor.users.findOne({_id: userId}).profile.name;
};

Template.room.roomName = function () {
    return Session.get("roomName");
};

Template.room.events({
    "click input": function () {
        var text = $("#message").val();

        Messages.insert({
            room: Session.get("roomName"),
            text: text,
            textLength: text.length,
            time: new Date()
        });

        //clear the input
        $("#message").val("");
    },
    "change #minimumLengthInput": function (e) {
        var minimumLength = parseFloat($(e.currentTarget).val());
        Session.set("minimumLength", minimumLength);
    }
});

// Template methods

Template.message.rendered = function () {
    $(this.find(".messageText")).animate({ fontSize: "20px" });
};

// Routing

Router.map(function () {
    this.route("front", {path: "/"});

    this.route("about");
    this.route("about", {path: "/aboutUs"});

    this.route("room", {
        data: function () {
            var roomName = this.params.name;
            Session.set("roomName", this.params.name);
            return {
                messages: Messages.find({room: roomName}),
                params: this.params
            };
        },
        loadingTemplate: "loading",
        path: "/room/:name",
        waitOn: messagesSubscription
    });
});