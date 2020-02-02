// import {Dropdown} from "./dropdown"

interface Superposition
{
    matrix : string[][];
    collapse(observation : number) : void;
}

class TeamSuperposition
{
    matrix : string[][];
    members : PokemonSuperposition[];

    constructor(copy? : TeamSuperposition)
    {
        this.matrix = [];
        this.members = [];
        if (copy == undefined)
        {
            for (var i = 0; i < 6; i++)
            {
                this.members.push(new PokemonSuperposition());
                // console.log(this.members);
            }
        }
        else
        {
            for (var i = 0; i < 6; i++)
            {
                this.members.push(new PokemonSuperposition(copy.members[i]));
                // console.log(this.members);
            }   
        }
        
        this.buildMatrix();
    }

    private buildMatrix()
    {
        this.matrix = [];
        for (let i = 0; i < 6; i++)
        {
            this.matrix = this.matrix.concat(this.members[i].matrix);
            // console.log(this.matrix)
        }
    }

    public collapse(observation : number)
    {
        // console.log(this.matrix[observation]);
        if (this.matrix[observation].length == 1)
        {
            // species clause
            if (observation % PokemonSuperposition.pokemonSize == 0)
            {
                for (let i = 0; i < PokemonSuperposition.pokemonSize * 6; i += PokemonSuperposition.pokemonSize)
                {
                    let index = this.matrix[i].indexOf(this.matrix[observation][0]);
                    if (i != observation && index != -1)
                    {
                        // console.log("removed " + this.matrix[observation][0])
                        this.matrix[i].splice(this.matrix[i].indexOf(this.matrix[observation][0]), 1);
                        this.collapse(i);
                    }
                }
            }
            // item clause
            if (observation % PokemonSuperposition.pokemonSize == 6)
            {
                for (let i = 6; i < PokemonSuperposition.pokemonSize * 6; i += PokemonSuperposition.pokemonSize)
                {
                    let index = this.matrix[i].indexOf(this.matrix[observation][0]);
                    if (i != observation && index != -1)
                    {
                        this.matrix[i].splice(this.matrix[i].indexOf(this.matrix[observation][0]), 1);
                        this.collapse(i);
                    }
                }
            }
        }

        // console.log(Math.floor(observation/PokemonSuperposition.pokemonSize), observation % PokemonSuperposition.pokemonSize);
        this.members[Math.floor(observation/PokemonSuperposition.pokemonSize)].collapse(observation % PokemonSuperposition.pokemonSize);
        // this.buildMatrix();
    }

    public toString()
    {
        return this.members.map(a => a.toString()).join("\n\n");
    }
}

class PokemonSuperposition
{
    static readonly pokemonSize = 7;
    matrix : string[][];
    constructor(copy? : PokemonSuperposition)
    {
        this.matrix = [];
        if (copy == undefined)
        {
            this.matrix.push(Model.pokemon_sorted.slice());
            this.matrix.push(Model.abilities_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.items_sorted.slice());
        }
        else
        {
            for (let i = 0; i < PokemonSuperposition.pokemonSize; i++)
            {
                this.matrix.push(copy.matrix[i].slice());
            }
        }
    }

    public collapse(observation : number, recursion_depth = 0) : void
    {
        if (recursion_depth > 20)
        {
            console.log("RECURSION DEPTH EXCEEDED. Infinite loop? Results might be wrong!");
        }

        // console.log(this.matrix.map(vec => vec.join(", ")).join("\n\n"));
        // console.log("before " + observation, this.matrix[2]);

        if (observation == 0)
        {
            let possible_abilities = [];
            this.matrix[0].forEach(element => {
                possible_abilities = possible_abilities.concat(Model.pokemon_to_abilities[element]);
            });
            let intersection = intersect(this.matrix[1], possible_abilities);
            if (!arrayEqual(this.matrix[1], intersection))
            {
                fillArray(this.matrix[1], intersection);
                this.collapse(1, recursion_depth + 1);
            }

            let possible_moves = [];
            this.matrix[0].forEach(element => {
                possible_moves = possible_moves.concat(Model.pokemon_to_moves[element]);
            });

            for (let i = 2; i <= 5; i++)
            {
                // this.matrix[i] = intersect(this.matrix[i], Model.pokemon_to_moves[this.matrix[0][0].toString()])
                let intersection = intersect(this.matrix[i], possible_moves);
                if (!arrayEqual(this.matrix[i], intersection))
                {
                    // this.matrix
                    fillArray(this.matrix[i], intersection);
                    // console.log("after " + observation, this.matrix[2]);
                    this.collapse(i, recursion_depth + 1);
                }
            }
        }
        else if (observation == 1)
        {
            let possible_pokemon = [];
            this.matrix[1].forEach(element => {
                possible_pokemon = possible_pokemon.concat(Model.abilities_to_pokemon[element]);
            });
            let intersection = intersect(this.matrix[0], possible_pokemon);
            if (!arrayEqual(this.matrix[0], intersection))
            {
                fillArray(this.matrix[0], intersection);
                this.collapse(0, recursion_depth + 1);
            }
        }
        else if (observation >= 2 && observation <= 5)
        {
            if (this.matrix[observation].length == 1)
            {
                for (let i = 2; i <= 5; i++)
                {
                    let index = this.matrix[i].indexOf(this.matrix[observation][0]);
                    if (i != observation && index != -1)
                    {
                        this.matrix[i].splice(this.matrix[i].indexOf(this.matrix[observation][0]), 1);
                        // no need to recur
                    }
                }
            }

            let possible_pokemon = [];
            this.matrix[observation].forEach(element => {
                possible_pokemon = possible_pokemon.concat(Model.moves_to_pokemon[element]);
            });
            let intersection = intersect(this.matrix[0], possible_pokemon)
            if (!arrayEqual(this.matrix[0], intersection))
            {
                fillArray(this.matrix[0], intersection);
                this.collapse(0, recursion_depth + 1);
            }
        }
        // console.log("finshed " + observation, this.matrix[2]);
    }

    public toString()
    {
        return `${this.matrix[0][0]} @ ${this.matrix[6][0]}\nAbility: ${this.matrix[1][0]}\nLevel: 50\n- ${this.matrix[2][0]}\n- ${this.matrix[3][0]}\n- ${this.matrix[4][0]}\n- ${this.matrix[5][0]}`;
    }
}

class Collapser
{
    pos : TeamSuperposition;
    history : Array<TeamSuperposition>;
    stepNumber : number = 0;

    constructor()
    {
        this.pos = new TeamSuperposition();
        this.history = [new TeamSuperposition(this.pos)];
    }

    public step()
    {
        let observation : number = this.observe();
        if (observation >= 0)
        {
            this.pos.collapse(observation);
            this.stepNumber++;
            this.history = this.history.slice(0, this.stepNumber);
            this.history.push(new TeamSuperposition(this.pos));
        }
        else if (observation == -2)
        {
            // console.log("OBJECTION! Contradiction!");
            this.backstep();
            this.step();
        }

        // console.log(this.matrix.map(vec => vec.length == 1 ? vec[0] : "").join("\n"));
        // console.log(this.pos.matrix.map(vec => vec.join(", ")).join("\n"));
        // console.log(this);
        
        return observation;
    }

    public backstep()
    {
        if (this.stepNumber == 0) {return -1;}
        this.stepNumber--;
        this.pos = new TeamSuperposition(this.history[this.stepNumber]);
        // console.log(this.pos.matrix.map(vec => vec.join(", ")).join("\n"));
        // console.log(this);
        return 0;
    }

    public set(index : number, value : string)
    {
        // console.log(index, value);
        clearArray(this.pos.matrix[index]).push(value);
        this.pos.collapse(index);
        this.stepNumber++;
        this.history.push(new TeamSuperposition(this.pos));
    }
    
    // returns -2 on contradiciton
    // returns -1 when done
    // returns index of observation
    private observe() : number
    {
        if (this.pos.matrix.some(thingy => thingy.length == 0))
        {
            return -2;
        }
        if (this.pos.matrix.every(thingy => thingy.length == 1))
        {
            // all thingies are 1.
            return -1;
        }
    
        // let vector = randomElement(this.pos.state.filter(thingy => thingy.length > 1));
        let choices = this.pos.matrix.filter(vec => vec.length > 1)
        let smallest = Math.min.apply(Math, choices.map(choice => choice.length));
        let vector = randomElement(choices.filter(vec => vec.length == smallest))

        let index = this.pos.matrix.indexOf(vector);
        let element = randomElement(vector);
        clearArray(this.pos.matrix[index]).push(element);
        
        return index;
    }
}

// HELPERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

function randomInt(start : number, end : number)
{
    return Math.floor(Math.random() * (end-start + 1)) + start;
}

function randomElement<T>(arr : Array<T>) : T
{
    return arr[randomInt(0, arr.length-1)];
}

function arrayEqual<T>(a : Array<T>, b : Array<T>) : boolean
{
    if (a.length != b.length)
    {
        return false;
    }
    return a.every((value, index) => value == b[index]);
}

function intersect<T>(a : Array<T>, b : Array<T>) : Array<T>
{
    let out = [];

    a = a.sort(); // just to be sure
    b = b.sort();

    let ai = 0;
    let bi = 0;
    while (ai < a.length && bi < b.length)
    {
        if (a[ai] < b[bi])
        {
            ai++;
        }
        else if (a[ai] > b[bi])
        {
            bi++;
        }
        else
        {
            out.push(a[ai]);
            ai++; bi++;
        }
    }
    return out;
}

// Change contents of array, to preserve references

function clearArray<T>(a : Array<T>) : Array<T>
{
    for (let i = a.length; i > 0; i--)
    {
        a.pop();
    }
    return a;
}

function fillArray<T>(a : Array<T>, b : Array<T>) : Array<T>
{
    clearArray(a);
    for (let c of b)
    {
        a.push(c);
    }
    return a;
}