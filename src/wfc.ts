interface Superposition
{
    matrix : Array<Array<String>>;
    collapse(observation : number) : void;
}

class PokemonSuperposition
{
    matrix : Array<Array<String>>;
    constructor(copy? : PokemonSuperposition)
    {
        this.matrix = [];
        if (copy == undefined)
        {
            this.matrix.push(Object.keys(Model.pokemon_to_moves));
            this.matrix.push(Object.keys(Model.moves_to_pokemon));
            this.matrix.push(this.matrix[1]);
            this.matrix.push(this.matrix[1]);
            this.matrix.push(this.matrix[1]);
            // this.matrix.push(["Dragapult", "Arcanine", "Excadrill", "Whimsicott", "Togekiss", "Gastrodon"]);
            // this.matrix.push(["Life Orb", "Weakness Policy", "Lum Berry", "Choice Specs", "Focus Sash"]);
        }
        else
        {
            this.matrix.push(copy.matrix[0].slice());
            this.matrix.push(copy.matrix[1].slice());
            this.matrix.push(this.matrix[1]);
            this.matrix.push(this.matrix[1]);
            this.matrix.push(this.matrix[1]);
        }
    }

    public collapse(observation : number) : void
    {
        let dirty = [observation];
        while (dirty.length > 0)
        {
            let index = dirty.pop()

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
        
        console.log(this.pos.matrix.map(vec => vec.join(", ")).join("\n"));
        console.log(this.pos);
        return index;
    }
}
let instance : Collapser = new Collapser();

function randomInt(start : number, end : number)
{
    return Math.floor(Math.random() * (end-start + 1)) + start;
}

function randomElement<T>(arr : Array<T>) : T
{
    return arr[randomInt(0, arr.length-1)];
}
