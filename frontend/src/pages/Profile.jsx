import { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
export function UserProfile({ id }) {
	const [user, setUser] = useState({
		nombre: "",
		correo: "",
		avatar: "",
		recommendedPlaces: [],
	});

	useEffect(() => {
		// Simulando una llamada a una API para obtener la información del usuario
		// Aquí puedes realizar una llamada a tu backend o cargar la información de otra manera.
		const fetchUserData = async () => {
			// Simulación de datos
			const userData = {
				nombre: "John Doe",
				correo: "john@example.com",
				avatar: "url_de_la_imagen.jpg",
				direccion: "",
				ciudad: "",
				recommendedPlaces: ["Paris", "Tokyo", "New York"],
			};

			// Simulación de retardo en la llamada a la API
			axios
				.get("https://655fa07b879575426b45990a.mockapi.io/api/users/2")

				.then((res) => {
					setUser({ ...userData, ...res.data });
				});

			// Actualizar el estado con la información obtenida
		};

		fetchUserData();
	}, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	return (
		<div className="bg-gray-200 p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
			<div className="text-center">
				<img
					src={user.avatar}
					alt="Profile Pic"
					className="w-[200px] h-[200px] rounded-full mx-auto mb-4"
				/>
				<div className=" ">
					<label className="font-bold" htmlFor="name">
						Nombre:{" "}
					</label>
					<input
						type="text"
						name="name"
						value={user.nombre}
						onChange={handleInputChange}
						className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
					/>
				</div>

				<div className="">
					<label htmlFor="email">Email: </label>
					<input
						type="text"
						name="email"
						value={user.correo}
						onChange={handleInputChange}
						className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className=" ">
					<label className="font-bold" htmlFor="name">
						Dirección:{" "}
					</label>
					<input
						type="text"
						name="direccion"
						value={user.direccion}
						onChange={handleInputChange}
						className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className=" ">
					<label className="font-bold" htmlFor="name">
						Ciudad:{" "}
					</label>
					<input
						type="text"
						name="ciudad"
						value={user.ciudad}
						onChange={handleInputChange}
						className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
					/>
				</div>
			</div>

			<div className="mt-8">
				<h3 className="text-lg font-semibold mb-4">
					Historial de Lugares Recomendados
				</h3>
				<ul>
					{user.recommendedPlaces.map((place, index) => (
						<li key={index} className="mb-2">
							{place}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
