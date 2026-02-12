import { ClimateData, Question } from './types';

export const CLIMATE_DATA: ClimateData[] = [
  { year: 2014, trees: 1200, temperature: 24.2 },
  { year: 2015, trees: 1150, temperature: 24.3 },
  { year: 2016, trees: 1100, temperature: 24.5 },
  { year: 2017, trees: 1020, temperature: 24.8 },
  { year: 2018, trees: 950, temperature: 25.1 },
  { year: 2019, trees: 880, temperature: 25.4 },
  { year: 2020, trees: 800, temperature: 25.8 },
  { year: 2021, trees: 710, temperature: 26.2 },
  { year: 2022, trees: 600, temperature: 26.7 },
  { year: 2023, trees: 450, temperature: 27.3 },
  { year: 2024, trees: 380, temperature: 27.9 },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¡Mira las líneas! ¿Qué pasa con el calor cuando cortamos más árboles?",
    options: [
      { id: 'a', text: 'Si hay más árboles, hace más calor.' },
      { id: 'b', text: 'Si hay menos árboles, hace más frío.' },
      { id: 'c', text: 'Cuantos menos árboles hay, más sube la temperatura.' },
      { id: 'd', text: 'No tiene nada que ver una cosa con la otra.' }
    ],
    correctAnswer: 'c',
    explanation: "¡Exacto! Fíjate que cuando la línea verde (árboles) baja, la línea roja (calor) sube. ¡Es como un balancín!"
  },
  {
    id: 2,
    text: "Mira el termómetro (gráfico rojo). En 2014 hacía unos 24 grados. ¿Cuánto ha subido el calor en 2024?",
    options: [
      { id: 'a', text: 'Solo 1 grado.' },
      { id: 'b', text: 'Casi 4 grados más. ¡Hace mucho más calor!' },
      { id: 'c', text: 'La temperatura sigue igual.' },
      { id: 'd', text: 'Ahora hace más frío.' }
    ],
    correctAnswer: 'b',
    explanation: "Muy bien. De 24.2°C a 27.9°C hay casi 4 grados de diferencia. ¡Imagina llevar abrigo en verano!"
  },
  {
    id: 3,
    text: "¿Por qué crees que hace más calor si quitamos los árboles?",
    options: [
      { id: 'a', text: 'Porque los árboles dan sombra y refrescan el aire.' },
      { id: 'b', text: 'Porque a los árboles no les gusta el sol.' },
      { id: 'c', text: 'Porque los pájaros se van.' },
      { id: 'd', text: 'La temperatura cambia por arte de magia.' }
    ],
    correctAnswer: 'a',
    explanation: "¡Correcto! Los árboles son como el aire acondicionado natural de la Tierra. Si los quitamos, el sol calienta mucho más el suelo."
  },
  {
    id: 4,
    text: "Si seguimos cortando árboles y no hacemos nada hasta el año 2030, ¿qué crees que pasará?",
    options: [
      { id: 'a', text: 'Todo volverá a estar bien por sí solo.' },
      { id: 'b', text: 'Nacerán árboles nuevos mágicamente.' },
      { id: 'c', text: 'Hará muchísimo calor (casi 30°C) y apenas quedarán árboles.' },
      { id: 'd', text: 'El clima dejará de cambiar.' }
    ],
    correctAnswer: 'c',
    explanation: "¡Bien deducido! Si seguimos la línea del gráfico, veremos que el problema se hará cada vez más grande si no actuamos ya."
  },
  {
    id: 5,
    text: "¡Vamos a investigar un año concreto! Busca el año 2020 en la línea de abajo. ¿Cuántos árboles quedaban aproximadamente?",
    options: [
      { id: 'a', text: 'Todavía había muchos (1200).' },
      { id: 'b', text: 'Quedaban unos 800 (la montaña ya estaba bajando).' },
      { id: 'c', text: 'Ya no había árboles (0).' },
      { id: 'd', text: 'Había más que nunca (2000).' }
    ],
    correctAnswer: 'b',
    explanation: "¡Tienes buen ojo de detective! Si buscas el 2020 y subes el dedo, verás que la línea verde está a la altura del 800."
  },
  {
    id: 6,
    text: "Compara el año 2016 y el año 2022. ¿Cuál de estas frases es VERDAD?",
    options: [
      { id: 'a', text: 'En 2016 estábamos mejor: había más árboles y hacía menos calor.' },
      { id: 'b', text: 'En 2022 estamos mejor que antes.' },
      { id: 'c', text: 'Los dos años son exactamente iguales.' },
      { id: 'd', text: 'En 2022 hay muchísimos más bosques.' }
    ],
    correctAnswer: 'a',
    explanation: "¡Así es! Si miramos atrás, en 2016 la situación no era tan grave como ahora en 2022 o 2024."
  },
  {
    id: 7,
    text: "¡Misión de rescate! Si queremos que la línea roja (calor) baje en el futuro, ¿qué tenemos que hacer con la línea verde?",
    options: [
      { id: 'a', text: 'Tenemos que hacer que baje más rápido (cortar más).' },
      { id: 'b', text: 'Da igual lo que hagamos con la línea verde.' },
      { id: 'c', text: 'Tenemos que plantar árboles para que la línea verde vuelva a subir.' },
      { id: 'd', text: 'Tenemos que pintar la línea de otro color.' }
    ],
    correctAnswer: 'c',
    explanation: "¡Esa es la solución! Para recuperar el frescor, necesitamos recuperar los bosques. ¡La línea verde debe subir!"
  }
];