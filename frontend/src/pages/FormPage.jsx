import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/ContextUser';
import { Link } from 'react-router-dom';

//Compara los lugares con las respuestas generadas y los ordena de mayor a menor puntuacion, entregando solo 3 lugares
export function compararLugaresTuristicos(respuesta, lugares) {
    if (
        !respuesta ||
        !lugares ||
        !Array.isArray(lugares) ||
        lugares.length < 2
    ) {
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
    return lugaresOrdenados
}

//calculo las puntuaciones de cada lugar con sus respectivos pesos
export function calcularPuntuacionPonderada(respuesta, weights) {
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

export const FormPage = () => {
    const { register, handleSubmit } = useForm()
    const [ShowQuestions, setShowQuestions] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [topThree, setTopThree] = useState([])
    const [lugares, setLugares] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { user, login } = useContext(AuthContext);

    //funcion que se activa cuando se manda el formulario
    const onSubmit = (data) => {
        const resultado = compararLugaresTuristicos(data, lugares)
        setTopThree(resultado)
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
            } while (
                ShowQuestions.some((question) => question.id === preguntas[number].id)
            );

            // Añade la pregunta aleatoria para mostrar
            setShowQuestions((prevQuestions) => [
                ...prevQuestions,
                preguntas[number],
            ]);

            // Elimina la pregunta aleatoria del array original
            setPreguntas((prevPreguntas) =>
                prevPreguntas.filter((_, index) => index !== number)
            );
        };

        if (preguntas.length > 0 && ShowQuestions.length < 10) {
            agregarPreguntaAleatoria();
        }
    }, [preguntas, ShowQuestions]);

    //useEffect para ver las respuestas
    useEffect(() => {
        if (topThree.length !== 0) {
            toast.success('Aquí esta tu resultado!.')
            async function fetchData() {
                setSubmitted(true);
                const res = await axios
                    .put(`http://localhost:4000/api/userProfile/` + `${user.id}/`, {
                        ...user,
                        lastForm: topThree,
                    })
                    .then(() => {
                        login({
                            ...user,
                            lastForm: topThree,
                        })
                    });
            }
            fetchData()
        }
    }, [topThree]);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get(
                "http://localhost:4000/api/questions/"
            );
            let questions = data.map((q, ind) => {
                return {
                    texto: q.texto,
                    id: ind,
                };
            });
            let res = await axios.get(
                "http://localhost:4000/api/places/"
            );
            let cities = res.data;
            // alert(JSON.stringify(cities));
            setLugares(cities);
            setPreguntas(questions);
            setCargando(false)
        }
        fetchData();
    }, []);

    return (
        <article className="flex flex-wrap mt-8 mx-auto bg-gray-200 justify-center rounded-t-xl sm:rounded-xl sm:w-2/4">
            {submitted ? (
                <div className="p-8 flex justify-center flex-col">
                    <h1 className="flex justify-center text-3xl font-bold">
                        ¡Aquí esta tu ranking de los mejores lugares que te recomendamos
                        según tus respuestas!
                    </h1>
                    {topThree.map((lugar, index) => (
                        <div className="mt-6" key={index}>
                            <img className="w-[100%] rounded-xl" src={lugar.img} />
                            <h2 className="flex justify-center pt-8 uppercase text-3xl font-bold">
                                {index + 1}. {lugar.name}
                            </h2>
                            <p className="flex justify-center text-xl">
                                Puntuación: {lugar.score}
                            </p>
                            <p className="text-xl">{lugar.description}</p>
                        </div>
                    ))}
                    <div className="flex justify-center mt-11">
                        <p>Te gusto el resultado?  </p>
                        <Link
                            to="/evaluate-result"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Califícanos Aquí
                        </Link>
                    </div>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8 flex justify-center flex-col xl:w-[100%]"
                >
                    <h1 className="flex justify-center text-3xl font-bold border-b-2">
                        ¡Encuentra tu sitio ideal!
                    </h1>
                    <p className="flex justify-center text-xl py-2 mb-8">
                        Responde nuestro cuestionario para saber tu proximo lugar
                        turístico.
                    </p>
                    {cargando ? <p className="flex justify-center text-xl py-2 mb-8">Cargando...</p> :
                        <>
                            {ShowQuestions.map((pregunta, index) => (
                                <div key={pregunta.id} className="w-[100%] pt-8">
                                    <label className="flex justify-start font-medium text-xl xl:text-3xl xl:font-normal">
                                        {index + 1}. {pregunta.texto}
                                    </label>
                                    <div className="flex flex-col items-start py-2 px-4 xl:flex-row xl:justify-around xl:text-xl xl:py-4">
                                        <label className="my-1 w-[100%] xl:w-auto">
                                            <input
                                                className="w-5 h-5"
                                                type="radio"
                                                value={1}
                                                {...register(`${pregunta.id}`, { required: true })}
                                            />
                                            No
                                        </label>
                                        <label className="my-1 w-[100%] xl:w-auto">
                                            <input
                                                className="w-5 h-5"
                                                type="radio"
                                                value={2}
                                                {...register(`${pregunta.id}`, { required: true })}
                                            />
                                            Posiblemente no
                                        </label>
                                        <label className="my-1 w-[100%] xl:w-auto">
                                            <input
                                                className="w-5 h-5"
                                                type="radio"
                                                value={3}
                                                {...register(`${pregunta.id}`, { required: true })}
                                            />
                                            No es relevante
                                        </label>
                                        <label className="my-1 w-[100%] xl:w-auto">
                                            <input
                                                className="w-5 h-5"
                                                type="radio"
                                                value={4}
                                                {...register(`${pregunta.id}`, { required: true })}
                                            />
                                            Posiblemente si
                                        </label>
                                        <label className="my-1 w-[100%] xl:w-auto">
                                            <input
                                                className="w-5 h-5"
                                                type="radio"
                                                value={5}
                                                {...register(`${pregunta.id}`, { required: true })}
                                            />
                                            Si
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </>
                    }

                    <button
                        type="submit"
                        className="py-4 px-8 bg-[#585ca4] hover:bg-[#70348c] rounded-xl text-white text-xl flex items-center  shadow-xl w-[100%] mt-4 justify-center "
                    >
                        Enviar
                    </button>
                </form>
            )}
        </article>
    );
};

