var PokemonSuperposition = (function () {
    function PokemonSuperposition(copy) {
        this.matrix = [];
        if (copy == undefined) {
            this.matrix.push(Model.pokemon_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
        }
        else {
            this.matrix.push(copy.matrix[0].slice());
            this.matrix.push(copy.matrix[1].slice());
            this.matrix.push(this.matrix[1].slice());
            this.matrix.push(this.matrix[1].slice());
            this.matrix.push(this.matrix[1].slice());
        }
    }
    PokemonSuperposition.prototype.collapse = function (observation) {
        console.log(this.matrix.map(function (vec) { return vec.join(", "); }).join("\n\n"));
        console.log(observation + "was observed");
        if (observation == 0) {
            var possible_moves_1 = [];
            this.matrix[0].forEach(function (element) {
                possible_moves_1 = possible_moves_1.concat(Model.pokemon_to_moves[element]);
            });
            for (var i = 1; i <= 4; i++) {
                var intersection = intersect(this.matrix[i], possible_moves_1);
                if (this.matrix[i] != intersection) {
                    this.matrix[i] = intersection;
                    console.log("no change");
                }
            }
        }
        if (observation >= 1 && observation <= 4) {
            var possible_pokemon_1 = [];
            this.matrix[observation].forEach(function (element) {
                possible_pokemon_1 = possible_pokemon_1.concat(Model.moves_to_pokemon[element]);
            });
            var intersection = intersect(this.matrix[0], possible_pokemon_1);
            if (this.matrix[0] != intersection) {
                this.matrix[0] = intersection;
                this.collapse(0);
            }
            for (var i = 1; i <= 4; i++) {
                var index = this.matrix[i].indexOf(this.matrix[observation][0]);
                if (i != observation && index != -1) {
                    this.matrix[i].splice(this.matrix[i].indexOf(this.matrix[observation][0]), 1);
                }
            }
        }
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
        console.log(this.pos.matrix.map(function (vec) { return vec.join(", "); }).join("\n"));
        console.log(this);
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
        return index;
    };
    return Collapser;
}());
var instance;
Promise.all(Model.promises).then(function () {
    instance = new Collapser();
    console.log("Ready!");
});
function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}
function randomElement(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
function intersect(a, b) {
    var out = [];
    a = a.sort();
    b = b.sort();
    var ai = 0;
    var bi = 0;
    while (ai < a.length && bi < b.length) {
        if (a[ai] < b[bi]) {
            ai++;
        }
        else if (a[ai] > b[bi]) {
            bi++;
        }
        else {
            out.push(a[ai]);
            ai++;
            bi++;
        }
    }
    return out;
}
