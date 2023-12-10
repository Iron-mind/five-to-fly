import { useContext } from 'react';
import {
	Link,
	Outlet,
	useNavigate,
} from 'react-router-dom';
import { AuthContext } from './Context/ContextUser';

export const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogout = () => {
		logout()
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<>
			<header className='bg-white text-gray-800 rounded-b-lg flex flex-col items-center sm:flex sm:flex-row sm:justify-around sm:py-4'>
				<div className='flex flex-col items-center sm:flex-row sm:w-auto sm:pl-4'>
					<img
						width={50}
						height={50}
						src="imgs/Icon-five-to-fly.jpeg"
						alt="five to fly logo"
						className='rounded-full p-2 w-[100px] sm:w-[10%] sm:p-0'
					/>
					<h1 className='flex justify-center uppercase text-3xl font-bold py-2 sm:py-0 sm:px-5'>
						<Link to="">Five to Fly</Link>
					</h1>
				</div>

				{user ? (
					<nav className='flex justify-around w-[100%] mb-4 mt-2 sm:my-0 sm:w-auto'>
						<button className='p-3 text-xl bg-[#585ca4] hover:bg-[#70348c] rounded-lg text-white flex items-center mb-2 sm:bg-white sm:text-gray-800 sm:hover:text-white sm:hover:rounded-lg mr-4 sm:hover:shadow-xl sm:mb-0' onClick={onLogout}>
							Cerrar sesión
						</button>
						<Link to={`profile/${user.id}`} className='p-3 bg-[#585ca4] hover:bg-[#70348c] rounded-lg text-white text-xl flex items-center sm:mr-8 shadow-xl'>
							<button>{user.name}</button>
						</Link>
					</nav>
				) : (
					<nav className='flex justify-around w-[100%] mb-4 mt-2 sm:my-0 sm:w-auto'>
						<Link to="/register" className='p-3 text-xl bg-[#585ca4] hover:bg-[#70348c] rounded-lg text-white flex items-center sm:bg-white sm:text-gray-800 sm:hover:text-white sm:hover:rounded-lg mr-4 sm:hover:shadow-xl'><button >Registrarse</button></Link>
						<Link to="/login" className='p-3 bg-[#585ca4] hover:bg-[#70348c] rounded-lg text-white text-xl flex items-center sm:mr-8 shadow-xl'><button>Iniciar sesión</button></Link>
					</nav>
				)}
			</header>

			<Outlet />
		</>
	);
};
