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
             
if __name__ == '__main__':
    pokemon_to_moves_map = {}
    moves_to_pokemon_map = {}

    with open('../data/data_learnsets.txt') as json_file:
        data = json.load(json_file)
        
    for pokemon_name, second_dict in data.items():
        for learnset, move_to_move_source_map in second_dict.items():
            moves = getList(move_to_move_source_map.keys())
            
            pokemon_to_moves_map[pokemon_name] = moves
            
            for move in moves:
                if move not in moves_to_pokemon_map:
                    moves_to_pokemon_map[move] = []
                moves_to_pokemon_map[move].append(pokemon_name)
    
    write_to_json('../data/data_moves_to_pokemon.json', moves_to_pokemon_map)
    write_to_json('../data/data_pokemon_to_moves.json', pokemon_to_moves_map)  