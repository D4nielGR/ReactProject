import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CrearNota from './components/CrearNota';
import MostrarNotas from './components/MostrarNotas';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import AboutMe from './components/AboutMe';
import NotFound from './components/NotFound';
import Registro from './components/Registro';
import Login from './components/Login';


const App = () => {

  // Sesión usuario
  const sessionActual = JSON.parse(sessionStorage.getItem('UsuarioActual'));
  const logueado = !!sessionStorage.getItem('UsuarioActual');

  // Cerrar sesión
  const handleLogout = () => {
      // Elimina sesión
      sessionStorage.removeItem("UsuarioActual"); 
      // Redirección al usuario a la página de inicio
      window.location.href = "/"; 
  };

  return (
    <Router>
     <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/about-me">About me</Nav.Link>
            {!logueado && <Nav.Link as={Link} to="/registro">Registro</Nav.Link>}
            {!logueado && <Nav.Link as={Link} to="/login">Login</Nav.Link>} 
            {logueado && <Nav.Link as={Link} to="/mostrar-notas">Notas</Nav.Link>}
            {logueado && <Nav.Link className='opcion' onClick={handleLogout}>Cerrar sesión</Nav.Link>}
          </Nav>
          {sessionActual && <Navbar.Text className='ms-auto'>Logueado como: {sessionActual.usuario.nombre}</Navbar.Text>}
          
        </Navbar.Collapse>
      </Container>
     </Navbar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crear-nota" element={<CrearNota />} />
      <Route path="/mostrar-notas" element={<MostrarNotas />} />
      <Route path="/about-me" element={<AboutMe />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  </Router>
  );
};

export default App;