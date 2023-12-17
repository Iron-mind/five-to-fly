import { calcularPuntuacionPonderada, compararLugaresTuristicos } from '../pages/FormPage';

describe('calcularPuntuacionPonderada', () => {
  it('debería calcular la puntuación ponderada correctamente', () => {
    const respuesta = {
      0: '2',
      1: '1',
      2: '3',
    };

    const weights = [2, 1, 3];

    // También, podrías acceder a la función directamente desde el prototipo del componente
    const resultado = calcularPuntuacionPonderada(respuesta, weights);

    // El resultado esperado sería: (2*2) + (1*1) + (3*3) = 4 + 1 + 9 = 14
    expect(resultado).toBe(14);
  });

  it('debería devolver 0 si la respuesta o los pesos no son válidos', () => {
    // Prueba cuando la respuesta no es válida
    const resultadoRespuestaInvalida = calcularPuntuacionPonderada(null, [1, 2, 3]);
    expect(resultadoRespuestaInvalida).toBe(0);

    // Prueba cuando los pesos no son válidos
    const resultadoPesosInvalidos = calcularPuntuacionPonderada({ pregunta1: '3' }, null);
    expect(resultadoPesosInvalidos).toBe(0);
  });
});


describe('compararLugaresTuristicos', () => {
  it('debería ordenar los lugares correctamente', () => {
    const respuesta = {
      0: '3',
      1: '4',
      2: '2',
    };

    const lugares = [
      {
        name: 'Lugar1',
        weights: [2, 1, 3],
        img: 'imagen1.jpg',
        description: 'Descripción del Lugar1',
      },
      {
        name: 'Lugar2',
        weights: [1, 3, 2],
        img: 'imagen2.jpg',
        description: 'Descripción del Lugar2',
      },
    ];

    const resultado = compararLugaresTuristicos(respuesta, lugares);

    // El resultado esperado depende de la lógica específica en tu función compararLugaresTuristicos
    // Puedes ajustar este resultado según la lógica exacta de tu aplicación.
    const resultadoEsperado = [
      {
        name: 'Lugar2',
        score: 19,
        img: 'imagen2.jpg',
        description: 'Descripción del Lugar2',
      },
      {
        name: 'Lugar1',
        score: 16,
        img: 'imagen1.jpg',
        description: 'Descripción del Lugar1',
      }
    ];

    expect(resultado).toEqual(resultadoEsperado);
  });

  it('debería manejar casos donde la entrada no es válida', () => {
    // Prueba cuando la respuesta o los lugares no son válidos
    const resultadoRespuestaInvalida = compararLugaresTuristicos(null, []);
    expect(resultadoRespuestaInvalida).toBeUndefined();

    const resultadoLugaresInvalidos = compararLugaresTuristicos({}, null);
    expect(resultadoLugaresInvalidos).toBeUndefined();
  });
});
