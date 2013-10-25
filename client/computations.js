//custom data type example
var ScaryRoom = function (surprises) {
    this._surprisesDependency = new Deps.Dependency();
    this._surprises = surprises;
};
ScaryRoom.prototype.getSurprise = function () {
    this._surprisesDependency.depend();

    if (this._surprises.length < 0)
        return "";

    var randomSurpriseIndex = Math.floor(Math.random() * this._surprises.length);
    return this._surprises[randomSurpriseIndex];
};
ScaryRoom.prototype.setSurprises = function (surprises) {
    this._surprises = surprises;
    this._surprisesDependency.changed();
};

Meteor.startup(function () {

//    Deps.autorun(function () {
//        var messages = Messages.find();
//        messages.forEach(function (message) {
//            console.log("Message text " + message.text);
//        });
//    });

//    Deps.autorun(function () {
//        console.log('There are ' + Messages.find().count() + ' messages');
//    });

    var scaryThings = ["Cobwebs", "Monsters"];
    var scaryRoom = new ScaryRoom(scaryThings);

    Deps.autorun(function () {
        console.log('The current surprise is ' + scaryRoom.getSurprise());
    });

    scaryThings.push("Spiders!");
    scaryRoom.setSurprises(scaryThings);
});