Package.describe({
    summary: 'Emoticon utilities'
});

Package.on_use(function (api) {
    api.imply('linkedin');

    api.add_files('emoticon.js', 'client');
    api.add_files('emoticon.css', 'client');

    api.export('Emoticon');
});
