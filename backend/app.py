from flask import Flask
from flask_cors import CORS
from routes import analyze_bp, add_word_bp, list_words_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(analyze_bp)
app.register_blueprint(add_word_bp)
app.register_blueprint(list_words_bp)

if __name__ == '__main__':
    app.run(debug=True)