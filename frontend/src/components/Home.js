import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una petición POST al backend
      const response = await axios.post('http://localhost:5000/api/analyze', { link });

      // Guarda los resultados en el almacenamiento local
      localStorage.setItem('results', JSON.stringify(response.data));

      // Redirige a la página de resultados
      navigate('/results');
    } catch (error) {
      console.error('Error al analizar el enlace:', error);
      alert('Hubo un problema al analizar el enlace.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Analizador de Comentarios Ofensivos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Introduce el enlace de la publicación"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: '300px', padding: '10px', margin: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Analizar
        </button>
      </form>
    </div>
  );
}

export default Home;
