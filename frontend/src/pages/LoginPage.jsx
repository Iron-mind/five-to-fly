import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm';

export const LoginPage = () => {
	const navigate = useNavigate();

	const { email, password, onInputChange, onResetForm } =
		useForm({
			email: '',
			password: '',
		});

	const onLogin = e => {

		localStorage.setItem("user", JSON.stringify({ id: 1 }));
		e.preventDefault();

		navigate('/dashboard', {
			replace: true,
			state: {
				logged: true,
			},
		});

		onResetForm();
	};

	return (
		<div className='flex flex-wrap mt-8 mx-auto bg-white justify-center rounded-xl sm:w-1/3'>
			<form onSubmit={onLogin} className='p-8 flex justify-center flex-col xl:w-[100%]'>
				<h1 className='flex justify-center text-3xl font-bold border-b-2'>Iniciar Sesión</h1>
				<div className='w-[100%] pt-8 flex flex-col items-center '>
					<label htmlFor='email' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onInputChange}
						required
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
					<label htmlFor='password' className='flex justify-start font-medium text-xl xl:text-2xl xl:font-normal'>Contraseña</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onInputChange}
						required
						autoComplete='off'
						className='border-2 p-2 rounded-lg mb-4 w-[100%]'
					/>
				</div>
				<button className='py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center '>Iniciar Sesión</button>
			</form>
		</div>
	);
};
