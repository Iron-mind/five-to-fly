import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';

export const Navbar = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	console.log(state);

	const onLogout = () => {
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

				{state?.logged ? (
					<div className="user">
						<span className="username">{state?.name}</span>
						<button className="btn-logout" onClick={onLogout}>
							Cerrar sesión
						</button>
					</div>
				) : (
					<nav className='flex justify-around w-[100%] mb-4 mt-2 sm:my-0 sm:w-auto'>
						<Link to="/login" className='p-3 text-xl bg-[#585ca4] hover:bg-[#70348c] rounded-lg text-white flex items-center sm:bg-white sm:text-gray-800 sm:hover:text-white sm:hover:rounded-lg mr-4'><button >Iniciar sesión</button></Link>
						<Link to="/register" className='p-3 bg-[#585ca4] hover:bg-[#70348c] rounded-lg text-white text-xl flex items-center sm:mr-8'><button>Registrarse</button></Link>
					</nav>
				)}
			</header>

			<Outlet />
		</>
	);
};
