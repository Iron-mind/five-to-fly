import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormPage = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)

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