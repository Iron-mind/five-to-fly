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
			<header>
				<div>
					<img
						width={50}
						height={50}
						src="./imgs/five-to-fly.jpg"
						alt="five to fly logo"
					/>
				</div>
				<h1>
					<Link to="">Five to Fly</Link>
				</h1>

				{state?.logged ? (
					<div className="user">
						<span className="username">{state?.name}</span>
						<button className="btn-logout" onClick={onLogout}>
							Cerrar sesión
						</button>
					</div>
				) : (
					<nav>
						<Link to="/login">Iniciar sesión</Link>
						<Link to="/register">Registrarse</Link>
					</nav>
				)}
			</header>

			<Outlet />
		</>
	);
};
