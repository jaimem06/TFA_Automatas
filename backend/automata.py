def analyze_comment(comment):
    offensive_words = ["odio", "idiota", "estúpido"]  # Lista de palabras ofensivas
    for word in offensive_words:
        if word in comment.lower():
            return True
    return False