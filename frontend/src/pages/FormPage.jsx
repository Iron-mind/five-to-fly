import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormPage = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        compararLugaresTuristicos(respuesta, lugares)
    }

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

    function calcularPuntuacionPonderada(respuesta, pesos) {
        // Verificar si se proporcionan respuesta y pesos válidos
        if (!respuesta || !pesos || !Array.isArray(pesos)) {
            console.log("La respuesta o los pesos proporcionados no son válidos.");
            return 0;
        }
    
        // Obtener las preguntas presentes en la respuesta
        const keys = Object.keys(respuesta);
        
        // Sumar los productos de la calificación y los pesos
        const puntuacionTotal = keys.reduce((acumulador, pregunta) => {
            console.log("respuesta[index]:", respuesta[pregunta])
            console.log("keys:", keys)
            console.log("index:", pregunta)
            console.log("keys[index]:", keys[pregunta])

            console.log("pesos[index]:", pesos[pregunta])

            return acumulador + parseInt(respuesta[pregunta]) * parseInt(pesos[pregunta]);
        }, 0);
    
        return puntuacionTotal;
    }
    
    function compararLugaresTuristicos(respuesta, lugares) {
        if (!respuesta || !lugares || !Array.isArray(lugares) || lugares.length < 2) {
            console.log("Se necesitan al menos dos lugares para comparar.");
            return;
        }
    
        // Calcular la puntuación ponderada para cada lugar turístico
        const puntuaciones = lugares.map((lugar) => {
            return calcularPuntuacionPonderada(respuesta, lugar.pesos);
        });
        
        console.log(puntuaciones)
        // Encontrar el índice del lugar turístico con la puntuación más alta
        const indiceMejorLugar = puntuaciones.indexOf(Math.max(...puntuaciones));
    
        // Mostrar el resultado
        console.log(`El mejor lugar turístico es: ${lugares[indiceMejorLugar].nombre}`);
    }
    
    // Ejemplo de uso con tres lugares turísticos
    const lugares = [
        {
            nombre: "Lugar 1",
            pesos: [3, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3]
        },
        {
            nombre: "Lugar 2",
            pesos: [2, 1, 3, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1]
        },
        {
            nombre: "Lugar 3",
            pesos: [3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 1]
        }
    ];
    
    // Respuesta a la pregunta
    const respuesta = {1: '2', 2: '1', 3: '2', 4: '4', 6: '3', 8: '5', 9: '3', 10: '5', 11: '3', 14: '4'};
    
    const [ShowQuestions, setShowQuestions] = useState([])

    //Genera un numero aleatorio
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

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

    return (
        <article className='wrapper'>
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
        </article>
    )
}