interface Superposition
{
    matrix : string[][];
    collapse(observation : number) : void;
}

class PokemonSuperposition
{
    matrix : string[][];
    constructor(copy? : PokemonSuperposition)
    {
        this.matrix = [];
        if (copy == undefined)
        {
            this.matrix.push(Model.pokemon_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
            this.matrix.push(Model.moves_sorted.slice());
        }
        else
        {
            this.matrix.push(copy.matrix[0].slice());
            this.matrix.push(copy.matrix[1].slice());
            this.matrix.push(this.matrix[1].slice());
            this.matrix.push(this.matrix[1].slice());
            this.matrix.push(this.matrix[1].slice());
        }
    }

    public collapse(observation : number) : void
    {
        console.log(this.matrix.map(vec => vec.join(", ")).join("\n\n"));

        if (observation == 0)
        {
            let possible_moves = [];
            this.matrix[0].forEach(element => {
                possible_moves.splice(possible_moves.length, 0, Model.pokemon_to_moves[element]);
            });

            for (let i = 1; i <= 4; i++)
            {
                // this.matrix[i] = intersect(this.matrix[i], Model.pokemon_to_moves[this.matrix[0][0].toString()])
                if (intersect(this.matrix[i], possible_moves))
                {
                    // this.collapse(i);
                }
            }
        }
        if (observation >= 1 && observation <= 4)
        {
            let possible_pokemon = [];
            this.matrix[observation].forEach(element => {
                possible_pokemon.splice(possible_pokemon.length, 0, Model.moves_to_pokemon[element]);
            });
            intersect(this.matrix[0], possible_pokemon)
            {
                // this.collapse(0);
            }

            // for (let i = 1; i <= 4; i++)
            // {
            //     let index = this.matrix[i].indexOf(this.matrix[observation][0]);
            //     if (i != observation && index != -1)
            //     {
            //         this.matrix[i].splice(this.matrix[i].indexOf(this.matrix[observation][0]), 1);
            //         // this.collapse(i);
            //     }
            // }
        }
    }
}

class Collapser
{
    pos : Superposition;
    history : Array<Superposition>;
    stepNumber : number = 0;

    constructor()
    {
        this.pos = new PokemonSuperposition();
        this.history = [new PokemonSuperposition(this.pos)];
    }

    public step()
    {
        let observation : number = this.observe();
        if (observation >= 0)
        {
            this.pos.collapse(observation);
            this.history.push(new PokemonSuperposition(this.pos));
        }

        // console.log(this.matrix.map(vec => vec.length == 1 ? vec[0] : "").join("\n"));
        console.log(this.pos.matrix.map(vec => vec.join(", ")).join("\n"));
        console.log(this);
        
        return observation;
    }

    public fiveStep()
    {
        for (let i = 0; i < 5 && this.step() >= 0; i++);
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
        this.pos.matrix[index] = [element];
        
        return index;
    }
}

let instance : Collapser;
Promise.all(Model.promises).then(function()
{
    instance = new Collapser();
    console.log("Ready!");
})

function randomInt(start : number, end : number)
{
    return Math.floor(Math.random() * (end-start + 1)) + start;
}

function randomElement<T>(arr : Array<T>) : T
{
    return arr[randomInt(0, arr.length-1)];
}

function intersect<T>(a : Array<T>, b : Array<T>) : boolean
{
    a = a.sort();
    b = b.sort();

    let out = false;

    let ai = 0;
    let bi = 0;
    while (ai < a.length && bi < b.length)
    {
        if (a[ai] < b[bi])
        {
            console.log(a[ai]);
            a.splice(ai, 1);
            out = true;
        }
        else if (a[ai] > b[bi])
        {
            bi++;
        }
        else
        {
            ai++; bi++;
        }
    }

    return out;
}
