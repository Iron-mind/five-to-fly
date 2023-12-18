import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/ContextUser";
import axios from "axios";
import { toast } from "react-toastify";

export function UserProfile() {
	const { user, login } = useContext(AuthContext)
	const [updating, setUpdating] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [newInformation, setNewInformation] = useState({
		...user,
		direccion: user?.direccion || '',
		ciudad: user?.ciudad || '',
	  });


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewInformation((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
		setUpdating(true);
	};

	useEffect( () => {console.log(newInformation)}, [])

	const onSubmit = async (e) => {
		setSubmitting(true);

		e.preventDefault();
		const res = await axios
			.put(
				"https://five-to-fly.onrender.com/api/userProfile/" + `${user.id}/`,
				{ ...newInformation }
			)
			.then(({ data }) => {
				setSubmitting(false);
				setUpdating(false);
				login(newInformation);
				toast.success("Se actualizaron los datos correctamente.");
			});
		console.log(res)
	};

	return (
		<div className="bg-gray-200 p-8 rounded-md shadow-md max-w-md mx-auto mt-8">
			<div className="text-center">
				<img
					src={
						user.img ||
						"https://imgs.search.brave.com/o-Jr6SJnUB5c5kAUeEbyCkum4-i2470l41dMBXzm-g4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/OTY1NDA0Ni92ZWN0/b3IvdXNlci1hdmF0/YXItcHJvZmlsZS1p/Y29uLWJsYWNrLXZl/Y3Rvci1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVPWVhB/Q2p0Wm1aUTVJc1ow/VVVwMWlObVo5cTJ4/bDFCRDFWdk42dFoy/VUk9"
					}
					alt="Profile Pic"
					className="w-[200px] h-[200px] rounded-full mx-auto mb-4"
				/>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Nombre:
					</label>
					<input
						type="text"
						name="username"
						id="username"
						value={newInformation.username}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 ">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="correo"
					>
						Email:
					</label>
					<input
						type="text"
						name="correo"
						id="correo"
						value={newInformation.correo}
						onChange={handleInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 ">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="direccion"
					>
						Dirección:
					</label>
					<input
						type="text"
						name="direccion"
						id="direccion"
						value={newInformation.direccion}
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
						id="ciudad"
						value={newInformation.ciudad}
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
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
							>
								Actualizar
							</button>
						)}
					</div>
				)}
				Ultima Actualización:{" "}
				<span className="text-green-500">
					{new Date(user.updateAt).toLocaleString().substring(0, 17)}{" "}
				</span>
			</div>

			<div className="mt-8">
				<h3 className="text-lg font-semibold mb-4">
					Historial de Lugares Recomendados
				</h3>
				{user.lastForm ? (
					<ul>
						{user.lastForm.map((place, index) => (
							<li key={index} className="mb-2">
								{place.name}:<span> {place.score}</span>
							</li>
						))}
					</ul>
				) : (
					<p>No has realizado aun ningún cuestionario, inténtalo!.</p>
				)}
			</div>
		</div>
	);
}
