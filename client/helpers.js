Handlebars.registerHelper("fromNow", function (time) {
    return moment(time).fromNow();
});