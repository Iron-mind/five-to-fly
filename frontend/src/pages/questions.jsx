import axios from "axios";
import { useEffect, useState } from "react";

export default function Questions() {
	const [preguntas, setPreguntas] = useState([]);

	async function fetchData() {
		let { data } = await axios.get(
			"https://five-to-fly.onrender.com/api/questions/"
		);
		setPreguntas(data || []);
	}
	useEffect(() => {
		async function fetchData() {
			let { data } = await axios.get(
				"https://five-to-fly.onrender.com/api/questions/"
			);
			setPreguntas(data || []);
		}
		fetchData();
	}, []);
	function deleteQuestion(id) {
		axios
			.delete(`https://five-to-fly.onrender.com/api/questions/${id}`)
			.then(() => {
				alert("Borrado");
				fetchData();
			})
			.catch((err) => alert("Error en la peticion"));
	}
	return (
		<div className="flex flex-wrap mt-8 mx-auto bg-gray-200 justify-center rounded-t-xl sm:rounded-xl sm:w-2/4">
			{preguntas.map((pregunta, index) => {
				return (
					<div key={pregunta.id} className="w-[100%] pt-8">
						<label className="flex justify-start font-medium text-xl xl:text-3xl xl:font-normal m-3">
							{index + 1}. {pregunta.texto}
						</label>
						<button
							className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-3"
							onClick={() => deleteQuestion(pregunta.id)}
						>
							Borrar
						</button>
					</div>
				);
			})}
		</div>
	);
}
