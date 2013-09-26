//from https://gist.github.com/IMDagger/5761809
// IMDagger: imdagger.yandex.ru
// 2013-06-12

// base names
var abc = ['jaguar', 'royal', 'accomodate', 'planet', 'earth',
    'moon', 'alpha', 'mars', 'persei', 'columb',
    'vavilon', 'venera', 'odin', 'cucumber', 'generator',
    'vivek', 'vivian', 'crematoria', 'luisiana', 'orlean',
    'embarrasment', 'bebomoro', 'badaboom', 'centurion',
    'caesar', 'jaconda', 'gamma', 'yakee', 'kevlar',
    'koala', 'melancolia', 'death', 'peanut',
    'plastic', 'onion', 'reactor', 'fractal', 'astro'];

// for the special part
var postfix = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
    'X', 'Omega', '1', '7', '13', 'AMP', 'K', 'L3', 'AR7', 'Crypto'];
// for fun, special part I, II ... is too boring :-/
var suffixes = ['te', 'op', '-ni', 'li', 'cla', '-4', '/8', '-4.2'];

var vowel = 'aeiouy';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i -= 1) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
};

function randrange(max_num) {
    return Math.floor((Math.random() * (max_num - 1)) + 1);
}

function choice(table) {
    return table[randrange(table.length)];
}

function is_good(name) {
    // length of the planet name is more than 3 and name has at least one vowel letter
    var i;
    if (name.length >= 3) {
        for (i = 0; i < vowel.length; i += 1) {
            var alp = vowel[i], j;
            for (j = 1; j < name.length; j += 1) {
                if (name[j] === alp) {
                    return true;
                }
            }
        }
    } else {
        return false;
    }
}

generatePlanetName = function () {
    // noname
    var name = '';

    // try to find good name of the planet
    while (!is_good(name)) {
        // non vowel counter
        var non_v = 0;
        var i = 0;
        // choose two names from the dictionary for mixing
        var first = choice(abc);
        var second = choice(abc);
        // first (but is not whole, at least without last symbol)
        // plus
        // second (but is not whole, at least without leading symbol)
        var name = first.slice(0, randrange(first.length - 1)) + second.slice(randrange(second.length - 1) + 1, second.length);

        // make list from string for vowel checkings and random shuffle
        var lst_name = name.split('');

        // only 25% of the words will be shuffled
        if (Math.random < 0.25) {
            lst_name.shuffle();
        }

        // don't make names more than 15 characters length
        // but try to insert vowels
        while (i < lst_name.length && lst_name.length < 15) {
            // found vowel and it's nice
            if (vowel.indexOf(lst_name[i]) !== -1) {
                non_v = 0;
            } else {
                non_v += 1;
            }
            // # two non vowel letters is not nice, it's time for insert operation
            if (non_v > 2) {
                lst_name.splice(i, 0, choice(vowel));
                // one additional letter is in the list now
                // gotta go to the next letter and clear counter
                non_v = 0;
                i += 1;
            }
            i += 1;
        }

        // make string name from the temporary list
        name = lst_name.join('');
    }
    // first letter will be capital and after suffix (space + postfix + suffix)
    return capitalize(name);
};