const BASE_URL = 'http://localhost:5000';

async function analyzeComment() {
  const comment = document.getElementById('comment').value;
  const response = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
  });
  const result = await response.json();
  document.getElementById('result').textContent = result.isOffensive ? "Comentario ofensivo" : "Comentario no ofensivo";
}

async function addWord() {
  const newWord = document.getElementById('newWord').value;
  const response = await fetch(`${BASE_URL}/add-word`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: newWord })
  });
  const result = await response.json();
  document.getElementById('wordResult').textContent = result.message;
  listWords(); // Refresh the list of words after adding a new one
}

async function listWords() {
  const response = await fetch(`${BASE_URL}/list-words`);
  const words = await response.json();
  const wordList = document.getElementById('wordList');
  wordList.innerHTML = '';
  words.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    wordList.appendChild(li);
  });
}

// Call listWords on page load to display the initial list of words
document.addEventListener('DOMContentLoaded', listWords);