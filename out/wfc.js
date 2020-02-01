var PokemonSuperposition = (function () {
    function PokemonSuperposition(copy) {
        this.matrix = [];
        if (copy == null) {
            this.matrix.push(["Dragapult", "Arcanine", "Excadrill", "Whimsicott", "Togekiss", "Gastrodon"]);
            this.matrix.push(["Life Orb", "Weakness Policy", "Lum Berry", "Choice Specs", "Focus Sash"]);
        }
        else {
            this.matrix.push(copy.matrix[0].slice());
            this.matrix.push(copy.matrix[1].slice());
        }
    }
    PokemonSuperposition.prototype.collapse = function (observation) {
        console.log(observation);
    };
    return PokemonSuperposition;
}());
var Collapser = (function () {
    function Collapser() {
        this.stepNumber = 0;
        this.pos = new PokemonSuperposition();
        this.history = [new PokemonSuperposition(this.pos)];
    }
    Collapser.prototype.step = function () {
        var observation = this.observe();
        if (observation >= 0) {
            this.pos.collapse(observation);
            this.history.push(new PokemonSuperposition(this.pos));
        }
        return observation;
    };
    Collapser.prototype.fiveStep = function () {
        for (var i = 0; i < 5 && this.step() >= 0; i++)
            ;
    };
    Collapser.prototype.observe = function () {
        if (this.pos.matrix.some(function (thingy) { return thingy.length == 0; })) {
            return -2;
        }
        if (this.pos.matrix.every(function (thingy) { return thingy.length == 1; })) {
            return -1;
        }
        var choices = this.pos.matrix.filter(function (vec) { return vec.length > 1; });
        var smallest = Math.min.apply(Math, choices.map(function (choice) { return choice.length; }));
        var vector = randomElement(choices.filter(function (vec) { return vec.length == smallest; }));
        var index = this.pos.matrix.indexOf(vector);
        var element = randomElement(vector);
        this.pos.matrix[index] = [element];
        console.log(this.pos.matrix.map(function (vec) { return vec.join(", "); }).join("\n"));
        console.log(this.pos);
        return index;
    };
    return Collapser;
}());
var instance = new Collapser();
function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}
function randomElement(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
