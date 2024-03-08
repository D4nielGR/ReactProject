import { useState } from 'react';

const Registro = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();
        try {
            // Verificar si el usuario ya existe antes de enviar la solicitud de registro
            const existingUserResponse = await fetch(`http://localhost:3002/users?nombre=${username}`);
            const existingUserData = await existingUserResponse.json();
            if (existingUserData.length > 0) {
                throw new Error('El usuario ya existe');
            }

            const response = await fetch('http://localhost:3002/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: username, contrasena: password })
            });
            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }
            alert('Usuario registrado exitosamente');
            // Limpiar los campos de entrada después del registro exitoso
            setUsername('');
            setPassword('');
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
            setError('El usuario ya existe');
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center mt-4'>
                <div className='col-md-6'>
                    <h2 className='mb-4'>Registro</h2>
                    <form onSubmit={handleRegistro} className='form-custom'>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Nombre de Usuario:</label>
                        <input id='username' className='form-control' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Contraseña:</label>
                        <input id='password' className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className='text-danger'>{error}</p>}
                    <button type='submit' className='btn btn-primary'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registro;