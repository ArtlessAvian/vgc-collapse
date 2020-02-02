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
    
def get_moves_hashmaps(data: dict, names: dict, move_names: dict) \
-> (dict, dict):
    '''Hash Pokemon to moves.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Learnset data. A dict mapping Pokemon (string) to a dict
            with a single key, "learnset" (string). The value of the associated 
            with "learnset" is another dict, which maps moves (string) to the 
            method by which the aforementioned Pokemon attains the move 
            (string).
        names: A dict mapping variable names (string) to user-friendly names
            (string).
        move_names: A dict mapping variable names (string) to user-friendly names
            (string).
        
    Returns:
        A 2-tuple of dicts. The first dict maps Pokemon (string) to the moves
        they can learn (list of strings). The second dict maps moves (string)
        to the Pokemon that can learn them (list of strings).
    '''
    pokemon_to_moves_map = {}
    moves_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        for learnset, move_to_move_source_map in second_dict.items():
            for move, move_sources in move_to_move_source_map.items():
                for move_source in move_sources:
                    if move_source[0] == '8':
                        display_name = names[pokemon_name]
                        move_display_name = move_names[move]
                        try:
                            moves_to_pokemon_map[move_display_name].append(display_name)
                        except KeyError:
                            moves_to_pokemon_map[move_display_name] = []
                            moves_to_pokemon_map[move_display_name].append(display_name)                        
                        try:
                            pokemon_to_moves_map[display_name].append(move_display_name)
                        except KeyError:
                            pokemon_to_moves_map[display_name] = []
                            pokemon_to_moves_map[display_name].append(move_display_name)
                        break
    return (pokemon_to_moves_map, moves_to_pokemon_map)


def get_abilities_hashmaps(data: dict, names: dict, legal_pokemon: set) \
-> (dict, dict):
    '''Hash Pokemon to abilities.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to a dict.
            This dict maps trait types (string) to specific traits (ints, 
            strings, dicts, etc.).
        names: A dict mapping variable names (string) to user-friendly names
            (string).
        legal_pokemon: Set of Pokemon that exist in generation 8.
        
    Returns:
        A 2-tuple of dicts. The first dict maps Pokemon (string) to the 
        abilities they can have (list of strings). The second dict maps 
        abilities (string) to the Pokemon that can have them (list of strings).
    '''
    pokemon_to_abilities_map = {}
    abilities_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        if pokemon_name in legal_pokemon:
            display_name = names[pokemon_name]
            abilities_list = getList(second_dict["abilities"].values())
            pokemon_to_abilities_map[display_name] = abilities_list      
            for ability in abilities_list:
                try:
                    abilities_to_pokemon_map[ability].append(display_name)
                except KeyError:
                    abilities_to_pokemon_map[ability] = []
                    abilities_to_pokemon_map[ability].append(display_name)
    return (pokemon_to_abilities_map, abilities_to_pokemon_map)

def get_types_hashmaps(data: dict, names: dict, legal_pokemon: set) \
-> (dict, dict):
    '''Hash Pokemon to abilities.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to a dict.
            This dict maps trait types (string) to specific traits (ints, 
            strings, dicts, etc.).
        names: A dict mapping variable names (string) to user-friendly names
            (string).
        legal_pokemon: Set of Pokemon that exist in generation 8.
        
    Returns:
        A 2-tuple of dicts. The first dict maps Pokemon (string) to the 
        types they are (list of strings). The second dict maps types (string) 
        to the Pokemon that are that type (list of strings).
    '''
    pokemon_to_types_map = {}
    types_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        if pokemon_name in legal_pokemon:
            display_name = names[pokemon_name]
            types = second_dict["types"]
            pokemon_to_types_map[display_name] = types    
            for pkmn_type in types:
                try:
                    types_to_pokemon_map[pkmn_type].append(display_name)
                except KeyError:
                    types_to_pokemon_map[pkmn_type] = []
                    types_to_pokemon_map[pkmn_type].append(display_name)
    return (pokemon_to_types_map, types_to_pokemon_map)

def get_legal_pokemon_set(data: dict) -> set:
    '''Hash variable names to human-friendly names.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Formats data. A dict mapping Pokemon (string) to their
            availability in different generations.
        
    Returns:
        A set of Pokemon (string).
    '''
    pokemon_set = set()
    for pokemon_name, secondary_dict in data.items():
        try:
            if secondary_dict["tier"] != "Unreleased" \
                    and secondary_dict["tier"] != "Illegal":
                pokemon_set.add(pokemon_name)
        except KeyError:
            pass
    return pokemon_set

def get_pokemon_to_name_hashmaps(data: dict) -> list:
    '''Retrieve Pokemon in the gen 8 pokedex.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to a dict.
        This dict maps trait types (string) to specific traits (ints, strings,
        dicts, etc.).
        
    Returns:
        A 2-tuple of dicts. The first dict maps variable names (string) to a
        user-friendly name (string). The second dict maps the user-friendly
        name (string) to a variable name (string).
    '''
    pokemon_to_name_map = {}
    name_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        pokemon_to_name_map[pokemon_name] = second_dict["species"]
        name_to_pokemon_map[second_dict["species"]] = pokemon_name
    return (pokemon_to_name_map, name_to_pokemon_map)
                
def get_moves_to_name_hashmaps(data: dict) -> list:
    '''Retrieve Pokemon in the gen 8 pokedex.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping moves (string) to a dict.
        This dict maps trait types (string) to specific traits (ints, strings,
        dicts, etc.).
        
    Returns:
        A 2-tuple of dicts. The first dict maps variable names (string) to a
        user-friendly name (string). The second dict maps the user-friendly
        name (string) to a variable name (string).
    '''
    moves_to_name_map = {}
    name_to_moves_map = {}
    for move_name, second_dict in data.items():
        moves_to_name_map[move_name] = second_dict["name"]
        name_to_moves_map[second_dict["name"]] = move_name
    return (moves_to_name_map, name_to_moves_map)

if __name__ == '__main__':
    legal_pokemon_set = set()
    name_to_display_map = None
    moves_to_display_map = None
    
    with open('../data/data_formats.txt') as json_file:
        formats = json.load(json_file)
        legal_pokemon_set = get_legal_pokemon_set(formats)
        dummy_var = {}
        dummy_var["pokemon_list"] = list(legal_pokemon_set)
        
        # Get the Pokemon available in generation 8.
        write_to_json('../data/names/data_legal_pokemon.json', 
                      dummy_var)
        
    
    with open('../data/data_pokedex.txt', encoding='utf-8') as json_file:
        pokedex = json.load(json_file)    
        name_to_display_map = get_pokemon_to_name_hashmaps(pokedex)[0]
        
    with open('../data/data_moves.txt', encoding='utf-8') as json_file:
        moves = json.load(json_file)    
        moves_to_display_map = get_moves_to_name_hashmaps(moves)[0]
        
    with open('../data/data_learnsets.txt') as json_file:
        learnsets = json.load(json_file)
        moves_hashmaps = get_moves_hashmaps(learnsets, \
                                            name_to_display_map, \
                                            moves_to_display_map)
        
        # Get Pokemon-to-moves JSON.
        write_to_json('../data/moves/data_pokemon_to_moves.json', 
                      moves_hashmaps[0])     
        write_to_json('../data/moves/data_moves_to_pokemon.json', 
                      moves_hashmaps[1])
        
    with open('../data/data_pokedex.txt', encoding='utf-8') as json_file:
        pokedex = json.load(json_file)
        abilities_hashmaps = get_abilities_hashmaps(pokedex, \
                                                    name_to_display_map, \
                                                    legal_pokemon_set)
    
        types_hashmaps = get_types_hashmaps(pokedex, \
                                            name_to_display_map, \
                                            legal_pokemon_set)
        # Get Pokemon-to-abilities JSON.
        write_to_json('../data/abilities/data_pokemon_to_abilities.json', 
                      abilities_hashmaps[0])     
        write_to_json('../data/abilities/data_abilities_to_pokemon.json', 
                      abilities_hashmaps[1])
        
        # Get Pokemon-to-types JSON.
        write_to_json('../data/types/data_pokemon_to_types.json', 
                      types_hashmaps[0])     
        write_to_json('../data/types/data_types_to_pokemon.json', 
                      types_hashmaps[1])
    

                      