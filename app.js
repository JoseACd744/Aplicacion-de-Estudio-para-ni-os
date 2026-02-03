// App.js - Lógica principal de la aplicación educativa

// Variables globales
let estadisticas = {
    puntos: 0,
    lecturasCompletadas: 0,
    ejerciciosVerbalesCompletados: 0,
    problemasMatematicosCompletados: 0,
    dictadosCompletados: 0,
    insigniasObtenidas: [],
    historialLecturas: [],
    historialVerbal: [],
    historialMatematicas: [],
    historialDictados: []
};

let pantallaActual = 'menu';
let lecturaActual = null;
let ejercicioActual = null;
let dictadoActual = null;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarEstadisticas();
    mostrarPantalla('menu');
    actualizarEstadisticas();
    
    // Event listeners
    document.getElementById('btn-lecturas').addEventListener('click', () => mostrarListaLecturas());
    document.getElementById('btn-verbal').addEventListener('click', () => mostrarMenuVerbal());
    document.getElementById('btn-matematicas').addEventListener('click', () => mostrarMenuMatematicas());
    document.getElementById('btn-dictado').addEventListener('click', () => mostrarListaDictados());
    document.getElementById('btn-insignias').addEventListener('click', () => mostrarInsignias());
    document.getElementById('btn-estadisticas').addEventListener('click', () => mostrarEstadisticas());
    
    // Botones de navegación
    document.querySelectorAll('.btn-volver').forEach(btn => {
        btn.addEventListener('click', () => mostrarPantalla('menu'));
    });
    
    // Registro del Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
});

// Sistema de navegación
function mostrarPantalla(pantalla) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    const pantallaElement = document.getElementById(`pantalla-${pantalla}`);
    if (pantallaElement) {
        pantallaElement.classList.add('activa');
        pantallaActual = pantalla;
    }
}

// Funciones de Lecturas
function mostrarListaLecturas() {
    const container = document.getElementById('lista-lecturas');
    container.innerHTML = '';
    
    lecturas.forEach(lectura => {
        const completada = estadisticas.historialLecturas.includes(lectura.id);
        const card = document.createElement('div');
        card.className = 'lectura-card';
        card.innerHTML = `
            <h3>${lectura.titulo} ${completada ? '✓' : ''}</h3>
            <button onclick="iniciarLectura(${lectura.id})">Leer</button>
        `;
        container.appendChild(card);
    });
    
    mostrarPantalla('lecturas');
}

function iniciarLectura(id) {
    lecturaActual = lecturas.find(l => l.id === id);
    const container = document.getElementById('contenido-lectura');
    
    container.innerHTML = `
        <h2>${lecturaActual.titulo}</h2>
        <p class="texto-lectura">${lecturaActual.texto}</p>
        <div id="preguntas-lectura"></div>
    `;
    
    mostrarPreguntasLectura();
    mostrarPantalla('lectura-detalle');
}

function mostrarPreguntasLectura() {
    const container = document.getElementById('preguntas-lectura');
    container.innerHTML = '<h3>Preguntas de Comprensión</h3>';
    
    lecturaActual.preguntas.forEach((pregunta, index) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.className = 'pregunta';
        preguntaDiv.innerHTML = `
            <p><strong>${index + 1}. ${pregunta.pregunta}</strong></p>
            ${pregunta.opciones.map((opcion, i) => `
                <button class="opcion" onclick="verificarRespuestaLectura(${index}, ${i})">${opcion}</button>
            `).join('')}
            <div id="resultado-${index}" class="resultado"></div>
        `;
        container.appendChild(preguntaDiv);
    });
}

function verificarRespuestaLectura(indicePregunta, respuestaSeleccionada) {
    const pregunta = lecturaActual.preguntas[indicePregunta];
    const resultadoDiv = document.getElementById(`resultado-${indicePregunta}`);
    
    if (respuestaSeleccionada === pregunta.respuesta) {
        resultadoDiv.innerHTML = '<span style="color: green;">✓ ¡Correcto! +10 puntos</span>';
        estadisticas.puntos += 10;
    } else {
        resultadoDiv.innerHTML = `<span style="color: red;">✗ Incorrecto. La respuesta correcta es: ${pregunta.opciones[pregunta.respuesta]}</span>`;
    }
    
    // Deshabilitar botones de esta pregunta
    const preguntaDiv = resultadoDiv.parentElement;
    preguntaDiv.querySelectorAll('.opcion').forEach(btn => btn.disabled = true);
    
    // Verificar si completó todas las preguntas
    if (indicePregunta === lecturaActual.preguntas.length - 1) {
        setTimeout(() => {
            if (!estadisticas.historialLecturas.includes(lecturaActual.id)) {
                estadisticas.lecturasCompletadas++;
                estadisticas.historialLecturas.push(lecturaActual.id);
            }
            verificarInsignias();
            guardarEstadisticas();
            actualizarEstadisticas();
        }, 1000);
    }
}

// Funciones de Razonamiento Verbal
function mostrarMenuVerbal() {
    mostrarPantalla('menu-verbal');
}

function iniciarEjercicio(tipo) {
    let ejercicios;
    let titulo;
    
    switch(tipo) {
        case 'sinonimos':
            ejercicios = razonamientoVerbal.sinonimos;
            titulo = 'Sinónimos';
            break;
        case 'antonimos':
            ejercicios = razonamientoVerbal.antonimos;
            titulo = 'Antónimos';
            break;
        case 'analogias':
            ejercicios = razonamientoVerbal.analogias;
            titulo = 'Analogías';
            break;
        case 'oraciones':
            ejercicios = razonamientoVerbal.oraciones;
            titulo = 'Completar Oraciones';
            break;
    }
    
    ejercicioActual = {
        tipo: tipo,
        ejercicios: ejercicios,
        indiceActual: 0,
        respuestasCorrectas: 0
    };
    
    mostrarEjercicioVerbal(titulo);
}

function mostrarEjercicioVerbal(titulo) {
    const container = document.getElementById('contenido-verbal');
    const ejercicio = ejercicioActual.ejercicios[ejercicioActual.indiceActual];
    
    container.innerHTML = `
        <h2>${titulo}</h2>
        <p>Pregunta ${ejercicioActual.indiceActual + 1} de ${ejercicioActual.ejercicios.length}</p>
        <div class="ejercicio-verbal">
            <h3>${ejercicio.palabra || ejercicio.pregunta || ejercicio.texto}</h3>
            <div class="opciones-verbal">
                ${ejercicio.opciones.map((opcion, i) => `
                    <button class="opcion" onclick="verificarRespuestaVerbal(${i})">${opcion}</button>
                `).join('')}
            </div>
            <div id="resultado-verbal" class="resultado"></div>
        </div>
    `;
    
    mostrarPantalla('ejercicio-verbal');
}

function verificarRespuestaVerbal(respuestaSeleccionada) {
    const ejercicio = ejercicioActual.ejercicios[ejercicioActual.indiceActual];
    const resultadoDiv = document.getElementById('resultado-verbal');
    
    if (respuestaSeleccionada === ejercicio.respuesta) {
        resultadoDiv.innerHTML = '<span style="color: green;">✓ ¡Correcto! +5 puntos</span>';
        estadisticas.puntos += 5;
        ejercicioActual.respuestasCorrectas++;
    } else {
        resultadoDiv.innerHTML = `<span style="color: red;">✗ Incorrecto. La respuesta correcta es: ${ejercicio.opciones[ejercicio.respuesta]}</span>`;
    }
    
    // Deshabilitar botones
    document.querySelectorAll('.opciones-verbal .opcion').forEach(btn => btn.disabled = true);
    
    // Mostrar botón siguiente
    if (ejercicioActual.indiceActual < ejercicioActual.ejercicios.length - 1) {
        resultadoDiv.innerHTML += '<br><button onclick="siguienteEjercicioVerbal()">Siguiente</button>';
    } else {
        resultadoDiv.innerHTML += '<br><button onclick="finalizarEjercicioVerbal()">Finalizar</button>';
    }
}

function siguienteEjercicioVerbal() {
    ejercicioActual.indiceActual++;
    mostrarEjercicioVerbal(ejercicioActual.tipo);
}

function finalizarEjercicioVerbal() {
    estadisticas.ejerciciosVerbalesCompletados++;
    estadisticas.historialVerbal.push({
        tipo: ejercicioActual.tipo,
        correctas: ejercicioActual.respuestasCorrectas,
        total: ejercicioActual.ejercicios.length
    });
    
    alert(`¡Ejercicio completado!\nRespuestas correctas: ${ejercicioActual.respuestasCorrectas}/${ejercicioActual.ejercicios.length}`);
    
    verificarInsignias();
    guardarEstadisticas();
    actualizarEstadisticas();
    mostrarPantalla('menu-verbal');
}

// Funciones de Matemáticas
function mostrarMenuMatematicas() {
    mostrarPantalla('menu-matematicas');
}

function iniciarMatematicas(categoria) {
    let problemas;
    let titulo;
    
    switch(categoria) {
        case 'aritmetica':
            problemas = matematicas.aritmetica;
            titulo = 'Aritmética';
            break;
        case 'fracciones':
            problemas = matematicas.fracciones;
            titulo = 'Fracciones';
            break;
        case 'geometria':
            problemas = matematicas.geometria;
            titulo = 'Geometría';
            break;
        case 'problemas':
            problemas = matematicas.problemas;
            titulo = 'Problemas';
            break;
    }
    
    ejercicioActual = {
        tipo: categoria,
        ejercicios: problemas,
        indiceActual: 0,
        respuestasCorrectas: 0
    };
    
    mostrarProblemaMatematico(titulo);
}

function mostrarProblemaMatematico(titulo) {
    const container = document.getElementById('contenido-matematicas');
    const problema = ejercicioActual.ejercicios[ejercicioActual.indiceActual];
    
    container.innerHTML = `
        <h2>${titulo}</h2>
        <p>Problema ${ejercicioActual.indiceActual + 1} de ${ejercicioActual.ejercicios.length}</p>
        <div class="problema-matematico">
            <h3>${problema.problema}</h3>
            <div class="opciones-matematicas">
                ${problema.opciones.map((opcion, i) => `
                    <button class="opcion" onclick="verificarRespuestaMatematicas(${i})">${opcion}</button>
                `).join('')}
            </div>
            <div id="resultado-matematicas" class="resultado"></div>
        </div>
    `;
    
    mostrarPantalla('ejercicio-matematicas');
}

function verificarRespuestaMatematicas(respuestaSeleccionada) {
    const problema = ejercicioActual.ejercicios[ejercicioActual.indiceActual];
    const resultadoDiv = document.getElementById('resultado-matematicas');
    
    if (respuestaSeleccionada === problema.respuesta) {
        resultadoDiv.innerHTML = '<span style="color: green;">✓ ¡Correcto! +8 puntos</span>';
        estadisticas.puntos += 8;
        ejercicioActual.respuestasCorrectas++;
    } else {
        resultadoDiv.innerHTML = `<span style="color: red;">✗ Incorrecto. La respuesta correcta es: ${problema.opciones[problema.respuesta]}</span>`;
    }
    
    // Deshabilitar botones
    document.querySelectorAll('.opciones-matematicas .opcion').forEach(btn => btn.disabled = true);
    
    // Mostrar botón siguiente
    if (ejercicioActual.indiceActual < ejercicioActual.ejercicios.length - 1) {
        resultadoDiv.innerHTML += '<br><button onclick="siguienteProblemaMatematico()">Siguiente</button>';
    } else {
        resultadoDiv.innerHTML += '<br><button onclick="finalizarMatematicas()">Finalizar</button>';
    }
}

function siguienteProblemaMatematico() {
    ejercicioActual.indiceActual++;
    mostrarProblemaMatematico(ejercicioActual.tipo);
}

function finalizarMatematicas() {
    estadisticas.problemasMatematicosCompletados += ejercicioActual.ejercicios.length;
    estadisticas.historialMatematicas.push({
        tipo: ejercicioActual.tipo,
        correctas: ejercicioActual.respuestasCorrectas,
        total: ejercicioActual.ejercicios.length
    });
    
    alert(`¡Ejercicio completado!\nRespuestas correctas: ${ejercicioActual.respuestasCorrectas}/${ejercicioActual.ejercicios.length}`);
    
    verificarInsignias();
    guardarEstadisticas();
    actualizarEstadisticas();
    mostrarPantalla('menu-matematicas');
}

// Funciones de Dictado
function mostrarListaDictados() {
    const container = document.getElementById('lista-dictados');
    container.innerHTML = '';
    
    dictados.forEach(dictado => {
        const completado = estadisticas.historialDictados.some(d => d.id === dictado.id);
        const card = document.createElement('div');
        card.className = 'dictado-card';
        card.innerHTML = `
            <h3>Dictado ${dictado.id} ${completado ? '✓' : ''}</h3>
            <p>Nivel: ${dictado.nivel}</p>
            <button onclick="iniciarDictado(${dictado.id})">Comenzar</button>
        `;
        container.appendChild(card);
    });
    
    mostrarPantalla('dictados');
}

function iniciarDictado(id) {
    dictadoActual = dictados.find(d => d.id === id);
    
    const container = document.getElementById('contenido-dictado');
    container.innerHTML = `
        <h2>Dictado ${dictadoActual.id}</h2>
        <p>Nivel: ${dictadoActual.nivel}</p>
        <button id="btn-reproducir" onclick="reproducirDictado()">🔊 Escuchar Dictado</button>
        <textarea id="respuesta-dictado" placeholder="Escribe aquí lo que escuchaste..." rows="5"></textarea>
        <button onclick="verificarDictado()">Verificar</button>
        <div id="resultado-dictado" class="resultado"></div>
    `;
    
    mostrarPantalla('dictado-detalle');
}

function reproducirDictado() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(dictadoActual.texto);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert('Tu navegador no soporta síntesis de voz. El texto es: ' + dictadoActual.texto);
    }
}

function verificarDictado() {
    const respuesta = document.getElementById('respuesta-dictado').value.trim().toLowerCase();
    const textoOriginal = dictadoActual.texto.toLowerCase();
    const resultadoDiv = document.getElementById('resultado-dictado');
    
    // Calcular similitud simple
    const similitud = calcularSimilitud(respuesta, textoOriginal);
    
    if (similitud > 0.8) {
        resultadoDiv.innerHTML = '<span style="color: green;">✓ ¡Excelente! +15 puntos</span>';
        estadisticas.puntos += 15;
        estadisticas.dictadosCompletados++;
        estadisticas.historialDictados.push({
            id: dictadoActual.id,
            similitud: similitud
        });
    } else if (similitud > 0.5) {
        resultadoDiv.innerHTML = '<span style="color: orange;">⚠ Bien, pero puedes mejorar. +7 puntos</span>';
        estadisticas.puntos += 7;
        estadisticas.dictadosCompletados++;
        estadisticas.historialDictados.push({
            id: dictadoActual.id,
            similitud: similitud
        });
    } else {
        resultadoDiv.innerHTML = '<span style="color: red;">✗ Intenta de nuevo</span>';
    }
    
    resultadoDiv.innerHTML += `<br><p>Texto original: <strong>"${dictadoActual.texto}"</strong></p>`;
    resultadoDiv.innerHTML += '<br><button onclick="mostrarListaDictados()">Volver a Dictados</button>';
    
    verificarInsignias();
    guardarEstadisticas();
    actualizarEstadisticas();
}

function calcularSimilitud(texto1, texto2) {
    const palabras1 = texto1.split(' ');
    const palabras2 = texto2.split(' ');
    let coincidencias = 0;
    
    palabras1.forEach(palabra => {
        if (palabras2.includes(palabra)) {
            coincidencias++;
        }
    });
    
    return coincidencias / Math.max(palabras1.length, palabras2.length);
}

// Funciones de Insignias
function mostrarInsignias() {
    const container = document.getElementById('lista-insignias');
    container.innerHTML = '';
    
    insignias.forEach(insignia => {
        const obtenida = estadisticas.insigniasObtenidas.includes(insignia.id);
        const card = document.createElement('div');
        card.className = `insignia-card ${obtenida ? 'obtenida' : ''}`;
        card.innerHTML = `
            <div class="insignia-icono">${insignia.icono}</div>
            <h3>${insignia.nombre}</h3>
            <p>${insignia.descripcion}</p>
            ${obtenida ? '<span style="color: green;">✓ Obtenida</span>' : '<span style="color: gray;">Bloqueada</span>'}
        `;
        container.appendChild(card);
    });
    
    mostrarPantalla('insignias');
}

function verificarInsignias() {
    insignias.forEach(insignia => {
        if (!estadisticas.insigniasObtenidas.includes(insignia.id)) {
            let cumpleRequisito = false;
            
            switch(insignia.id) {
                case 1:
                    cumpleRequisito = estadisticas.lecturasCompletadas >= 1;
                    break;
                case 2:
                    cumpleRequisito = estadisticas.lecturasCompletadas >= 3;
                    break;
                case 3:
                    cumpleRequisito = estadisticas.lecturasCompletadas >= 6;
                    break;
                case 4:
                    cumpleRequisito = estadisticas.ejerciciosVerbalesCompletados >= 10;
                    break;
                case 5:
                    cumpleRequisito = estadisticas.problemasMatematicosCompletados >= 5;
                    break;
                case 6:
                    cumpleRequisito = estadisticas.problemasMatematicosCompletados >= 20;
                    break;
                case 7:
                    cumpleRequisito = estadisticas.dictadosCompletados >= 1;
                    break;
                case 8:
                    cumpleRequisito = estadisticas.dictadosCompletados >= 5;
                    break;
                case 9:
                    cumpleRequisito = estadisticas.puntos >= 100;
                    break;
                case 10:
                    cumpleRequisito = estadisticas.puntos >= 500;
                    break;
                case 11:
                    cumpleRequisito = estadisticas.puntos >= 1000;
                    break;
                case 12:
                    cumpleRequisito = estadisticas.lecturasCompletadas >= 6 &&
                                     estadisticas.ejerciciosVerbalesCompletados >= 10 &&
                                     estadisticas.problemasMatematicosCompletados >= 20 &&
                                     estadisticas.dictadosCompletados >= 8;
                    break;
            }
            
            if (cumpleRequisito) {
                estadisticas.insigniasObtenidas.push(insignia.id);
                mostrarNotificacionInsignia(insignia);
            }
        }
    });
}

function mostrarNotificacionInsignia(insignia) {
    alert(`🎉 ¡Nueva insignia desbloqueada!\n\n${insignia.icono} ${insignia.nombre}\n${insignia.descripcion}`);
}

// Funciones de Estadísticas
function mostrarEstadisticas() {
    const container = document.getElementById('contenido-estadisticas');
    
    container.innerHTML = `
        <h2>Mis Estadísticas</h2>
        <div class="estadistica-item">
            <span>Puntos Totales:</span>
            <strong>${estadisticas.puntos}</strong>
        </div>
        <div class="estadistica-item">
            <span>Lecturas Completadas:</span>
            <strong>${estadisticas.lecturasCompletadas} / 6</strong>
        </div>
        <div class="estadistica-item">
            <span>Ejercicios Verbales:</span>
            <strong>${estadisticas.ejerciciosVerbalesCompletados}</strong>
        </div>
        <div class="estadistica-item">
            <span>Problemas Matemáticos:</span>
            <strong>${estadisticas.problemasMatematicosCompletados}</strong>
        </div>
        <div class="estadistica-item">
            <span>Dictados Completados:</span>
            <strong>${estadisticas.dictadosCompletados} / 8</strong>
        </div>
        <div class="estadistica-item">
            <span>Insignias Obtenidas:</span>
            <strong>${estadisticas.insigniasObtenidas.length} / 12</strong>
        </div>
        <button onclick="reiniciarProgreso()" style="margin-top: 20px; background: #e74c3c;">Reiniciar Progreso</button>
    `;
    
    mostrarPantalla('estadisticas-detalle');
}

function actualizarEstadisticas() {
    const puntosElement = document.getElementById('puntos-totales');
    if (puntosElement) {
        puntosElement.textContent = estadisticas.puntos;
    }
}

// Funciones de Almacenamiento
function guardarEstadisticas() {
    localStorage.setItem('estadisticas', JSON.stringify(estadisticas));
}

function cargarEstadisticas() {
    const datos = localStorage.getItem('estadisticas');
    if (datos) {
        estadisticas = JSON.parse(datos);
    }
}

function reiniciarProgreso() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
        estadisticas = {
            puntos: 0,
            lecturasCompletadas: 0,
            ejerciciosVerbalesCompletados: 0,
            problemasMatematicosCompletados: 0,
            dictadosCompletados: 0,
            insigniasObtenidas: [],
            historialLecturas: [],
            historialVerbal: [],
            historialMatematicas: [],
            historialDictados: []
        };
        guardarEstadisticas();
        actualizarEstadisticas();
        alert('Progreso reiniciado correctamente');
        mostrarPantalla('menu');
    }
}
