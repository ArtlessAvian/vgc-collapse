var PokemonSuperposition = (function () {
    function PokemonSuperposition(copy) {
        this.matrix = [];
        if (copy == undefined) {
            this.matrix.push(Model.pokemon_sorted.slice());
            this.matrix.push(Model.abilities_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
        }
        else {
            this.matrix.push(copy.matrix[0].slice());
            this.matrix.push(copy.matrix[1].slice());
            this.matrix.push(copy.matrix[2].slice());
            this.matrix.push(copy.matrix[2].slice());
            this.matrix.push(copy.matrix[2].slice());
            this.matrix.push(copy.matrix[2].slice());
        }
    }
    PokemonSuperposition.prototype.collapse = function (observation, recursion_depth) {
        if (recursion_depth === void 0) { recursion_depth = 0; }
        if (recursion_depth > 10) {
            console.log("RECURSION DEPTH EXCEEDED. Results might be wrong!");
        }
        if (observation == 0) {
            var possible_abilities_1 = [];
            this.matrix[0].forEach(function (element) {
                possible_abilities_1 = possible_abilities_1.concat(Model.pokemon_to_abilities[element]);
            });
            var intersection = intersect(this.matrix[1], possible_abilities_1);
            if (!arrayEqual(this.matrix[1], intersection)) {
                this.matrix[1] = intersection;
                this.collapse(1, recursion_depth + 1);
            }
            var possible_moves_1 = [];
            this.matrix[0].forEach(function (element) {
                possible_moves_1 = possible_moves_1.concat(Model.pokemon_to_moves[element]);
            });
            for (var i = 2; i <= 5; i++) {
                var intersection_1 = intersect(this.matrix[i], possible_moves_1);
                if (!arrayEqual(this.matrix[i], intersection_1)) {
                    this.matrix[i] = intersection_1;
                    this.collapse(i, recursion_depth + 1);
                }
            }
        }
        else if (observation == 1) {
            var possible_pokemon_1 = [];
            this.matrix[1].forEach(function (element) {
                possible_pokemon_1 = possible_pokemon_1.concat(Model.abilities_to_pokemon[element]);
            });
            var intersection = intersect(this.matrix[0], possible_pokemon_1);
            if (!arrayEqual(this.matrix[0], intersection)) {
                this.matrix[0] = intersection;
                this.collapse(0, recursion_depth + 1);
            }
        }
        else if (observation >= 2 && observation <= 5) {
            var possible_pokemon_2 = [];
            this.matrix[observation].forEach(function (element) {
                possible_pokemon_2 = possible_pokemon_2.concat(Model.moves_to_pokemon[element]);
            });
            var intersection = intersect(this.matrix[0], possible_pokemon_2);
            if (!arrayEqual(this.matrix[0], intersection)) {
                this.matrix[0] = intersection;
                this.collapse(0, recursion_depth + 1);
            }
            for (var i = 2; i <= 5; i++) {
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
function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}
function randomElement(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
function arrayEqual(a, b) {
    if (a.length != b.length) {
        return false;
    }
    return a.every(function (value, index) { return value == b[index]; });
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
