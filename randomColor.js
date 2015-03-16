var setColors = ['red', 'green', 'blue', 'magenta', 'cyan'];
var availableColors = [];

module.exports = function() {

    if (!availableColors.length) {
        availableColors = setColors.map(function(color) {
            return color;
        });
    }

    return availableColors.splice(Math.floor(Math.random()*availableColors.length), 1);
};
