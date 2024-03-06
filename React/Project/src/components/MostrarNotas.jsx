import { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const MostrarNotas = () => {
  const [notas, setNotas] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch('http://localhost:3001/notas'); // Reemplaza la URL con la correcta
        if (!response.ok) {
          throw new Error('Error al cargar las notas');
        }
        const data = await response.json();
        setNotas(data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotas();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`text-center mt-2 ${darkMode ? 'bg-dark text-white' : ''}`}>
      <Row xs={1} sm={2} md={3} xl={4} className="g-4 justify-content-center mt-3">
        <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleDarkMode} className="mt-3">
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </Button>
        <h1 className='d-inline'>Lista de Notas</h1>
        <Button as={Link} to="/crear-nota" className='btn-dark fs-4'>+</Button>
      </Row>
      <Row xs={1} sm={2} md={3} xl={4} className="g-4 justify-content-center mt-3">
        {notas.map(nota => (
          <Col key={nota.id} className="m-2">
            <Card style={{ width: '18rem' }} className={darkMode ? 'bg-white text-dark' : 'bg-dark text-white'}>
              <Card.Body>
                <Card.Title>{nota.titulo}</Card.Title>
                <Card.Text>{nota.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MostrarNotas;