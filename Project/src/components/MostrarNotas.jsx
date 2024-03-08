import { useState, useEffect } from 'react';
import { Card, Col, Row, Button, FormControl, Modal, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../public/styles/style.css'

const MostrarNotas = () => {
  const [notas, setNotas] = useState([]);
  const [filteredNotas, setFilteredNotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('titulo'); // Estado para almacenar el criterio de ordenación actual
  const [selectedNota, setSelectedNota] = useState(null);
  const [editedTitulo, setEditedTitulo] = useState('');
  const [editedDescripcion, setEditedDescripcion] = useState('');

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch('http://localhost:3001/notas'); 
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

  useEffect(() => {
    const filtered = notas.filter(nota =>
      nota.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotas(filtered);
  }, [notas, searchTerm]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  

const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};

const handleSortByChange = (criteria) => {
    setSortBy(criteria);
};

const sortedNotas = [...filteredNotas].sort((a, b) => {
  if (sortBy === 'titulo') {
      return sortOrder === 'asc' ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo);
  } else if (sortBy === 'fecha') {
      return sortOrder === 'asc' ? new Date(a.fecha_creacion) - new Date(b.fecha_creacion) : new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
  }
});

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notas/${selectedNota.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: editedTitulo,
          descripcion: editedDescripcion
        })
      });

      if (response.ok) {
        const updatedNota = { ...selectedNota, titulo: editedTitulo, descripcion: editedDescripcion };
        setNotas(notas.map(nota => (nota.id === selectedNota.id ? updatedNota : nota)));
        handleCloseModal();
      } else {
        console.error('Error al guardar los cambios:', response.status);
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleDeleteNota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notas/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setNotas(notas.filter(nota => nota.id !== id));
      } else {
        console.error('Error al eliminar la nota:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const handleEditNota = (nota) => {
    setSelectedNota(nota);
    setEditedTitulo(nota.titulo);
    setEditedDescripcion(nota.descripcion);
  };

  const handleCloseModal = () => {
    setSelectedNota(null);
    setEditedTitulo('');
    setEditedDescripcion('');
  };

  return (
    <div className={`text-center mt-2 ${darkMode ? 'bg-dark text-white' : ''}`}>
      <Row xs={1} sm={1} md={4} xl={4} className="g-4 justify-content-center mt-3">
        <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleDarkMode} className="mt-3">
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </Button>
        <h1 className='d-inline'>Lista de Notas</h1>
        <Button as={Link} to="/crear-nota" className={darkMode ? 'bg-white text-dark pt' : 'bg-dark text-white'}>+</Button>
      </Row>
      <Row xs={1} sm={2} md={3} xl={4} className="g-4 justify-content-center mt-3">
        <Col xs={11} sm={11} md={11} xl={11} className="m-2">
          <FormControl
            type="text"
            placeholder="Buscar notas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button variant="secondary" className="ms-2" onClick={resetSearch}>
              Limpiar búsqueda
            </Button>
          )}
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} xl={4} className="g-4 justify-content-center mt-3">
        <Col className="text-center">
            <ButtonGroup>
                <Button variant={sortBy === 'titulo' ? 'primary' : 'secondary'} onClick={() => handleSortByChange('titulo')}>
                    Título
                </Button>
                <Button variant={sortBy === 'fecha' ? 'primary' : 'secondary'} onClick={() => handleSortByChange('fecha')}>
                    Fecha
                </Button>
            </ButtonGroup>
        </Col>
        <Col className="text-center">
            <Button variant="primary" onClick={toggleSortOrder}>
                Ordenar {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
            </Button>
        </Col>
    </Row>
      <Row xs={1} sm={2} md={3} xl={4} className="g-4 justify-content-center mt-3">
        {sortedNotas.map(nota => (
          <Col key={nota.id} xs={12} sm={6} md={4} lg={3} className="m-2">
            <Card className={`${darkMode ? 'nota-card-dark' : 'nota-card-light'}`}>
              <Card.Body>
                <Card.Title className="nota-title">{nota.titulo}</Card.Title>
                <Card.Text className="nota-description">{nota.descripcion}</Card.Text>
                <small className="nota-date">Fecha de creación: {nota.fecha_creacion}</small>
                <br />
                <Button variant="danger" className="mt-2 me-2" onClick={() => handleDeleteNota(nota.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button variant="primary" className="mt-2 ms-2" onClick={() => handleEditNota(nota)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={selectedNota !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNota && (
            <div>
              <FormControl
                type="text"
                placeholder="Título"
                value={editedTitulo}
                onChange={(e) => setEditedTitulo(e.target.value)}
              />
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Descripción"
                value={editedDescripcion}
                onChange={(e) => setEditedDescripcion(e.target.value)}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MostrarNotas;