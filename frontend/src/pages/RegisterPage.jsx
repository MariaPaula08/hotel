import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const { signup, isAuthenticate, errors: registerErros } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticate) navigate('/')
    }, [isAuthenticate])

    const onSubmit = handleSubmit(async (values) => {
        const formData = new FormData();
        formData.append('cc', values.cc);
        formData.append('tipo', values.tipo);
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('rol', values.rol);
    
        // Verificar si hay un archivo seleccionado y agregarlo al objeto FormData
        if (values.avatar && values.avatar.length > 0) {
            formData.append('avatar', values.avatar[0]);
        }
    
        // Llamar a la función de registro con el objeto FormData
        signup(formData);
    });

    return <section style={{ display: 'flex', width: '100vw', height: '100vh' ,justifyContent: 'center', alignItems: 'center'  }}>
        <div className="bg-gray-100 max-w-md p-10 rounded-md" style={{ height: 'fit-content' }}>

            {
                registerErros.map((error, i) => <div key={i} className="bg-red-500 p-2 text-black my-2">{error}</div>)
            }

            <form
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    {...register('cc', { required: true })}
                    className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Documento"
                />

                { errors.cc && (<p className="text-red-500">Documento de usuario es necesario</p>) }

                <select {...register('tipo', { required: true })} className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2">
                        <option value="">Seleccione un tipo</option>
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                </select>

                { errors.tipo && (<p className="text-red-500">Seleccione Tipo de Documento</p>) }

                <input
                    type="text"
                    {...register('username', { required: true })}
                    className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Nombre"
                />

                { errors.username && (<p className="text-red-500">Nombre de usuario es necesario</p>) }


                <input
                    type="email"
                    {...register('email', { required: true })}
                    className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Email"
                />

                { errors.email && (<p className="text-red-500">Email es necesario</p>) }

                <input
                    type="password"
                    {...register('password', { required: true })}
                    className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña"
                />

                { errors.password && (<p className="text-red-500">Contraseña de usuario es necesario</p>) }


                <label htmlFor="role" className="text-black">
                    Role:
                </label>
                <select
                    {...register('rol', { required: true })}
                    className="w-full bg-zinc-300 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Image User"
                >
                    <option value="administrador">Administrador</option>
                    <option value="recepcionista">Recepcionista</option>
                </select>

                <input type="file" {...register('avatar')} accept="image/*" className="my-2" />

                <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white  py-2 px-4 rounded-full m-auto">
                    Registrate
                </button>

                <p className='flex gap-x-2 justify-between text-black'>
                    ¿Ya tienes cuenta? <Link to='/' className='text-blue-500'>Iniciar Sesión</Link>
                </p>

            </form>
        </div>
    </section>
}

export default RegisterPage;
