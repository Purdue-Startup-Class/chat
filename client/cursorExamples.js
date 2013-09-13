//Meteor.startup(function () {
//
//    Meteor.setTimeout(function () {
//        var greaterThanOne = Messages.find({
//            textLength: { $gt: 1 }
//        });
//
//        //count
//        console.log("Count: " + greaterThanOne.count());
//
////        //fetch
////        console.log("All items", greaterThanOne.fetch());
////        greaterThanOne.rewind();
////
////        //forEach
////        greaterThanOne.forEach(function (message) {
////            console.log(message);
////        });
////        greaterThanOne.rewind();
////
////        //map
////        var textFromMessages = greaterThanOne.map(function (message) {
////            return message.text;
////        });
////        console.log("Message's text", textFromMessages);
////
////        //observe
////        greaterThanOne.observe({
////            addedAt: function (document, atIndex, before){
////                console.log("Added", document, atIndex, before);
////            },
////            changedAt: function (document, atIndex, before){
////                console.log("Changed", document, atIndex, before);
////            },
////            removedAt: function (document, atIndex, before){
////                console.log("Removed", document, atIndex, before);
////            },
////            movedTo: function (document, atIndex, before){
////                console.log("Moved", document, atIndex, before);
////            }
////        });
//    }, 2500);
//
//});