import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/ContextUser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function EvaluateResult() {
	const [rating, setRating] = useState(0);
	const [lugares, setLugares] = useState([]);
	const [step, setStep] = useState(1);
	const { user } = useContext(AuthContext)

	const handleStarClick = (selectedRating) => {
		setRating(selectedRating);
	};
	
	useEffect(() => {
		let lug = user.lastForm;
		setLugares(lug);
	}, []);

	const saveOpinion = async () => {
		setStep(2);
		const res = await axios
			.put("https://five-to-fly.onrender.com/api/userProfile/" + `${user.id}/`, {
				...user,
				rate: rating
			})
			.then(() => {
				toast.success("Gracias por tu opinion!.");
				setStep(3);
			})
			.catch((err) => {
				toast.error("Error al guardar.");
				console.log(err)
			});

	}

	return (
		<div className="flex flex-wrap mt-8 mx-auto bg-gray-200 justify-center rounded-t-xl sm:rounded-xl sm:w-2/4">
			<div className="flex items-center flex-col">
				<div className="flex justify-start font-medium text-xl xl:text-2xl xl:font-normal mt-4">
					El test te recomendó los siguientes lugares.
					<br />
				</div>

				{lugares.map((l, index) => {
					return <div key={index} className="flex justify-center pt-2 uppercase text-xl font-bold" >{index + 1}. {l.name}</div>;
				})}
				<div className="flex justify-start font-medium text-xl xl:text-2xl xl:font-normal">
					¿Qué tan bueno crees que fue el resultado del test?
				</div>

				<div>
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							onClick={() => handleStarClick(star)}
							className={`cursor-pointer text-5xl ${star <= rating ? "text-yellow-500" : "text-gray-300"
								}`}
						>
							&#9733;
						</span>
					))}
				</div>
				{step == 1 && (
					<button
						onClick={saveOpinion}
						className="py-4 mb-6 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center "
					>
						Enviar
					</button>
				)}
				{step == 2 && "Cargando..."}
				{step == 3 && (
					<Link
						to="/"
						className="py-4 mb-6 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center "
					>
						<button>Volver</button>
					</Link>
				)}
			</div>
		</div>
	);
}
