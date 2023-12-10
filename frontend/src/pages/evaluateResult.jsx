import axios from "axios";
import { useEffect, useState } from "react";

export function EvaluateResult() {
	const [rating, setRating] = useState(0);
	const [lugares, setLugares] = useState([]);
	const [step, setStep] = useState(1);
	const handleStarClick = (selectedRating) => {
		setRating(selectedRating);
	};
	useEffect(() => {
		let lug = JSON.parse(localStorage.getItem("lugaresOrdenados"));
		setLugares(lug);
	}, []);

	function saveOpinion() {
		let id = JSON.parse(localStorage.getItem("user")).id;
		setStep(2);
		axios
			.put("https://655fa07b879575426b45990a.mockapi.io/api/users/" + id, {
				recommendedPlaces: lugares.map((l) => {
					return { ...l, rating };
				}),
			})
			.catch((err) => {
				alert("Error al guardar " + err.message);
			});
		setStep(3);
	}
	return (
		<div className="flex flex-wrap mt-8 mx-auto bg-white justify-center rounded-t-xl sm:rounded-xl sm:w-2/4">
			<div className="flex items-center flex-col">
				<div className="flex justify-start font-medium text-xl xl:text-2xl xl:font-normal">
					El test te recomendó los siguientes lugares.
					<br />
				</div>

				{lugares.map((l) => {
					return <div key={l.score}>{l.name}</div>;
				})}
				<div className="flex justify-start font-medium text-xl xl:text-2xl xl:font-normal">
					¿Qué tan bueno crees que fue el resultado del test?
				</div>

				<div>
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							onClick={() => handleStarClick(star)}
							className={`cursor-pointer text-5xl ${
								star <= rating ? "text-yellow-500" : "text-gray-300"
							}`}
						>
							&#9733;
						</span>
					))}
				</div>
				{step == 1 && (
					<button
						onClick={saveOpinion}
						className="py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-8 justify-center "
					>
						Enviar
					</button>
				)}
				{step == 2 && "Cargando..."}
				{step == 3 && (
					<a
						href="/dashboard"
						className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					>
						Dashboard
					</a>
				)}
			</div>
		</div>
	);
}
