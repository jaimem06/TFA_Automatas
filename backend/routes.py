from flask import Blueprint, request, jsonify
from utils import load_offensive_words, save_offensive_words, hash_word, load_original_words, save_original_words

analyze_bp = Blueprint('analyze', __name__)
add_word_bp = Blueprint('add_word', __name__)
list_words_bp = Blueprint('list_words', __name__)
delete_word_bp = Blueprint('delete_word', __name__)

@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    comment = data['comment']
    offensive_words = load_offensive_words()
    original_words = load_original_words()
    
    # Hashear el comentario para compararlo con las palabras ofensivas hasheadas
    comment_words = comment.lower().split()
    comment_hashes = [hash_word(word) for word in comment_words]
    
    # Verificar si alguna palabra del comentario coincide con las palabras ofensivas
    found_offensive_words = [word for word, hash_word in zip(comment_words, comment_hashes) if hash_word in offensive_words]
    return jsonify({'offensiveWords': found_offensive_words})

@add_word_bp.route('/add-word', methods=['POST'])
def add_word():
    data = request.json
    words_input = data['word'].lower()  # Recibir la cadena de palabras
    words_list = words_input.split()  # Dividir la cadena en palabras individuales
    
    offensive_words = load_offensive_words()
    original_words = load_original_words()
    
    added_words = []  # Para almacenar las palabras agregadas
    existing_words = []  # Para almacenar las palabras que ya existían
    
    for word in words_list:
        # Hashear la palabra
        word_hash = hash_word(word)
        
        # Verificar si la palabra ya existe (comparando hashes)
        if word_hash not in offensive_words:
            offensive_words.append(word_hash)
            original_words.append(word)
            added_words.append(word)
        else:
            existing_words.append(word)
    
    # Guardar las listas actualizadas
    save_offensive_words(offensive_words)
    save_original_words(original_words)
    
    # Respuesta con las palabras agregadas y las que ya existían
    return jsonify({
        'success': True,
        'added_words': added_words,
        'existing_words': existing_words,
        'message': 'Procesamiento de palabras completado.'
    })

@list_words_bp.route('/list-words', methods=['GET'])
def list_words():
    original_words = load_original_words()
    return jsonify(original_words)

@delete_word_bp.route('/delete-word', methods=['POST'])
def delete_word():
    data = request.json
    word_to_delete = data['word'].lower()
    
    offensive_words = load_offensive_words()
    original_words = load_original_words()
    
    word_hash = hash_word(word_to_delete)
    
    if word_hash in offensive_words:
        offensive_words.remove(word_hash)
        original_words.remove(word_to_delete)
        save_offensive_words(offensive_words)
        save_original_words(original_words)
        return jsonify({'success': True, 'message': 'Palabra eliminada correctamente.'})
    return jsonify({'success': False, 'message': 'La palabra no existe.'})
