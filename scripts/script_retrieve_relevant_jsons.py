import json

def getList(dictionary: dict) -> [str]:
    '''Given a dictionary, gets list of keys.'''
    return [*dictionary]

def write_to_json(file_name: str, dictionary: dict):
    '''Given a dictionary, creates a .json file.
    
    Arguments:
        file_name: desired name of the file
        dictionary: dictionary that contains the information
        
    Returns:
        None
    '''
    string = json.dumps(dictionary)
    text_file = open(file_name, 'w')
    text_file.write(string)
    text_file.close()
    
def get_moves_hashmaps(data: dict) -> (dict, dict):
    '''Hash Pokemon to moves.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Learnset data. A dict mapping Pokemon (string) to a dict
        with a single key, "learnset" (string). The value of the associated 
        with "learnset" is another dict, which maps moves (string) to the 
        method by which the aforementioned Pokemon attains the move.
        
    Returns:
        A 2-tuple of dicts. The first dict maps Pokemon (string) to the moves
        they can learn (list of strings). The second dict maps moves (string)
        to the Pokemon that can learn them (list of strings).
    '''
    pokemon_to_moves_map = {}
    moves_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        for learnset, move_to_move_source_map in second_dict.items():
            moves = getList(move_to_move_source_map.keys())
            pokemon_to_moves_map[pokemon_name] = moves
            for move in moves:
                try:
                    moves_to_pokemon_map[move].append(pokemon_name)
                except KeyError:
                    moves_to_pokemon_map[move] = []
                    moves_to_pokemon_map[move].append(pokemon_name)
    return (pokemon_to_moves_map, moves_to_pokemon_map)

def get_abilities_hashmaps(data: dict) -> (dict, dict):
    '''Hash Pokemon to abilities.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to a dict.
        This dict maps trait types (string) to specific traits (ints, strings,
        dicts, etc.).
        
    Returns:
        A 2-tuple of dicts. The first dict maps Pokemon (string) to the 
        abilities they can have (list of strings). The second dict maps 
        abilities (string) to the Pokemon that can have them (list of strings).
    '''
    pokemon_to_abilities_map = {}
    abilities_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        abilities_list = getList(second_dict["abilities"].values())
        pokemon_to_abilities_map[pokemon_name] = abilities_list      
        for ability in abilities_list:
            try:
                abilities_to_pokemon_map[ability].append(pokemon_name)
            except KeyError:
                abilities_to_pokemon_map[ability] = []
                abilities_to_pokemon_map[ability].append(pokemon_name)
    return (pokemon_to_abilities_map, abilities_to_pokemon_map)

def get_pokemon_to_name_hashmaps(data: dict) -> dict:
    '''Hash variable names to human-friendly names.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to a dict.
        This dict maps trait types (string) to specific traits (ints, strings,
        dicts, etc.).
        
    Returns:
        A dict mapping variable names (string) to the UTF-encoded Pokemon 
        names (string).
    '''
    pokemon_to_name_map = {}
    for pokemon_name, second_dict in data.items():
        pokemon_to_name_map[pokemon_name] = second_dict["species"]
    return pokemon_to_name_map
                
if __name__ == '__main__':
    
    with open('../data/data_learnsets.txt') as json_file:
        learnsets = json.load(json_file)
        moves_hashmaps = get_moves_hashmaps(learnsets)
        
        # Get Pokemon-to-moves JSON.
        write_to_json('../data/moves/data_pokemon_to_moves.json', 
                      moves_hashmaps[0])     
        write_to_json('../data/moves/data_moves_to_pokemon.json', 
                      moves_hashmaps[1])
 
    with open('../data/data_pokedex.txt', encoding='utf-8') as json_file:
        pokedex = json.load(json_file)
        abilities_hashmaps = get_abilities_hashmaps(pokedex)
        
        
        # Get Pokemon-to-abilities JSON.
        write_to_json('../data/abilities/data_pokemon_to_abilities.json', 
                      abilities_hashmaps[0])     
        write_to_json('../data/abilities/data_abilities_to_pokemon.json', 
                      abilities_hashmaps[1])
    
        # Get variable-to-name JSON.
        write_to_json('../data/names/data_pokemon_to_name.json', 
                      get_pokemon_to_name_hashmaps(pokedex))
    