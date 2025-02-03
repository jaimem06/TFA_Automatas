from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import hashlib

app = Flask(__name__)
CORS(app)

OFFENSIVE_WORDS_FILE = 'offensive_words.json'

# Función para hashear una palabra usando SHA-256
def hash_word(word):
    return hashlib.sha256(word.encode()).hexdigest()

# Cargar palabras ofensivas desde el archivo JSON
def load_offensive_words():
    if os.path.exists(OFFENSIVE_WORDS_FILE):
        with open(OFFENSIVE_WORDS_FILE, 'r') as file:
            return json.load(file)
    return []

def save_offensive_words(words):
    with open(OFFENSIVE_WORDS_FILE, 'w') as file:
        json.dump(words, file)

# Ruta para analizar comentarios
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    comment = data['comment']
    offensive_words = load_offensive_words()
    
    # Hashear el comentario para compararlo con las palabras ofensivas hasheadas
    comment_words = comment.lower().split()
    comment_hashes = [hash_word(word) for word in comment_words]
    
    # Verificar si alguna palabra del comentario coincide con las palabras ofensivas
    is_offensive = any(hash_word in offensive_words for hash_word in comment_hashes)
    return jsonify({'isOffensive': is_offensive})

# Ruta para agregar nuevas palabras ofensivas
@app.route('/add-word', methods=['POST'])
def add_word():
    data = request.json
    new_word = data['word'].lower()
    offensive_words = load_offensive_words()
    
    # Hashear la nueva palabra
    new_word_hash = hash_word(new_word)
    
    # Verificar si la palabra ya existe (comparando hashes)
    if new_word_hash not in offensive_words:
        offensive_words.append(new_word_hash)
        save_offensive_words(offensive_words)
        return jsonify({'success': True, 'message': 'Palabra agregada correctamente.'})
    return jsonify({'success': False, 'message': 'La palabra ya existe.'})

# Ruta para listar palabras ofensivas
@app.route('/list-words', methods=['GET'])
def list_words():
    offensive_words = load_offensive_words()
    return jsonify(offensive_words)

if __name__ == '__main__':
    app.run(debug=True)