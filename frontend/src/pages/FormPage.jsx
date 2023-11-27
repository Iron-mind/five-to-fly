import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormPage = () => {
    const { register, handleSubmit } = useForm()
    const [ShowQuestions, setShowQuestions] = useState([])
    const [sumitted, setSumitted] = useState(false)
    const [topThree, setTopThree] = useState([])

    //se borrara esto, se cambiara por los datos traidos del backend
    const [preguntas, setPreguntas] = useState([
        { id: 0, texto: 'Texto pregunta 1' },
        { id: 1, texto: 'Texto pregunta 2' },
        { id: 2, texto: 'Texto pregunta 3' },
        { id: 3, texto: 'Texto pregunta 4' },
        { id: 4, texto: 'Texto pregunta 5' },
        { id: 5, texto: 'Texto pregunta 6' },
        { id: 6, texto: 'Texto pregunta 7' },
        { id: 7, texto: 'Texto pregunta 8' },
        { id: 8, texto: 'Texto pregunta 9' },
        { id: 9, texto: 'Texto pregunta 10' },
        { id: 10, texto: 'Texto pregunta 11' },
        { id: 11, texto: 'Texto pregunta 12' },
        { id: 12, texto: 'Texto pregunta 13' },
        { id: 13, texto: 'Texto pregunta 14' },
        { id: 14, texto: 'Texto pregunta 15' },
    ])

    // Los lugares turisticos, toca llenar todo esto, no se si se traeran del backend
    const lugares = [
        {
            name: "Cancún",
            weights: [3, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3],
            img: "https://cdn.vallarta-adventures.com/sites/default/files/2019-01/cancun-about-weather%20%281%29.jpg",
            description: "Descripción 1"
        },
        {
            name: "Tokyo",
            weights: [2, 1, 3, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1],
            img: "https://media.cntraveler.com/photos/60341fbad7bd3b27823c9db2/4:3/w_4624,h_3468,c_limit/Tokyo-2021-GettyImages-1208124099.jpg",
            description: "Descripción 2"
        },
        {
            name: "Marruecos",
            weights: [3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 1],
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/fb/25/a5/caption.jpg?w=700&h=-1&s=1",
            description: "Descripción 3"
        }
    ];

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

    return (
        <article className='wrapper'>
            {sumitted ?
                <div>
                    <h1>¡Aquí esta tu ranking de los mejores lugares que te recomendamos según tus respuestas!</h1>
                    {topThree.map((lugar, index) => (
                        <div className='input-group' key={index}>
                            <img className="imgs" src={lugar.img} />
                            <h2>{index + 1}. {lugar.name}</h2>
                            <p>Puntuación: {lugar.score}</p>
                            <p>{lugar.description}</p>
                        </div>
                    ))}
                </div>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>¡Encuentra tu sitio ideal!</h1>
                    <p>Responde nuestro cuestionario para saber tu sitio adicional.</p>
                    {ShowQuestions.map(pregunta => (
                        <div className='input-group' key={pregunta.id}>
                            <label >{pregunta.texto}</label><br />
                            <div className='input-group-row'>
                                <label>
                                    <input type="radio" value={1} {...register(`${pregunta.id}`, { required: true })} />
                                    No
                                </label>
                                <label>
                                    <input type="radio" value={2} {...register(`${pregunta.id}`, { required: true })} />
                                    Posiblemente no
                                </label>
                                <label>
                                    <input type="radio" value={3} {...register(`${pregunta.id}`, { required: true })} />
                                    No me importa
                                </label>
                                <label>
                                    <input type="radio" value={4} {...register(`${pregunta.id}`, { required: true })} />
                                    Posiblemente si
                                </label>
                                <label>
                                    <input type="radio" value={5} {...register(`${pregunta.id}`, { required: true })} />
                                    Si
                                </label>
                            </div>
                        </div>
                    ))}
                    <input type="submit" />
                </form>
            }
        </article>
    )
}