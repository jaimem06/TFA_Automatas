import json
import os
import hashlib

OFFENSIVE_WORDS_FILE = 'offensive_words.json'
ORIGINAL_WORDS_FILE = 'original_words.json'

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

# Cargar palabras originales desde el archivo JSON
def load_original_words():
    if os.path.exists(ORIGINAL_WORDS_FILE):
        with open(ORIGINAL_WORDS_FILE, 'r') as file:
            return json.load(file)
    return []

def save_original_words(words):
    with open(ORIGINAL_WORDS_FILE, 'w') as file:
        json.dump(words, file)
