interface Superposition
{
    matrix : Array<Array<String>>;
    collapse(observation : number) : void;
}

class PokemonSuperposition
{
    matrix : Array<Array<String>>;
    constructor()
    {
        this.matrix = [];
        this.matrix.push(["Dragapult", "Arcanine", "Excadrill", "Whimsicott", "Togekiss", "Gastrodon"]);
        this.matrix.push(["Life Orb", "Weakness Policy", "Lum Berry", "Choice Specs", "Focus Sash"]);
    }

    public collapse(observation : number) : void
    {
    //     let dirty = [observation];
    //     while (dirty.length > 0)
    //     {
    //         dirty.pop()
    //     }
        console.log(observation);
    }
}

class Collapser
{
    pos : Superposition;
    history : Array<Superposition>;
    stepNumber : number = 0;

    constructor(superposition : Superposition = new PokemonSuperposition())
    {
        this.pos = new PokemonSuperposition();
        this.history = [];
    }

    public step()
    {
        // this.history.push(new PokemonSuperposition(this.pos));

        let observation : number = this.observe();
        if (observation >= 0)
        {
            this.pos.collapse(observation);
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
