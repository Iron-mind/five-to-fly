import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";


export const RegisterPage = () => {
	const { register, handleSubmit } = useForm()

	

	//funcion que se activa cuando se manda el formulario
    const onSubmit = async (data) => {
        console.log(data)
		try {
			// Realiza la solicitud POST utilizando Axios
			const response = await axios.post('URL_DEL_BACKEND', data);
			console.log('Respuesta del servidor:', response.data);
			// Puedes realizar acciones adicionales según la respuesta del servidor
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
			// Manejar errores, si es necesario
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
				<button className='py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center '>Registrarse</button>
			</form>
		</div>
	);
};
