import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CrearNota = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaNota = {
      titulo,
      descripcion,
      fecha_creacion: obtenerFechaActual(), // Obtener la fecha actual en formato DD/MM/YYYY
      userid: 1 // Asigna un ID de usuario válido
    };

    try {
      const response = await fetch('http://localhost:3001/notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaNota)
      });

      if (response.ok) {
        // Redirige a la página de mostrar notas después de crear la nota
        window.location.href = '/mostrar-notas';
      } else {
        console.error('Error al guardar la nota:', response.status);
      }
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };

  return (
    <div>
      <h2>Crear Nota</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titulo">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default CrearNota;