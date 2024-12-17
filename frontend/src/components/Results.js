import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los resultados del almacenamiento local
    const data = localStorage.getItem('results');
    if (data) {
      setResults(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Resultados del Análisis</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.length > 0 ? (
          results.map((comment, index) => (
            <li
              key={index}
              style={{
                margin: '10px',
                padding: '10px',
                backgroundColor: comment.offensive ? '#ffcccc' : '#ccffcc',
              }}
            >
              {comment.text} {comment.offensive ? '🚨 Ofensivo' : '✅ Aceptable'}
            </li>
          ))
        ) : (
          <p>No hay resultados disponibles.</p>
        )}
      </ul>
      <button onClick={() => navigate('/')} style={{ padding: '10px 20px' }}>
        Analizar otro enlace
      </button>
    </div>
  );
}

export default Results;
