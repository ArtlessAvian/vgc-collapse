import json

def getList(dictionary: dict) -> [str]:
    '''Given a dictionary, gets list of keys.'''
    return [*dictionary]

def write_to_json(file_name: str, info: dict):
    '''Given a dictionary, creates a .json file.
    
    Arguments:
        file_name: Desired name of the file.
        info: Dictionary that contains the information.
    '''
    string = json.dumps(info)
    text_file = open(file_name, 'w')
    text_file.write(string)
    text_file.close()
    
def get_moves_hashmaps(data: dict, pkmn_display_names: dict, \
                       move_display_names: dict) -> (dict, dict):
    '''Hash Pokemon to moves.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Learnset data. A dict mapping Pokemon (string) to dicts
            with a single key, "learnset" (string). The value associated with
            "learnset" is another dict, which maps moves (string) to the method
            by which the aforementioned Pokemon attains the move (string).
        pkmn_display_names: A dict mapping Pokemon variable names (string) to 
            user-friendly display names (string).
        move_display_names: A dict mapping move variable names (string) to 
            user-friendly display names (string).
        
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
                        pkmn_display_name = pkmn_display_names[pokemon_name]
                        move_display_name = move_display_names[move]
                        try:
                            moves_to_pokemon_map[move_display_name].append(pkmn_display_name)
                        except KeyError:
                            moves_to_pokemon_map[move_display_name] = []
                            moves_to_pokemon_map[move_display_name].append(pkmn_display_name)                        
                        try:
                            pokemon_to_moves_map[pkmn_display_name].append(move_display_name)
                        except KeyError:
                            pokemon_to_moves_map[pkmn_display_name] = []
                            pokemon_to_moves_map[pkmn_display_name].append(move_display_name)
                        break
    return (pokemon_to_moves_map, moves_to_pokemon_map)


def get_abilities_hashmaps(data: dict, pkmn_display_names: dict, \
                           legal_pokemon: set) -> (dict, dict):
    '''Hash Pokemon to abilities.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to dicts.
            The dicts map trait types (string) to specific traits (ints, 
            strings, dicts, etc.).
        pkmn_display_names: A dict mapping Pokemon variable names (string) to 
            user-friendly display names (string).
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
            pkmn_display_name = pkmn_display_names[pokemon_name]
            abilities_list = getList(second_dict["abilities"].values())
            pokemon_to_abilities_map[pkmn_display_name] = abilities_list      
            for ability in abilities_list:
                try:
                    abilities_to_pokemon_map[ability].append(pkmn_display_name)
                except KeyError:
                    abilities_to_pokemon_map[ability] = []
                    abilities_to_pokemon_map[ability].append(pkmn_display_name)
    return (pokemon_to_abilities_map, abilities_to_pokemon_map)

def get_types_hashmaps(data: dict, pkmn_display_names: dict, \
                       legal_pokemon: set) -> (dict, dict):
    '''Hash Pokemon to abilities.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to dicts.
            The dicts map trait types (string) to specific traits (ints, 
            strings, dicts, etc.).
        pkmn_display_names: A dict mapping variable names (string) to 
            user-friendly display names (string).
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
            pkmn_display_name = pkmn_display_names[pokemon_name]
            types = second_dict["types"]
            pokemon_to_types_map[pkmn_display_name] = types    
            for pkmn_type in types:
                try:
                    types_to_pokemon_map[pkmn_type].append(pkmn_display_name)
                except KeyError:
                    types_to_pokemon_map[pkmn_type] = []
                    types_to_pokemon_map[pkmn_type].append(pkmn_display_name)
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

def get_pokemon_to_name_hashmaps(data: dict) -> (dict, dict):
    '''Retrieve Pokemon in the gen 8 pokedex.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping Pokemon (string) to dicts.
        The dicts map trait types (string) to specific traits (ints, strings,
        dicts, etc.).
        
    Returns:
        A 2-tuple of dicts. The first dict maps Pokemon variable names (string) 
        to user-friendly display names (string). The second dict maps user
        -friendly display names (string) to variable names (string).
    '''
    pokemon_to_name_map = {}
    name_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        pokemon_to_name_map[pokemon_name] = second_dict["species"]
        name_to_pokemon_map[second_dict["species"]] = pokemon_name
    return (pokemon_to_name_map, name_to_pokemon_map)
                
def get_moves_to_name_hashmaps(data: dict) -> (dict, dict):
    '''Retrieve Pokemon in the gen 8 pokedex.
    
    The input file contains a lot of unneccessary information. This function
    simply trims down the input.
    
    Arguments:
        data: Smogon's Pokedex data. A dict mapping moves (string) to a dict.
        The dicts map trait types (string) to specific traits (ints, strings,
        dicts, etc.).
        
    Returns:
        A 2-tuple of dicts. The first dict maps move variable names (string) to
        user-friendly display names (string). The second dict maps user
        -friendly display names (string) to variable names (string).
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
    
   # Get the Pokemon available in generation 8.
    with open('../data/data_formats.txt') as json_file:
        formats = json.load(json_file)
        legal_pokemon_set = get_legal_pokemon_set(formats)
        dummy_var = {}
        dummy_var["pokemon_list"] = list(legal_pokemon_set)
        
        write_to_json('../data/names/data_legal_pokemon.json', 
                      dummy_var)
        
    # Get display names.
    with open('../data/data_pokedex.txt', encoding='utf-8') as json_file:
        pokedex = json.load(json_file)    
        name_to_display_map = get_pokemon_to_name_hashmaps(pokedex)[0]
        
    with open('../data/data_moves.txt', encoding='utf-8') as json_file:
        moves = json.load(json_file)    
        moves_to_display_map = get_moves_to_name_hashmaps(moves)[0]
        
        
    # Get Pokemon-to-moves JSON.        
    with open('../data/data_learnsets.txt') as json_file:
        learnsets = json.load(json_file)
        moves_hashmaps = get_moves_hashmaps(learnsets, \
                                            name_to_display_map, \
                                            moves_to_display_map)
        
        write_to_json('../data/moves/data_pokemon_to_moves.json', 
                      moves_hashmaps[0])     
        write_to_json('../data/moves/data_moves_to_pokemon.json', 
                      moves_hashmaps[1])
        
    # Get Pokemon-to-abilities JSON and Pokemon-to-types JSON.
    with open('../data/data_pokedex.txt', encoding='utf-8') as json_file:
        pokedex = json.load(json_file)
        abilities_hashmaps = get_abilities_hashmaps(pokedex, \
                                                    name_to_display_map, \
                                                    legal_pokemon_set)
    
        write_to_json('../data/abilities/data_pokemon_to_abilities.json', 
                      abilities_hashmaps[0])     
        write_to_json('../data/abilities/data_abilities_to_pokemon.json', 
                      abilities_hashmaps[1])
        
        types_hashmaps = get_types_hashmaps(pokedex, \
                                    name_to_display_map, \
                                    legal_pokemon_set)        

        write_to_json('../data/types/data_pokemon_to_types.json', 
                      types_hashmaps[0])     
        write_to_json('../data/types/data_types_to_pokemon.json', 
                      types_hashmaps[1])
    

                      