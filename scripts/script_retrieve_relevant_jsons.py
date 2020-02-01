import json

def getList(dictionary):
    '''Given a dictionary, gets list of keys.'''
    return [*dictionary]

def write_to_json(file_name, dictionary):
    '''Given a dictionary, creates a .json file.
    
    Arguments:
        file_name (string): desired name of the file
        dictionary (dict): dictionary that contains the information
        
    Returns:
        None
    '''
    string = json.dumps(dictionary)
    text_file = open(file_name, 'w')
    text_file.write(string)
    text_file.close()
             
    
def get_moves_hashmaps(data):
    pokemon_to_moves_map = {}
    moves_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        for learnset, move_to_move_source_map in second_dict.items():
            moves = getList(move_to_move_source_map.keys())
            
            pokemon_to_moves_map[pokemon_name] = moves
            
            for move in moves:
                if move not in moves_to_pokemon_map:
                    moves_to_pokemon_map[move] = []
                moves_to_pokemon_map[move].append(pokemon_name)
    return (pokemon_to_moves_map, moves_to_pokemon_map)

def get_abilities_hashmaps(data):
    pokemon_to_abilities_map = {}
    abilities_to_pokemon_map = {}
    for pokemon_name, second_dict in data.items():
        abilities_list = getList(second_dict["abilities"].keys())
        pokemon_to_abilities_map[pokemon_name] = abilities_list
        
        for ability in abilities_list:
            if ability not in abilities_to_pokemon_map:
                abilities_to_pokemon_map[ability] = []
            abilities_to_pokemon_map[ability].append(pokemon_name)
    return (pokemon_to_abilities_map, abilities_to_pokemon_map)
                
if __name__ == '__main__':
    
    with open('../data/data_learnsets.txt') as json_file:
        learnsets = json.load(json_file)
        
    moves_hashmaps = get_moves_hashmaps(learnsets)
    
    write_to_json('../data/moves/data_pokemon_to_moves.json', moves_hashmaps[0])     
    write_to_json('../data/moves/data_moves_to_pokemon.json', moves_hashmaps[1])
 
    with open('../data/data_pokedex.txt', encoding='utf-8') as json_file:
        pokedex = json.load(json_file)
        
    abilities_hashmaps = get_abilities_hashmaps(pokedex)
        
    write_to_json('../data/abilities/data_pokemon_to_abilities.json', abilities_hashmaps[0])     
    write_to_json('../data/abilities/data_abilities_to_pokemon.json', abilities_hashmaps[1])
    