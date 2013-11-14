MessageUtils = {
    fromJSONValue: function (document) {
        return new Message(document);
    }
};

//custom data type example
Message = function (document) {
    this._textDependency = new Deps.Dependency;
    this._document = document;
    this.setText(document.text);
};

Message.prototype = {
    constructor: Message,

    toString: function () {
        return this.text;
    },

    clone: function () {
        var clonedDocument = EJSON.clone(this._document);
        return new Message(clonedDocument);
    },

    equals: function (other) {
        if (!(other instanceof Message))
            return false;

        var that = this;
        return _.isEqual(that.document, other.document);
    },

    typeName: function () {
        return "Message";
    },

    toJSONValue: function () {
        return this._document;
    }
};

EJSON.addType("Reward", MessageUtils.fromJSONValue);

Message.prototype.getText = function () {
    return this._document.text;
};

Message.prototype.setText = function (text) {
    this._document.text = text.replace('!', ':)');
    this._textDependency.changed();
};

//
//ScaryRoom.prototype.getSurprise = function () {
//    this._surprisesDependency.depend();
//
//    if (this._surprises.length < 0)
//        return "";
//
//    var randomSurpriseIndex = Math.floor(Math.random() * this._surprises.length);
//    return this._surprises[randomSurpriseIndex];
//};

//Meteor.startup(function () {
//
////    Deps.autorun(function () {
////        var messages = Messages.find();
////        messages.forEach(function (message) {
////            console.log("Message text " + message.text);
////        });
////    });
//
////    Deps.autorun(function () {
////        console.log('There are ' + Messages.find().count() + ' messages');
////    });
//
//    var scaryThings = ["Cobwebs", "Monsters"];
//    var scaryRoom = new ScaryRoom(scaryThings);
//
//    Deps.autorun(function () {
//        console.log('The current surprise is ' + scaryRoom.getSurprise());
//    });
//
//    scaryThings.push("Spiders!");
//    scaryRoom.setSurprises(scaryThings);
//});