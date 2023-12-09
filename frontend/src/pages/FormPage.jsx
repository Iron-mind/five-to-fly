import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

const Lugares = [
	{
		name: "Cancún",
		weights: [
			2, 3, 1, 2, 3, 3, 2, 1, 2, 1, 1, 3, 3, 1, 1, 2, 3, 3, 1, 1, 2, 1, 1, 2, 1,
			3, 2, 2, 2, 2,
		],
		img: "https://cdn.vallarta-adventures.com/sites/default/files/2019-01/cancun-about-weather%20%281%29.jpg",
		description: "Descripción 1",
	},
	{
		name: "Tokyo",
		weights: [
			2, 1, 2, 3, 1, 1, 2, 3, 1, 3, 3, 1, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 2, 1, 3,
			2, 2, 2, 2, 1,
		],
		img: "https://media.cntraveler.com/photos/60341fbad7bd3b27823c9db2/4:3/w_4624,h_3468,c_limit/Tokyo-2021-GettyImages-1208124099.jpg",
		description: "Descripción 2",
	},
	{
		name: "Marruecos",
		weights: [
			3, 2, 3, 1, 3, 3, 2, 1, 2, 1, 1, 3, 3, 2, 2, 3, 1, 2, 1, 3, 2, 3, 2, 3, 1,
			2, 3, 3, 3, 3,
		],
		img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/fb/25/a5/caption.jpg?w=700&h=-1&s=1",
		description: "Descripción 3",
	},
];
async function guardarPreguntas() {
	let i = 0;
	while (i < Lugares.length) {
		// alert(Lugares[i].weights.length);
		await axios.post("https://656cb651e1e03bfd572eab2d.mockapi.io/api/cities", {
			...Lugares[i],
		});
		i++;
	}
}

export const FormPage = () => {
    const { register, handleSubmit } = useForm()
    const [ShowQuestions, setShowQuestions] = useState([])
    const [sumitted, setSumitted] = useState(false)
    const [topThree, setTopThree] = useState([])

    //funcion que se activa cuando se manda el formulario
    const onSubmit = (data) => {
        console.log(data)
        compararLugaresTuristicos(data, lugares)
    }

    //calculo las puntuaciones de cada lugar con sus respectivos pesos
    function calcularPuntuacionPonderada(respuesta, weights) {
        // Verificar si se proporcionan respuesta y pesos válidos
        if (!respuesta || !weights || !Array.isArray(weights)) {
            console.log("La respuesta o los pesos proporcionados no son válidos.");
            return 0;
        }

        // Obtener las preguntas presentes en la respuesta
        const keys = Object.keys(respuesta);

        // Sumar los productos de la calificación y los pesos
        const puntuacionTotal = keys.reduce((acumulador, pregunta) => {
            return acumulador + parseInt(respuesta[pregunta]) * parseInt(weights[pregunta]);
        }, 0);

        return puntuacionTotal;
    }

    //Compara los lugares con las respuestas generadas y los ordena de mayor a menor puntuacion, entregando solo 3 lugares
    function compararLugaresTuristicos(respuesta, lugares) {
        if (!respuesta || !lugares || !Array.isArray(lugares) || lugares.length < 2) {
            console.log("Se necesitan al menos dos lugares para comparar.");
            return;
        }

        // Calcular la puntuación ponderada para cada lugar turístico
        const puntuaciones = lugares.map((lugar) => {
            return {
                name: lugar.name,
                score: calcularPuntuacionPonderada(respuesta, lugar.weights),
                img: lugar.img,
                description: lugar.description
            };
        });

        // Ordenar los lugares por puntuación de mayor a menor
        const lugaresOrdenados = puntuaciones.sort((a, b) => b.score - a.score);
        lugaresOrdenados.slice(0, 3)
        // Mostrar los tres mejores lugares
        console.log(lugaresOrdenados)
        setTopThree(lugaresOrdenados)
    }

    //Genera un numero aleatorio
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    //useEffect para organizar las preguntas de forma aleatoria
    useEffect(() => {
        const agregarPreguntaAleatoria = () => {
            let number;
            // Confirmacion para que no se repite numeros (por si acaso)
            do {
                number = getRandomInt(preguntas.length);
            } while (ShowQuestions.some(question => question.id === preguntas[number].id));

            // Añade la pregunta aleatoria para mostrar
            setShowQuestions(prevQuestions => [...prevQuestions, preguntas[number]]);

            // Elimina la pregunta aleatoria del array original
            setPreguntas(prevPreguntas => prevPreguntas.filter((_, index) => index !== number));
        };

        if (preguntas.length > 0 && ShowQuestions.length < 10) {
            agregarPreguntaAleatoria();
        }
    }, [preguntas, ShowQuestions]);

    //useEffect para ver las respuestas
    useEffect(() => {
        if (topThree.length !== 0) {
            setSumitted(true)
        }
    }, [topThree]);

    useEffect(() => {
		async function fetchData() {
			let { data } = await axios.get(
				"https://656bebe7e1e03bfd572de71f.mockapi.io/api/questions"
			);
			let questions = data.map((q, ind) => {
				return {
					texto: q.texto,
					id: ind,
				};
			});
			let res = await axios.get(
				"https://656cb651e1e03bfd572eab2d.mockapi.io/api/cities"
			);
			let cities = res.data;
			// alert(JSON.stringify(cities));
			setLugares(cities);
			setPreguntas(questions);
		}
		fetchData();
	}, []);
  
    return (
        <article className='flex flex-wrap mt-8 mx-auto bg-white justify-center rounded-t-xl sm:rounded-xl sm:w-2/4'>
            {sumitted ?
                <div className='p-8 flex justify-center flex-col'>
                    <h1 className='flex justify-center text-3xl font-bold'>¡Aquí esta tu ranking de los mejores lugares que te recomendamos según tus respuestas!</h1>
                    {topThree.map((lugar, index) => (
                        <div className='mt-6' key={index}>
                            <img className="w-[100%] rounded-xl" src={lugar.img} />
                            <h2 className='flex justify-center pt-8 uppercase text-3xl font-bold'>{index + 1}. {lugar.name}</h2>
                            <p className='flex justify-center text-xl'>Puntuación: {lugar.score}</p>
                            <p className='text-xl'>{lugar.description}</p>
                        </div>
                    ))}
                </div>
                :
                <form onSubmit={handleSubmit(onSubmit)} className='p-8 flex justify-center flex-col xl:w-[100%]'>
                    <h1 className='flex justify-center text-3xl font-bold border-b-2'>¡Encuentra tu sitio ideal!</h1>
                    <p h1 className='flex justify-center text-xl py-2 mb-8'>Responde nuestro cuestionario para saber tu proximo lugar turistico.</p>
                    {ShowQuestions.map((pregunta,index) => (
                        <div key={pregunta.id} className='w-[100%] pt-8'>
                            <label className='flex justify-start font-medium text-xl xl:text-3xl xl:font-normal'>{index + 1}. {pregunta.texto}</label>
                            <div className='flex flex-col items-start py-2 px-4 xl:flex-row xl:justify-around xl:text-xl xl:py-4'>
                                <label className='my-1 w-[100%] xl:w-auto'> 
                                    <input className="w-5 h-5" type="radio" value={1} {...register(`${pregunta.id}`, { required: true })}/>
                                    No
                                </label>
                                <label className='my-1 w-[100%] xl:w-auto'>
                                    <input className="w-5 h-5" type="radio" value={2} {...register(`${pregunta.id}`, { required: true })} />
                                    Posiblemente no
                                </label>
                                <label className='my-1 w-[100%] xl:w-auto'>
                                    <input className="w-5 h-5" type="radio" value={3} {...register(`${pregunta.id}`, { required: true })} />
                                    No es revelevante
                                </label>
                                <label className='my-1 w-[100%] xl:w-auto'>
                                    <input className="w-5 h-5" type="radio" value={4} {...register(`${pregunta.id}`, { required: true })} />
                                    Posiblemente si
                                </label>
                                <label className='my-1 w-[100%] xl:w-auto'>
                                    <input className="w-5 h-5" type="radio" value={5} {...register(`${pregunta.id}`, { required: true })} />
                                    Si
                                </label>
                            </div>
                        </div>
                    ))}
                    <button type="submit" className='py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-4 justify-center '>Enviar</button>
                </form>
            }
        </article>
	);
};