import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CreateQuestion() {
	const [input, setInput] = useState({
		texto: "",
	});
	const [message, setMessage] = useState("");
	function postQuestion() {
		if (input.texto) {
			setMessage("Guardando...");
			return axios
				.post("https://five-to-fly.onrender.com/api/questions/", {
					texto: input.texto,
				})
				.then((res) => {
					setMessage("Pregunta guardada");
					setInput({ texto: "" });
					setTimeout(() => {
						setMessage("");
					}, 10000);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		alert("Pregunta vacía");
	}
	function handleInputChange(e) {
		setInput({ texto: e.target.value });
	}
	useEffect(() => {}, []);
	return (
		<article className="flex flex-wrap mt-8 mx-auto bg-gray-200 justify-center rounded-t-xl sm:rounded-xl sm:w-2/4">
			<div className="p-8 flex justify-center flex-col">
				<h1 className="flex justify-start font-medium text-xl xl:text-2xl xl:font-normal">
					Crea una pregunta nueva.
				</h1>
				<form>
					<textarea
						name="texto"
						onChange={handleInputChange}
						id=""
						cols="50"
						rows="4"
					></textarea>
					<button
						type="button"
						onClick={postQuestion}
						className="py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-4 justify-center "
					>
						Enviar
					</button>
					<p className="text-green">{message}</p>
				</form>
			</div>
			<Link
				to="/questions"
				className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
			>
				Todas las preguntas
			</Link>
		</article>
	);
}
