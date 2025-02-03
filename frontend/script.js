const BASE_URL = 'http://localhost:5000';
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let words = [];

async function analyzeComment() {
  const comment = document.getElementById('comment').value;
  const response = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
  });
  const result = await response.json();
  displayAnalysisResult(comment, result.offensiveWords);
}

function displayAnalysisResult(comment, offensiveWords) {
  const originalText = document.getElementById('originalText');
  const analyzedText = document.getElementById('analyzedText');
  const offensivePercentage = document.getElementById('offensivePercentage');

  originalText.textContent = comment;

  const words = comment.split(' ');
  const highlightedText = words.map(word => {
    return offensiveWords.includes(word.toLowerCase()) ? `<span class="offensive-word">${word}</span>` : word;
  }).join(' ');

  analyzedText.innerHTML = highlightedText;

  const percentage = (offensiveWords.length / words.length) * 100;
  offensivePercentage.textContent = `Porcentaje de ofensividad: ${percentage.toFixed(2)}%`;
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

async function deleteWord(wordToDelete) {
  const response = await fetch(`${BASE_URL}/delete-word`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: wordToDelete })
  });
  const result = await response.json();
  document.getElementById('deleteResult').textContent = result.message;
  listWords(); // Refresh the list of words after deleting one
}

async function listWords() {
  const response = await fetch(`${BASE_URL}/list-words`);
  words = await response.json();
  displayWords();
  displayWordsForDeletion();
}

function displayWords() {
  const wordList = document.getElementById('wordList');
  wordList.innerHTML = '';
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedWords = words.slice(start, end);

  paginatedWords.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    wordList.appendChild(li);
  });

  document.getElementById('currentPage').textContent = currentPage;
  document.getElementById('totalPages').textContent = Math.ceil(words.length / ITEMS_PER_PAGE);
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === Math.ceil(words.length / ITEMS_PER_PAGE);
}

function displayWordsForDeletion() {
  const wordList = document.getElementById('deleteWordList');
  wordList.innerHTML = '';
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedWords = words.slice(start, end);

  paginatedWords.forEach(word => {
    const tr = document.createElement('tr');
    const tdWord = document.createElement('td');
    tdWord.textContent = word;
    const tdButton = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.onclick = () => deleteWord(word);
    tdButton.appendChild(button);
    tr.appendChild(tdWord);
    tr.appendChild(tdButton);
    wordList.appendChild(tr);
  });

  document.getElementById('currentPage').textContent = currentPage;
  document.getElementById('totalPages').textContent = Math.ceil(words.length / ITEMS_PER_PAGE);
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === Math.ceil(words.length / ITEMS_PER_PAGE);
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayWords();
    displayWordsForDeletion();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  if (currentPage < Math.ceil(words.length / ITEMS_PER_PAGE)) {
    currentPage++;
    displayWords();
    displayWordsForDeletion();
  }
});

// Call listWords on page load to display the initial list of words
document.addEventListener('DOMContentLoaded', listWords);