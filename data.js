// Data.js - Base de datos de la aplicación educativa

const lecturas = [
    {
        id: 1,
        titulo: "El Imperio Inca",
        texto: "El Imperio Inca fue la civilización más grande de América del Sur. Su capital fue Cusco y se extendió por gran parte de los Andes. Los incas construyeron Machu Picchu, una ciudad en las montañas que es Patrimonio de la Humanidad. Desarrollaron un sistema de caminos llamado Qhapaq Ñan y usaban quipus para llevar la contabilidad. Su idioma era el quechua, que aún se habla en Perú. El imperio fue conquistado por los españoles en 1532.",
        preguntas: [
            {
                pregunta: "¿Cuál era la capital del Imperio Inca?",
                opciones: ["Lima", "Cusco", "Arequipa", "Trujillo"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué construyeron los incas en las montañas?",
                opciones: ["El Coliseo", "La Muralla China", "Machu Picchu", "Las Pirámides"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué idioma hablaban los incas?",
                opciones: ["Español", "Aymara", "Quechua", "Guaraní"],
                respuesta: 2
            }
        ]
    },
    {
        id: 2,
        titulo: "La Amazonia Peruana",
        texto: "La Amazonia es la selva tropical más grande del mundo. En Perú ocupa más del 60% del territorio nacional. Es hogar de miles de especies de plantas y animales. En la Amazonia viven comunidades indígenas que conservan sus tradiciones ancestrales. Los ríos más importantes son el Amazonas, el Ucayali y el Marañón. La biodiversidad amazónica es vital para el planeta porque produce el 20% del oxígeno mundial.",
        preguntas: [
            {
                pregunta: "¿Qué porcentaje del Perú ocupa la Amazonia?",
                opciones: ["30%", "45%", "60%", "75%"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué produce la Amazonia para el planeta?",
                opciones: ["Agua", "Oxígeno", "Petróleo", "Minerales"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el río más importante de la Amazonia?",
                opciones: ["Nilo", "Amazonas", "Rímac", "Mantaro"],
                respuesta: 1
            }
        ]
    },
    {
        id: 3,
        titulo: "Inventos que Cambiaron el Mundo",
        texto: "A lo largo de la historia, muchos inventos han transformado la vida humana. La rueda, inventada hace más de 5000 años, revolucionó el transporte. La imprenta de Gutenberg permitió difundir el conocimiento. La bombilla eléctrica de Edison iluminó las ciudades. Alexander Graham Bell inventó el teléfono y cambió la comunicación. En el siglo XX, la computadora y el internet transformaron completamente nuestra sociedad.",
        preguntas: [
            {
                pregunta: "¿Quién inventó la bombilla eléctrica?",
                opciones: ["Newton", "Einstein", "Edison", "Tesla"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué permitió difundir el conocimiento?",
                opciones: ["La radio", "La imprenta", "La televisión", "El teléfono"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué invento revolucionó el transporte?",
                opciones: ["El barco", "La rueda", "El avión", "El tren"],
                respuesta: 1
            }
        ]
    },
    {
        id: 4,
        titulo: "Mario Vargas Llosa",
        texto: "Mario Vargas Llosa es uno de los escritores más importantes de América Latina. Nació en Arequipa, Perú, en 1936. Ganó el Premio Nobel de Literatura en 2010 por su extraordinaria obra narrativa. Entre sus novelas más famosas están 'La ciudad y los perros', 'Conversación en La Catedral' y 'La fiesta del Chivo'. Sus libros han sido traducidos a más de 30 idiomas y es considerado uno de los máximos exponentes del boom latinoamericano.",
        preguntas: [
            {
                pregunta: "¿En qué año nació Mario Vargas Llosa?",
                opciones: ["1920", "1936", "1945", "1950"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué premio ganó en 2010?",
                opciones: ["Oscar", "Nobel de Literatura", "Pulitzer", "Cervantes"],
                respuesta: 1
            },
            {
                pregunta: "¿Dónde nació Vargas Llosa?",
                opciones: ["Lima", "Cusco", "Arequipa", "Trujillo"],
                respuesta: 2
            }
        ]
    },
    {
        id: 5,
        titulo: "El Agua: Recurso Vital",
        texto: "El agua es esencial para la vida en la Tierra. Cubre el 71% de la superficie del planeta, pero solo el 3% es agua dulce. El cuerpo humano está compuesto por aproximadamente 60% de agua. Necesitamos agua para beber, cocinar, lavar y cultivar alimentos. El ciclo del agua incluye evaporación, condensación y precipitación. Es fundamental cuidar este recurso porque millones de personas no tienen acceso a agua potable.",
        preguntas: [
            {
                pregunta: "¿Qué porcentaje de agua dulce hay en la Tierra?",
                opciones: ["1%", "3%", "10%", "25%"],
                respuesta: 1
            },
            {
                pregunta: "¿De qué porcentaje de agua está compuesto el cuerpo humano?",
                opciones: ["30%", "45%", "60%", "80%"],
                respuesta: 2
            },
            {
                pregunta: "¿Cuál NO es parte del ciclo del agua?",
                opciones: ["Evaporación", "Condensación", "Oxidación", "Precipitación"],
                respuesta: 2
            }
        ]
    },
    {
        id: 6,
        titulo: "Deportistas Peruanos Destacados",
        texto: "Perú ha tenido grandes deportistas que han destacado internacionalmente. Teófilo Cubillas fue un legendario futbolista que brilló en los Mundiales de 1970 y 1978. Sofía Mulanovich se convirtió en campeona mundial de surf en 2004. Paolo Guerrero es el máximo goleador histórico de la selección peruana. En voleibol, la selección femenina ha ganado múltiples medallas sudamericanas. Estos atletas son orgullo nacional e inspiran a las nuevas generaciones.",
        preguntas: [
            {
                pregunta: "¿En qué deporte destacó Sofía Mulanovich?",
                opciones: ["Natación", "Surf", "Atletismo", "Voleibol"],
                respuesta: 1
            },
            {
                pregunta: "¿Quién es el máximo goleador de la selección peruana?",
                opciones: ["Pizarro", "Farfán", "Paolo Guerrero", "Cubillas"],
                respuesta: 2
            },
            {
                pregunta: "¿En qué Mundiales participó Teófilo Cubillas?",
                opciones: ["1962 y 1966", "1970 y 1978", "1982 y 1986", "1990 y 1994"],
                respuesta: 1
            }
        ]
    }
];

const razonamientoVerbal = {
    sinonimos: [
        { palabra: "ALEGRE", opciones: ["Triste", "Feliz", "Enojado", "Aburrido"], respuesta: 1 },
        { palabra: "RÁPIDO", opciones: ["Lento", "Veloz", "Pesado", "Débil"], respuesta: 1 },
        { palabra: "GRANDE", opciones: ["Pequeño", "Enorme", "Delgado", "Corto"], respuesta: 1 },
        { palabra: "INTELIGENTE", opciones: ["Tonto", "Sabio", "Torpe", "Lento"], respuesta: 1 },
        { palabra: "HERMOSO", opciones: ["Feo", "Bello", "Sucio", "Viejo"], respuesta: 1 },
        { palabra: "VALIENTE", opciones: ["Cobarde", "Audaz", "Débil", "Perezoso"], respuesta: 1 },
        { palabra: "DIFÍCIL", opciones: ["Fácil", "Complicado", "Simple", "Ligero"], respuesta: 1 },
        { palabra: "FUERTE", opciones: ["Débil", "Poderoso", "Flaco", "Pequeño"], respuesta: 1 },
        { palabra: "BRILLANTE", opciones: ["Opaco", "Luminoso", "Oscuro", "Mate"], respuesta: 1 },
        { palabra: "ANTIGUO", opciones: ["Moderno", "Viejo", "Nuevo", "Reciente"], respuesta: 1 },
        { palabra: "LIMPIO", opciones: ["Sucio", "Pulcro", "Manchado", "Grasoso"], respuesta: 1 },
        { palabra: "TRANQUILO", opciones: ["Agitado", "Sereno", "Nervioso", "Ruidoso"], respuesta: 1 }
    ],
    antonimos: [
        { palabra: "ALTO", opciones: ["Grande", "Bajo", "Ancho", "Largo"], respuesta: 1 },
        { palabra: "CALIENTE", opciones: ["Tibio", "Frío", "Templado", "Húmedo"], respuesta: 1 },
        { palabra: "SUBIR", opciones: ["Elevar", "Bajar", "Trepar", "Ascender"], respuesta: 1 },
        { palabra: "ENTRAR", opciones: ["Ingresar", "Salir", "Acceder", "Penetrar"], respuesta: 1 },
        { palabra: "COMPRAR", opciones: ["Adquirir", "Vender", "Obtener", "Ganar"], respuesta: 1 },
        { palabra: "RECORDAR", opciones: ["Memorizar", "Olvidar", "Pensar", "Aprender"], respuesta: 1 },
        { palabra: "LLORAR", opciones: ["Sollozar", "Reír", "Lamentar", "Sufrir"], respuesta: 1 },
        { palabra: "CLARO", opciones: ["Evidente", "Oscuro", "Brillante", "Limpio"], respuesta: 1 },
        { palabra: "AMOR", opciones: ["Cariño", "Odio", "Afecto", "Pasión"], respuesta: 1 },
        { palabra: "PRINCIPIO", opciones: ["Inicio", "Final", "Origen", "Comienzo"], respuesta: 1 },
        { palabra: "VERDAD", opciones: ["Realidad", "Mentira", "Certeza", "Honestidad"], respuesta: 1 },
        { palabra: "UNIR", opciones: ["Juntar", "Separar", "Mezclar", "Conectar"], respuesta: 1 }
    ],
    analogias: [
        { pregunta: "PERRO es a LADRAR como GATO es a:", opciones: ["Correr", "Maullar", "Dormir", "Comer"], respuesta: 1 },
        { pregunta: "LÁPIZ es a ESCRIBIR como TIJERA es a:", opciones: ["Pegar", "Cortar", "Doblar", "Pintar"], respuesta: 1 },
        { pregunta: "DÍA es a NOCHE como BLANCO es a:", opciones: ["Gris", "Negro", "Claro", "Azul"], respuesta: 1 },
        { pregunta: "LIBRO es a LEER como MÚSICA es a:", opciones: ["Ver", "Escuchar", "Tocar", "Cantar"], respuesta: 1 },
        { pregunta: "MÉDICO es a HOSPITAL como PROFESOR es a:", opciones: ["Oficina", "Escuela", "Casa", "Parque"], respuesta: 1 },
        { pregunta: "AVE es a VOLAR como PEZ es a:", opciones: ["Correr", "Saltar", "Nadar", "Caminar"], respuesta: 2 },
        { pregunta: "HAMBRE es a COMER como SED es a:", opciones: ["Dormir", "Jugar", "Beber", "Descansar"], respuesta: 2 },
        { pregunta: "FRÍO es a INVIERNO como CALOR es a:", opciones: ["Otoño", "Primavera", "Verano", "Lluvia"], respuesta: 2 },
        { pregunta: "ZAPATO es a PIE como GUANTE es a:", opciones: ["Brazo", "Cabeza", "Mano", "Pierna"], respuesta: 2 }
    ],
    oraciones: [
        { texto: "El ___ brilla en el cielo durante el día.", opciones: ["luna", "sol", "estrella", "planeta"], respuesta: 1 },
        { texto: "Los ___ vuelan en el cielo.", opciones: ["peces", "pájaros", "perros", "gatos"], respuesta: 1 },
        { texto: "Necesito un ___ para cortar el papel.", opciones: ["martillo", "tijera", "pegamento", "regla"], respuesta: 1 },
        { texto: "El ___ es un animal muy grande que vive en el mar.", opciones: ["ratón", "ballena", "hormiga", "conejo"], respuesta: 1 },
        { texto: "Uso el ___ para cepillarme los dientes.", opciones: ["peine", "cepillo", "jabón", "champú"], respuesta: 1 },
        { texto: "La ___ es la comida más importante del día.", opciones: ["cena", "desayuno", "merienda", "lonche"], respuesta: 1 },
        { texto: "El ___ es el órgano que nos permite pensar.", opciones: ["corazón", "cerebro", "estómago", "pulmón"], respuesta: 1 },
        { texto: "Necesito ___ para ver mejor de lejos.", opciones: ["audífonos", "lentes", "zapatos", "guantes"], respuesta: 1 }
    ]
};

const matematicas = {
    aritmetica: [
        { problema: "¿Cuánto es 25 + 37?", opciones: ["52", "62", "72", "82"], respuesta: 1 },
        { problema: "¿Cuánto es 89 - 34?", opciones: ["45", "55", "65", "75"], respuesta: 1 },
        { problema: "¿Cuánto es 12 × 8?", opciones: ["86", "96", "106", "116"], respuesta: 1 },
        { problema: "¿Cuánto es 144 ÷ 12?", opciones: ["10", "11", "12", "13"], respuesta: 2 },
        { problema: "¿Cuánto es 156 + 289?", opciones: ["435", "445", "455", "465"], respuesta: 1 },
        { problema: "¿Cuánto es 500 - 237?", opciones: ["253", "263", "273", "283"], respuesta: 1 }
    ],
    fracciones: [
        { problema: "¿Cuánto es 1/2 + 1/4?", opciones: ["2/4", "3/4", "4/4", "1/2"], respuesta: 1 },
        { problema: "¿Cuánto es 3/5 - 1/5?", opciones: ["1/5", "2/5", "3/5", "4/5"], respuesta: 1 },
        { problema: "Si comes 1/4 de una pizza, ¿qué fracción queda?", opciones: ["1/4", "2/4", "3/4", "4/4"], respuesta: 2 },
        { problema: "¿Qué fracción es equivalente a 2/4?", opciones: ["1/2", "1/3", "2/3", "3/4"], respuesta: 0 }
    ],
    geometria: [
        { problema: "¿Cuántos lados tiene un triángulo?", opciones: ["2", "3", "4", "5"], respuesta: 1 },
        { problema: "¿Cuántos lados tiene un cuadrado?", opciones: ["3", "4", "5", "6"], respuesta: 1 },
        { problema: "Si un rectángulo mide 5 cm de largo y 3 cm de ancho, ¿cuál es su perímetro?", opciones: ["13 cm", "15 cm", "16 cm", "18 cm"], respuesta: 2 },
        { problema: "¿Cuántos grados tiene un ángulo recto?", opciones: ["45°", "60°", "90°", "180°"], respuesta: 2 }
    ],
    problemas: [
        { problema: "María tiene 15 caramelos y le regala 6 a su hermano. ¿Cuántos le quedan?", opciones: ["7", "8", "9", "10"], respuesta: 2 },
        { problema: "Un libro cuesta S/. 25 y un cuaderno S/. 8. ¿Cuánto pagas por ambos?", opciones: ["S/. 30", "S/. 32", "S/. 33", "S/. 35"], respuesta: 2 },
        { problema: "Juan tiene 3 cajas con 12 lápices cada una. ¿Cuántos lápices tiene en total?", opciones: ["30", "33", "36", "39"], respuesta: 2 },
        { problema: "Si 4 amigos comparten 20 galletas en partes iguales, ¿cuántas recibe cada uno?", opciones: ["4", "5", "6", "7"], respuesta: 1 }
    ]
};

const dictados = [
    {
        id: 1,
        texto: "El perro corre feliz por el parque",
        nivel: "fácil"
    },
    {
        id: 2,
        texto: "Los niños juegan en la escuela durante el recreo",
        nivel: "fácil"
    },
    {
        id: 3,
        texto: "La mariposa vuela entre las flores del jardín",
        nivel: "medio"
    },
    {
        id: 4,
        texto: "Mi familia y yo vamos a la playa todos los veranos",
        nivel: "medio"
    },
    {
        id: 5,
        texto: "El científico observa las estrellas con su telescopio",
        nivel: "medio"
    },
    {
        id: 6,
        texto: "La biblioteca es un lugar donde podemos aprender muchas cosas",
        nivel: "difícil"
    },
    {
        id: 7,
        texto: "Los deportistas entrenan todos los días para mejorar su rendimiento",
        nivel: "difícil"
    },
    {
        id: 8,
        texto: "La tecnología ha revolucionado la manera en que nos comunicamos",
        nivel: "difícil"
    }
];

const insignias = [
    { id: 1, nombre: "Primera Lectura", descripcion: "Completaste tu primera lectura", icono: "📖", requerido: 1 },
    { id: 2, nombre: "Lector Avanzado", descripcion: "Completaste 3 lecturas", icono: "📚", requerido: 3 },
    { id: 3, nombre: "Maestro de Lecturas", descripcion: "Completaste todas las lecturas", icono: "🏆", requerido: 6 },
    { id: 4, nombre: "Experto en Palabras", descripcion: "Completaste 10 ejercicios de razonamiento verbal", icono: "💭", requerido: 10 },
    { id: 5, nombre: "Matemático Novato", descripcion: "Resolviste 5 problemas matemáticos", icono: "🔢", requerido: 5 },
    { id: 6, nombre: "Genio Matemático", descripcion: "Resolviste 20 problemas matemáticos", icono: "🧮", requerido: 20 },
    { id: 7, nombre: "Primer Dictado", descripcion: "Completaste tu primer dictado", icono: "✍️", requerido: 1 },
    { id: 8, nombre: "Escritor Experto", descripcion: "Completaste 5 dictados", icono: "📝", requerido: 5 },
    { id: 9, nombre: "Estrella Ascendente", descripcion: "Alcanzaste 100 puntos", icono: "⭐", requerido: 100 },
    { id: 10, nombre: "Super Estudiante", descripcion: "Alcanzaste 500 puntos", icono: "🌟", requerido: 500 },
    { id: 11, nombre: "Campeón del Conocimiento", descripcion: "Alcanzaste 1000 puntos", icono: "🏅", requerido: 1000 },
    { id: 12, nombre: "Leyenda", descripcion: "Completaste toda la aplicación", icono: "👑", requerido: 999 }
];
