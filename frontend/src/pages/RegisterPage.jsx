import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/ContextUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RegisterPage = () => {
	const { login } = useContext(AuthContext)
	const { register, handleSubmit, formState: { errors } } = useForm()
	const navigate = useNavigate();

	useEffect(() => {
		let bool = false;

		if (errors.username) {
			bool = true
		} else if (errors.correo) {
			bool = true
		} else if (errors.password) {
			bool = true
		}

		if (bool) {
			toast('Faltan campos por llenar.')
		}
	}, [errors.username, errors.password, errors.correo])


	//función que se activa cuando se manda el formulario
	const onSubmit = async (data) => {
		console.log(data)
		try {
			toast.success("Te has registrado con éxito.")
			// Realiza la solicitud POST utilizando Axios
			//const response = await axios.post('URL_DEL_BACKEND', data);
			//console.log('Respuesta del servidor:', response.data);
			//login(response.data)
			// navigate('/form', {
			// 	replace: true,
			// });
			// Puedes realizar acciones adicionales según la respuesta del servidor
		} catch (error) {
			toast.error('Error al enviar el formulario');
			console.error('Error al enviar el formulario:', error);
			// Muestra una notificación de error
		}
	}

	return (
		<div className='flex flex-wrap mt-8 mx-auto bg-white justify-center rounded-xl sm:w-1/3'>
			<form onSubmit={handleSubmit(onSubmit)} className='p-8 flex justify-center flex-col xl:w-[100%]'>
				<h1 className='flex justify-center text-3xl font-bold border-b-2'>Registrarse</h1>
				<div className='w-[100%] pt-8 flex flex-col items-center '>
					<label htmlFor='username' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Nombre </label>
					<input
						type='text'
						name='username'
						id='username'
						{...register(`username`, { required: true })}
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
					<label htmlFor='correo' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Email </label>
					<input
						type='email'
						name='correo'
						id='correo'
						{...register(`correo`, { required: true })}
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
					<label htmlFor='password' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Contraseña </label>
					<input
						type='password'
						name='password'
						id='password'
						{...register(`password`, { required: true })}
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
				</div>
				<button className='py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center'>Registrarse</button>
			</form>
		</div>
	);
};
