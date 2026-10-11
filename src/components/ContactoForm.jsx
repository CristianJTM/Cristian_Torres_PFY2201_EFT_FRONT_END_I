import { useState } from 'react';

/**
 * Formulario de contacto con campos de nombre, email y mensaje.
 * Usa inputs controlados (useState) y valida todos los campos
 * antes de permitir el envío, mostrando mensajes de error o éxito
 * mediante renderizado condicional.
 *
 * Se monta como raíz independiente de React en index.html
 * (ver main.jsx → id="raiz-contacto").
 */
function ContactoForm() {
    // Estado para cada campo del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Estado para el mensaje de resultado (éxito o error)
    const [resultado, setResultado] = useState(null); // { texto, tipo: 'exito' | 'error' }

    // Estado para los errores individuales de cada campo
    const [errores, setErrores] = useState({});

    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Valida todos los campos y devuelve un objeto con los errores
     * encontrados. Si el objeto está vacío, no hay errores.
     */
    function validar() {
        const nuevosErrores = {};

        if (nombre.trim() === '') {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        }

        if (email.trim() === '') {
            nuevosErrores.email = 'El email es obligatorio.';
        } else if (!expresionEmail.test(email)) {
            nuevosErrores.email = 'Ingresa un email válido.';
        }

        if (mensaje.trim() === '') {
            nuevosErrores.mensaje = 'El mensaje es obligatorio.';
        } else if (mensaje.trim().length < 10) {
            nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
        }

        return nuevosErrores;
    }

    /** Maneja el envío del formulario: valida y muestra el resultado. */
    function manejarEnvio(evento) {
        evento.preventDefault();

        const erroresEncontrados = validar();
        setErrores(erroresEncontrados);

        // Si hay errores, los mostramos y no continuamos
        if (Object.keys(erroresEncontrados).length > 0) {
            setResultado(null);
            return;
        }

        // Sin errores: simulamos el envío y limpiamos el formulario
        setResultado({
            texto: '¡Gracias ' + nombre + '! Tu mensaje fue enviado correctamente. Te responderemos a ' + email + ' a la brevedad.',
            tipo: 'exito'
        });

        setNombre('');
        setEmail('');
        setMensaje('');
        setErrores({});
    }

    return (
        <form onSubmit={manejarEnvio} className="mt-4" noValidate>
            <h3 className="fs-5">Formulario de contacto</h3>

            {/* Campo: Nombre */}
            <div className="mb-3">
                <label htmlFor="nombreContacto" className="form-label">Nombre</label>
                <input
                    type="text"
                    className={'form-control' + (errores.nombre ? ' is-invalid' : '')}
                    id="nombreContacto"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                />
                {/* Renderizado condicional: error individual por campo */}
                {errores.nombre && (
                    <div className="invalid-feedback">{errores.nombre}</div>
                )}
            </div>

            {/* Campo: Email */}
            <div className="mb-3">
                <label htmlFor="emailContacto" className="form-label">Email</label>
                <input
                    type="email"
                    className={'form-control' + (errores.email ? ' is-invalid' : '')}
                    id="emailContacto"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                />
                {errores.email && (
                    <div className="invalid-feedback">{errores.email}</div>
                )}
            </div>

            {/* Campo: Mensaje */}
            <div className="mb-3">
                <label htmlFor="mensajeContacto" className="form-label">Mensaje</label>
                <textarea
                    className={'form-control' + (errores.mensaje ? ' is-invalid' : '')}
                    id="mensajeContacto"
                    rows="4"
                    placeholder="Escribe tu mensaje aquí..."
                    value={mensaje}
                    onChange={(evento) => setMensaje(evento.target.value)}
                />
                {errores.mensaje && (
                    <div className="invalid-feedback">{errores.mensaje}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary">Enviar mensaje</button>

            {/* Renderizado condicional: mensaje global de éxito */}
            {resultado && (
                <p className={(resultado.tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error') + ' mt-3 mb-0'}>
                    {resultado.texto}
                </p>
            )}
        </form>
    );
}

export default ContactoForm;