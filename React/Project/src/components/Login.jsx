import { useState } from 'react';

// Componente para el inicio de sesión
const Login = () => {
    const [error, setError] = useState('');
    // Estado para almacenar las credenciales del usuario (nombre de usuario y contraseña)
    const [credenciales, setCredenciales] = useState({
        nombreUsuario: '',
        contrasena: ''
    });

    // Manejador de evento para actualizar las credenciales cuando cambian los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredenciales(prevCredenciales => ({
            ...prevCredenciales,
            [name]: value
        }));
    };

    // Manejador de evento para enviar el formulario de inicio de sesión
    const handleSubmit = (event) => {
        // Evita que se recargue la página al enviar el formulario
        event.preventDefault();

        // Petición para obtener los usuarios desde la API de mi jsonServer
        fetch('http://localhost:3002/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                return response.json();
            })
            .then(usuarios => {
                // Busca el usuario con las credenciales proporcionadas
                const usuarioEncontrado = usuarios.find(
                    usuario => usuario.nombre === credenciales.nombreUsuario && usuario.contrasena === credenciales.contrasena
                );

                // Si no se encuentra el usuario, muestra un mensaje de error
                if (!usuarioEncontrado) {
                    console.error(error);
                    setError('Error al loguear el usuario');
                    return;
                }

                // Si se encuentra el usuario, guarda la sesión
                sessionStorage.setItem('UsuarioActual', JSON.stringify({ usuario: usuarioEncontrado }));

                // Muestra un mensaje de éxito al usuario
                alert('¡Inicio de sesión exitoso!');

                // Redirige al usuario a la página de inicio
                window.location.href = '/';
            });
    };

    return (
        <div className='container'>
            <div className='row justify-content-center mt-3'>
              <div className='col-md-6'>
                <form onSubmit={handleSubmit} className='form-custom'>
                  <h2 className='mb-4'>Iniciar Sesión</h2>
                  <div className='mb-3'>
                    <label htmlFor='nombreUsuario' className='form-label'>Nombre de usuario:</label>
                    <input id='nombreUsuario' className='form-control' type='text' name='nombreUsuario' value={credenciales.nombreUsuario} onChange={handleChange} />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='contrasena' className='form-label'>Contraseña:</label>
                    <input id='contrasena' className='form-control' type='password' name='contrasena' value={credenciales.contrasena} onChange={handleChange} />
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <button type='submit' className='btn btn-primary'>Iniciar Sesión</button>
                </form>
              </div>
            </div>
        </div>
    );
};

export default Login;

// import { useState } from 'react';

// const Login = () => {
//     const [credenciales, setCredenciales] = useState({
//         nombreUsuario: '',
//         contrasena: ''
//     });
//     const [error, setError] = useState('');

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setCredenciales(prevCredenciales => ({
//             ...prevCredenciales,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
    
//         try {
//             const response = await fetch('http://localhost:3002/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(credenciales)
//             });
    
//             if (!response.ok) {
//                 throw new Error('Credenciales incorrectas');
//             }
    
//             // Guardar sesión en el almacenamiento local
//             sessionStorage.setItem('sesion', JSON.stringify({ usuario: credenciales.nombreUsuario }));
//             alert('¡Inicio de sesión exitoso!');
//             window.location.href = '/'; // Redirige al usuario a la página de inicio
    
//         } catch (error) {
//             console.error(error);
//             setError('Credenciales incorrectas. Por favor, verifica tus datos.');
//         }
//     };

//     return (
//         <div className='contenedor-formulario'>
//             <form onSubmit={handleSubmit} className='formulario-custom'>
//                 <h2>Iniciar Sesión</h2>
//                 <div>
//                     <label>Nombre de usuario:</label>
//                     <input className="m-3" type="text" name="nombreUsuario" value={credenciales.nombreUsuario} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <label>Contraseña:</label>
//                     <input className="m-3" type="password" name="contrasena" value={credenciales.contrasena} onChange={handleChange} />
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <button type="submit" className='btn-custom'>Iniciar Sesión</button>
//             </form>
//         </div>
//     );
// };

// export default Login;