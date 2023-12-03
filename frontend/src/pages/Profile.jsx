import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
export function UserProfile() {
	const [user, setUser] = useState({
		nombre: "",
		correo: "",
		avatar: "",
		updatedAt: "",
		recommendedPlaces: [],
	});
	const userId = useParams().id;
	const [updating, setUpdating] = useState(false);
	const [submitting, setSubmitting] = useState(false);
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
				updatedAt: "",
				recommendedPlaces: ["Paris", "Tokyo", "New York"],
			};

			// Simulación de retardo en la llamada a la API
			axios
				.get("https://655fa07b879575426b45990a.mockapi.io/api/users/" + userId)

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
		setUpdating(true);
	};

	const onSubmit = (e) => {
		setSubmitting(true);

		e.preventDefault();
		axios
			.put("https://655fa07b879575426b45990a.mockapi.io/api/users/" + userId, {
				...user,
			})
			.then(({ data }) => {
				setSubmitting(false);
				setUpdating(false);
			});
	};

	return (
		<div className="bg-gray-200 p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
			<div className="text-center">
				<img
					src={user.avatar}
					alt="Profile Pic"
					className="w-[200px] h-[200px] rounded-full mx-auto mb-4"
				/>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="nombre"
					>
						Nombre:{" "}
					</label>
					<input
						type="text"
						name="nombre"
						value={user.nombre}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 ">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="correo"
					>
						Email:{" "}
					</label>
					<input
						type="text"
						name="correo"
						value={user.correo}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 ">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="direccion"
					>
						Dirección:{" "}
					</label>
					<input
						type="text"
						name="direccion"
						value={user.direccion}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4  ">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="ciudad"
					>
						Ciudad:{" "}
					</label>
					<input
						type="text"
						name="ciudad"
						value={user.ciudad}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				{updating && (
					<div className="text-center mt-4">
						{submitting ? (
							"Guardando..."
						) : (
							<button
								onClick={onSubmit}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								Actualizar
							</button>
						)}
					</div>
				)}
				Ultima Actualización:{" "}
				<span className="text-green-500">
					{new Date(user.updatedAt).toLocaleString().substring(0, 17)}{" "}
				</span>
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
