import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { AuthContext } from '../Context/ContextUser';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';


export const LoginPage = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm()
	const { login } = useContext(AuthContext)

	useEffect(() => {
		let bool = false;

		if (errors.correo) {
			bool = true
		} else if (errors.password) {
			bool = true
		}

		if (bool) {
			toast('Faltan campos por llenar.')
		}

	}, [errors.password, errors.email])

	//función que se activa cuando se manda el formulario
	const onSubmit = async (data) => {
		console.log(data)
		try {
			// Realiza la solicitud POST utilizando Axios
			const res = await axios.post(
				"https://five-to-fly.onrender.com/api/userProfile/",
				data
			);
			console.log('Respuesta del servidor:', res.data);
			const userData = {
				id: res.data.id,
				username: res.data.username,
				correo: res.data.correo,
				ciudad: res.data.ciudad,
				direccion: res.data.direccion,
				img: res.data.img,
				updateAt: res.data.updateAt,
				lastForm: res.data.lastForm,
				rate: res.data.rate,
			};
			login(userData)
			toast.success('Has iniciado sesión con éxito.')
			navigate('/form', {
				replace: true,
			});

			// Puedes realizar acciones adicionales según la respuesta del servidor
		} catch (error) {
			if (error.response) {
				// El servidor devolvió un código de estado diferente de 2xx
				if (error.response.status === 401) {
					toast.error('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
				} else if (error.response.status === 403) {
					toast.error('Acceso no autorizado. Verifica tus permisos.');
				} else {
					toast.error(`Email incorrecto o no existe.`);
				}
			} else if (error.request) {
				// La solicitud fue realizada pero no se recibió respuesta
				toast.error('No se recibió respuesta del servidor. Inténtalo de nuevo más tarde.');
			} else {
				// Otro tipo de error
				toast.error(`Error: ${error}`);
				console.log(error)
			}
		}
	}

	return (
		<div className='flex flex-wrap mt-8 mx-auto bg-gray-200 justify-center rounded-xl sm:w-1/3'>
			<form onSubmit={handleSubmit(onSubmit)} className='p-8 flex justify-center flex-col xl:w-[100%]'>
				<h1 className='flex justify-center text-3xl font-bold border-b-2'>Iniciar Sesión</h1>
				<div className='w-[100%] pt-8 flex flex-col items-center '>
					<label htmlFor='correo' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Email</label>
					<input
						type='email'
						name='correo'
						id='correo'
						{...register(`correo`, { required: true })}
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
					<label htmlFor='password' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Contraseña</label>
					<input
						type='password'
						name='password'
						id='password'
						{...register(`password`, { required: true })}
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
				</div>
				<button className='py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center '>Iniciar Sesión</button>
			</form>
		</div>
	);
};
