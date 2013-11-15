Emoticon = {};

var emoticonImages = [
    {src: "/happy.png", pattern: /:-?\)/g},
    {src: "/surprised.jpg", pattern: /:[Oo0]/g}
];

Emoticon.getHtml = function (text) {
    emoticonImages.forEach(function (element, index, array) {
        text = text.replace(element.pattern, "<img src='" + element.src + "' class='emoticonSmall'></img>");
    });

    return text;
};