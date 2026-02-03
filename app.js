// Variables globales
let lecturaActual = 0;
let dictadoActual = 0;
let actividadActual = null;
let ejercicioActual = 0;
let respuestasUsuario = {};
let matematicasTipo = null;

// Estadísticas
let estadisticas = {
    lecturasCompletadas: 0,
    razonamientoCompletado: 0,
    dictadosRealizados: 0,
    matematicasCompletadas: 0,
    totalCorrectas: 0,
    totalPreguntas: 0,
    puntosTotales: 0,
    insigniasObtenidas: []
};

// Cargar estadísticas guardadas
function cargarEstadisticas() {
    const stats = localStorage.getItem('estadisticas');
    if (stats) {
        estadisticas = JSON.parse(stats);
        actualizarPantallaProgreso();
    }
}

// Guardar estadísticas
function guardarEstadisticas() {
    localStorage.setItem('estadisticas', JSON.stringify(estadisticas));
    actualizarPantallaProgreso();
}

// Navegación entre pantallas
function showScreen(screenId, addToHistory = true) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Agregar al historial del navegador
    if (addToHistory) {
        history.pushState({ screen: screenId }, '', '#' + screenId);
    }
    
    // Inicializar contenido según la pantalla
    if (screenId === 'lectura-screen') {
        cargarLectura();
    } else if (screenId === 'dictado-screen') {
        inicializarDictado();
    } else if (screenId === 'progreso-screen') {
        actualizarPantallaProgreso();
    }
}

// ==================== COMPRENSIÓN LECTORA ====================

function cargarLectura() {
    const lectura = contenidoEducativo.lecturas[lecturaActual];
    respuestasUsuario = {};
    
    // Mostrar texto
    const textoDiv = document.getElementById('lectura-texto');
    textoDiv.innerHTML = `
        <h3>${lectura.titulo}</h3>
        <p>${lectura.texto.replace(/\n\n/g, '</p><p>')}</p>
    `;
    
    // Mostrar preguntas
    const preguntasDiv = document.getElementById('lectura-preguntas');
    preguntasDiv.innerHTML = '';
    
    lectura.preguntas.forEach((pregunta, index) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.className = 'pregunta';
        preguntaDiv.innerHTML = `
            <h4>${index + 1}. ${pregunta.pregunta}</h4>
            <div class="opciones">
                ${pregunta.opciones.map((opcion, i) => `
                    <label class="opcion">
                        <input type="radio" name="pregunta${index}" value="${i}">
                        <span>${opcion}</span>
                    </label>
                `).join('')}
            </div>
        `;
        preguntasDiv.appendChild(preguntaDiv);
    });
    
    // Mostrar botón verificar
    document.getElementById('btn-verificar-lectura').style.display = 'block';
    document.getElementById('lectura-resultado').style.display = 'none';
    document.getElementById('btn-siguiente-lectura').style.display = 'none';
    
    // Event listener para verificar
    document.getElementById('btn-verificar-lectura').onclick = verificarLectura;
}

function verificarLectura() {
    const lectura = contenidoEducativo.lecturas[lecturaActual];
    let correctas = 0;
    
    lectura.preguntas.forEach((pregunta, index) => {
        const seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (!seleccionada) return;
        
        const valorSeleccionado = parseInt(seleccionada.value);
        const opcionDiv = seleccionada.closest('.opcion');
        
        if (valorSeleccionado === pregunta.correcta) {
            opcionDiv.classList.add('correcta');
            correctas++;
        } else {
            opcionDiv.classList.add('incorrecta');
            // Marcar la correcta
            const opciones = document.querySelectorAll(`input[name="pregunta${index}"]`);
            opciones[pregunta.correcta].closest('.opcion').classList.add('correcta');
        }
    });
    
    // Actualizar estadísticas
    estadisticas.totalCorrectas += correctas;
    estadisticas.totalPreguntas += lectura.preguntas.length;
    
    // Mostrar resultado
    const resultadoDiv = document.getElementById('lectura-resultado');
    const porcentaje = (correctas / lectura.preguntas.length * 100).toFixed(0);
    
    resultadoDiv.className = 'resultado';
    if (porcentaje >= 75) {
        resultadoDiv.classList.add('success');
        resultadoDiv.innerHTML = `
            <h3>¡Excelente! 🎉</h3>
            <p>Obtuviste ${correctas} de ${lectura.preguntas.length} respuestas correctas (${porcentaje}%)</p>
        `;
    } else if (porcentaje >= 50) {
        resultadoDiv.classList.add('info');
        resultadoDiv.innerHTML = `
            <h3>¡Bien! 👍</h3>
            <p>Obtuviste ${correctas} de ${lectura.preguntas.length} respuestas correctas (${porcentaje}%)</p>
            <p>¡Sigue practicando!</p>
        `;
    } else {
        resultadoDiv.classList.add('error');
        resultadoDiv.innerHTML = `
            <h3>Necesitas practicar más 📚</h3>
            <p>Obtuviste ${correctas} de ${lectura.preguntas.length} respuestas correctas (${porcentaje}%)</p>
            <p>Lee el texto nuevamente e intenta de nuevo.</p>
        `;
    }
    
    estadisticas.lecturasCompletadas++;
    estadisticas.puntosTotales += (correctas * 10) + (lectura.preguntas.length - correctas) * 2;
    guardarEstadisticas();
    verificarInsignias();
    
    // Ocultar botón verificar y mostrar siguiente
    document.getElementById('btn-verificar-lectura').style.display = 'none';
    document.getElementById('btn-siguiente-lectura').style.display = 'block';
    document.getElementById('btn-siguiente-lectura').onclick = siguienteLectura;
}

function siguienteLectura() {
    lecturaActual = (lecturaActual + 1) % contenidoEducativo.lecturas.length;
    cargarLectura();
}

// ==================== RAZONAMIENTO VERBAL ====================

function iniciarActividad(tipo) {
    actividadActual = tipo;
    ejercicioActual = 0;
    const contenidoDiv = document.getElementById('razonamiento-contenido');
    contenidoDiv.innerHTML = '';
    
    switch(tipo) {
        case 'sinonimos':
            cargarEjercicioSinonimos();
            break;
        case 'antonimos':
            cargarEjercicioAntonimos();
            break;
        case 'analogias':
            cargarEjercicioAnalogias();
            break;
        case 'oraciones':
            cargarEjercicioOraciones();
            break;
    }
}

function cargarEjercicioSinonimos() {
    const ejercicio = contenidoEducativo.razonamiento.sinonimos[ejercicioActual];
    cargarEjercicioRazonamiento('Sinónimos', `Selecciona el SINÓNIMO de: <strong>${ejercicio.palabra}</strong>`, ejercicio);
}

function cargarEjercicioAntonimos() {
    const ejercicio = contenidoEducativo.razonamiento.antonimos[ejercicioActual];
    cargarEjercicioRazonamiento('Antónimos', `Selecciona el ANTÓNIMO de: <strong>${ejercicio.palabra}</strong>`, ejercicio);
}

function cargarEjercicioAnalogias() {
    const ejercicio = contenidoEducativo.razonamiento.analogias[ejercicioActual];
    cargarEjercicioRazonamiento('Analogías', ejercicio.pregunta, ejercicio);
}

function cargarEjercicioOraciones() {
    const ejercicio = contenidoEducativo.razonamiento.oraciones[ejercicioActual];
    cargarEjercicioRazonamiento('Completar Oraciones', ejercicio.texto, ejercicio);
}

function cargarEjercicioRazonamiento(titulo, pregunta, ejercicio) {
    const contenidoDiv = document.getElementById('razonamiento-contenido');
    
    const ejercicioHTML = `
        <div class="ejercicio-razonamiento">
            <h4>${titulo}</h4>
            <p style="font-size: 1.1rem; margin: 20px 0;">${pregunta}</p>
            <div class="opciones">
                ${ejercicio.opciones.map((opcion, i) => `
                    <label class="opcion">
                        <input type="radio" name="ejercicio" value="${i}">
                        <span>${opcion}</span>
                    </label>
                `).join('')}
            </div>
            <button class="btn-primary" onclick="verificarRazonamiento(${ejercicio.correcta})">Verificar</button>
            <div id="resultado-razonamiento" class="resultado"></div>
            <button id="btn-siguiente-razonamiento" class="btn-primary" style="display:none;">Siguiente Ejercicio</button>
        </div>
    `;
    
    contenidoDiv.innerHTML = ejercicioHTML;
}

function verificarRazonamiento(correcta) {
    const seleccionada = document.querySelector('input[name="ejercicio"]:checked');
    if (!seleccionada) {
        alert('Por favor selecciona una opción');
        return;
    }
    
    const valorSeleccionado = parseInt(seleccionada.value);
    const resultadoDiv = document.getElementById('resultado-razonamiento');
    
    // Actualizar estadísticas
    estadisticas.totalPreguntas++;
    
    if (valorSeleccionado === correcta) {
        seleccionada.closest('.opcion').classList.add('correcta');
        resultadoDiv.className = 'resultado success';
        resultadoDiv.innerHTML = '¡Correcto! ✅';
        estadisticas.totalCorrectas++;
        estadisticas.puntosTotales += 10;
    } else {
        seleccionada.closest('.opcion').classList.add('incorrecta');
        const opciones = document.querySelectorAll('input[name="ejercicio"]');
        opciones[correcta].closest('.opcion').classList.add('correcta');
        resultadoDiv.className = 'resultado error';
        resultadoDiv.innerHTML = 'Incorrecto. La respuesta correcta está marcada en verde.';
        estadisticas.puntosTotales += 3;
    }
    
    estadisticas.razonamientoCompletado++;
    guardarEstadisticas();
    verificarInsignias();
    
    // Deshabilitar opciones
    document.querySelectorAll('input[name="ejercicio"]').forEach(input => {
        input.disabled = true;
    });
    
    // Ocultar botón verificar y mostrar botón siguiente
    const btnVerificar = document.querySelector('.ejercicio-razonamiento button.btn-primary');
    if (btnVerificar) {
        btnVerificar.style.display = 'none';
    }
    
    const btnSiguiente = document.getElementById('btn-siguiente-razonamiento');
    if (btnSiguiente) {
        btnSiguiente.style.display = 'block';
        btnSiguiente.onclick = siguienteEjercicioRazonamiento;
    }
}

function siguienteEjercicioRazonamiento() {
    let arrayEjercicios;
    switch(actividadActual) {
        case 'sinonimos':
            arrayEjercicios = contenidoEducativo.razonamiento.sinonimos;
            break;
        case 'antonimos':
            arrayEjercicios = contenidoEducativo.razonamiento.antonimos;
            break;
        case 'analogias':
            arrayEjercicios = contenidoEducativo.razonamiento.analogias;
            break;
        case 'oraciones':
            arrayEjercicios = contenidoEducativo.razonamiento.oraciones;
            break;
    }
    
    ejercicioActual = (ejercicioActual + 1) % arrayEjercicios.length;
    iniciarActividad(actividadActual);
}

// ==================== MATEMÁTICAS ====================

function iniciarMatematicas(tipo) {
    matematicasTipo = tipo;
    ejercicioActual = 0;
    cargarEjercicioMatematicas();
}

function cargarEjercicioMatematicas() {
    const ejercicios = contenidoEducativo.matematicas[matematicasTipo];
    const ejercicio = ejercicios[ejercicioActual];
    const contenidoDiv = document.getElementById('matematicas-contenido');
    
    const tipoNombre = {
        'aritmetica': 'Aritmética',
        'fracciones': 'Fracciones',
        'geometria': 'Geometría',
        'problemas': 'Problemas'
    };
    
    const ejercicioHTML = `
        <div class="ejercicio-razonamiento">
            <h4>${tipoNombre[matematicasTipo]}</h4>
            <p style="font-size: 1.1rem; margin: 20px 0; line-height: 1.6;">${ejercicio.problema}</p>
            <div class="opciones">
                ${ejercicio.opciones.map((opcion, i) => `
                    <label class="opcion">
                        <input type="radio" name="ejercicio-mat" value="${i}">
                        <span>${opcion}</span>
                    </label>
                `).join('')}
            </div>
            <button class="btn-primary" onclick="verificarMatematicas(${ejercicio.correcta})">Verificar</button>
            <div id="resultado-matematicas" class="resultado"></div>
            <button id="btn-siguiente-matematicas" class="btn-primary" style="display:none;">Siguiente Ejercicio</button>
        </div>
    `;
    
    contenidoDiv.innerHTML = ejercicioHTML;
}

function verificarMatematicas(correcta) {
    const seleccionada = document.querySelector('input[name="ejercicio-mat"]:checked');
    if (!seleccionada) {
        alert('Por favor selecciona una opción');
        return;
    }
    
    const valorSeleccionado = parseInt(seleccionada.value);
    const resultadoDiv = document.getElementById('resultado-matematicas');
    const ejercicio = contenidoEducativo.matematicas[matematicasTipo][ejercicioActual];
    
    // Actualizar estadísticas
    estadisticas.totalPreguntas++;
    
    if (valorSeleccionado === correcta) {
        seleccionada.closest('.opcion').classList.add('correcta');
        resultadoDiv.className = 'resultado success';
        resultadoDiv.innerHTML = `
            <h3>¡Correcto! ✅</h3>
            <p>${ejercicio.explicacion}</p>
        `;
        estadisticas.totalCorrectas++;
        estadisticas.puntosTotales += 10;
    } else {
        seleccionada.closest('.opcion').classList.add('incorrecta');
        const opciones = document.querySelectorAll('input[name="ejercicio-mat"]');
        opciones[correcta].closest('.opcion').classList.add('correcta');
        resultadoDiv.className = 'resultado error';
        resultadoDiv.innerHTML = `
            <h3>Incorrecto ❌</h3>
            <p>La respuesta correcta está marcada en verde.</p>
            <p><strong>Explicación:</strong> ${ejercicio.explicacion}</p>
        `;
        estadisticas.puntosTotales += 3;
    }
    
    estadisticas.matematicasCompletadas++;
    guardarEstadisticas();
    verificarInsignias();
    
    // Deshabilitar opciones
    document.querySelectorAll('input[name="ejercicio-mat"]').forEach(input => {
        input.disabled = true;
    });
    
    // Ocultar botón verificar y mostrar botón siguiente
    const btnVerificar = document.querySelector('.ejercicio-razonamiento button.btn-primary');
    if (btnVerificar) {
        btnVerificar.style.display = 'none';
    }
    
    const btnSiguiente = document.getElementById('btn-siguiente-matematicas');
    if (btnSiguiente) {
        btnSiguiente.style.display = 'block';
        btnSiguiente.onclick = siguienteEjercicioMatematicas;
    }
}

function siguienteEjercicioMatematicas() {
    const ejercicios = contenidoEducativo.matematicas[matematicasTipo];
    ejercicioActual = (ejercicioActual + 1) % ejercicios.length;
    cargarEjercicioMatematicas();
}

// ==================== DICTADOS ====================

function inicializarDictado() {
    const dictado = contenidoEducativo.dictados[dictadoActual];
    document.getElementById('dictado-texto').value = '';
    document.getElementById('dictado-resultado').style.display = 'none';
    
    document.getElementById('btn-reproducir-dictado').onclick = reproducirDictado;
    document.getElementById('btn-verificar-dictado').onclick = verificarDictado;
}

function reproducirDictado() {
    const dictado = contenidoEducativo.dictados[dictadoActual];
    
    // Usar síntesis de voz del navegador
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(dictado.texto);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
        
        const btn = document.getElementById('btn-reproducir-dictado');
        btn.innerHTML = '🔊 Reproduciendo...';
        btn.disabled = true;
        
        utterance.onend = function() {
            btn.innerHTML = '▶️ Reproducir Dictado';
            btn.disabled = false;
        };
    } else {
        alert('Tu navegador no soporta síntesis de voz. Por favor usa Chrome, Edge o Safari.');
    }
}

function verificarDictado() {
    const dictado = contenidoEducativo.dictados[dictadoActual];
    const textoUsuario = document.getElementById('dictado-texto').value.trim();
    
    if (!textoUsuario) {
        alert('Por favor escribe el dictado antes de verificar');
        return;
    }
    
    // Normalizar textos
    const textoOriginal = dictado.texto.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    const textoEscrito = textoUsuario.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    
    const palabrasOriginales = textoOriginal.split(' ');
    const palabrasEscritas = textoEscrito.split(' ');
    
    let correctas = 0;
    palabrasOriginales.forEach((palabra, index) => {
        if (palabrasEscritas[index] === palabra) {
            correctas++;
        }
    });
    
    const porcentaje = (correctas / palabrasOriginales.length * 100).toFixed(0);
    const resultadoDiv = document.getElementById('dictado-resultado');
    
    // Actualizar estadísticas
    estadisticas.totalPreguntas++;
    estadisticas.dictadosRealizados++;
    
    let puntos = 0;
    if (porcentaje >= 90) {
        puntos = 20;
        estadisticas.totalCorrectas++;
    } else if (porcentaje >= 70) {
        puntos = 10;
        estadisticas.totalCorrectas += 0.7;
    } else {
        puntos = 5;
    }
    estadisticas.puntosTotales += puntos;
    
    if (porcentaje >= 90) {
        resultadoDiv.className = 'resultado success';
        resultadoDiv.innerHTML = `
            <h3>¡Excelente! 🎉</h3>
            <p>Precisión: ${porcentaje}%</p>
            <p><small>Texto original: "${dictado.texto}"</small></p>
        `;
    } else if (porcentaje >= 70) {
        resultadoDiv.className = 'resultado info';
        resultadoDiv.innerHTML = `
            <h3>¡Bien! 👍</h3>
            <p>Precisión: ${porcentaje}%</p>
            <p>Tienes algunos errores. Revisa la ortografía.</p>
            <p><small>Texto original: "${dictado.texto}"</small></p>
        `;
    } else {
        resultadoDiv.className = 'resultado error';
        resultadoDiv.innerHTML = `
            <h3>Necesitas practicar más 📚</h3>
            <p>Precisión: ${porcentaje}%</p>
            <p>Intenta escuchar con más atención.</p>
            <p><small>Texto original: "${dictado.texto}"</small></p>
        `;
    }
    
    guardarEstadisticas();
    verificarInsignias();
    
    // Mostrar botón para siguiente dictado
    resultadoDiv.style.display = 'block';
    const btnSiguiente = document.createElement('button');
    btnSiguiente.className = 'btn-primary';
    btnSiguiente.textContent = 'Siguiente Dictado';
    btnSiguiente.style.marginTop = '15px';
    btnSiguiente.onclick = () => {
        dictadoActual = (dictadoActual + 1) % contenidoEducativo.dictados.length;
        inicializarDictado();
    };
    
    if (!resultadoDiv.querySelector('.btn-primary')) {
        resultadoDiv.appendChild(btnSiguiente);
    }
}

// ==================== SISTEMA DE INSIGNIAS ====================

function verificarInsignias() {
    const promedio = estadisticas.totalPreguntas > 0 
        ? (estadisticas.totalCorrectas / estadisticas.totalPreguntas * 100)
        : 0;
    
    insignias.forEach(insignia => {
        if (estadisticas.insigniasObtenidas.includes(insignia.id)) return;
        
        let cumpleRequisito = false;
        
        switch(insignia.requisito.tipo) {
            case 'lecturas':
                cumpleRequisito = estadisticas.lecturasCompletadas >= insignia.requisito.cantidad;
                break;
            case 'razonamiento':
                cumpleRequisito = estadisticas.razonamientoCompletado >= insignia.requisito.cantidad;
                break;
            case 'matematicas':
                cumpleRequisito = estadisticas.matematicasCompletadas >= insignia.requisito.cantidad;
                break;
            case 'dictados':
                cumpleRequisito = estadisticas.dictadosRealizados >= insignia.requisito.cantidad;
                break;
            case 'promedio':
                cumpleRequisito = promedio >= insignia.requisito.cantidad;
                break;
            case 'completo':
                cumpleRequisito = estadisticas.lecturasCompletadas >= 1 && 
                                estadisticas.razonamientoCompletado >= 1 && 
                                estadisticas.matematicasCompletadas >= 1 && 
                                estadisticas.dictadosRealizados >= 1;
                break;
        }
        
        if (cumpleRequisito) {
            estadisticas.insigniasObtenidas.push(insignia.id);
            estadisticas.puntosTotales += 50;
            mostrarNotificacionInsignia(insignia);
        }
    });
    
    guardarEstadisticas();
}

function mostrarNotificacionInsignia(insignia) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-insignia';
    notificacion.innerHTML = `
        <div class="insignia-grande">${insignia.icono}</div>
        <h3>¡Nueva Insignia!</h3>
        <p><strong>${insignia.nombre}</strong></p>
        <p>${insignia.descripcion}</p>
        <p class="puntos-ganados">+50 puntos</p>
    `;
    
    document.body.appendChild(notificacion);
    setTimeout(() => notificacion.classList.add('show'), 100);
    
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => notificacion.remove(), 300);
    }, 5000);
}

// ==================== PROGRESO ====================

function actualizarPantallaProgreso() {
    document.getElementById('stat-lecturas').textContent = estadisticas.lecturasCompletadas;
    document.getElementById('stat-razonamiento').textContent = estadisticas.razonamientoCompletado;
    document.getElementById('stat-dictados').textContent = estadisticas.dictadosRealizados;
    document.getElementById('stat-matematicas').textContent = estadisticas.matematicasCompletadas;
    document.getElementById('stat-puntos').textContent = estadisticas.puntosTotales;
    
    const promedio = estadisticas.totalPreguntas > 0 
        ? (estadisticas.totalCorrectas / estadisticas.totalPreguntas * 100).toFixed(0)
        : 0;
    document.getElementById('stat-promedio').textContent = promedio + '%';
    
    mostrarInsignias();
}

function mostrarInsignias() {
    const container = document.getElementById('insignias-container');
    container.innerHTML = '';
    
    insignias.forEach(insignia => {
        const obtenida = estadisticas.insigniasObtenidas.includes(insignia.id);
        const insigniaDiv = document.createElement('div');
        insigniaDiv.className = `insignia ${obtenida ? 'obtenida' : 'bloqueada'}`;
        insigniaDiv.innerHTML = `
            <div class="insignia-icono">${obtenida ? insignia.icono : '🔒'}</div>
            <div class="insignia-nombre">${insignia.nombre}</div>
            <div class="insignia-desc">${insignia.descripcion}</div>
        `;
        container.appendChild(insigniaDiv);
    });
}

function resetearProgreso() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso, puntos e insignias?')) {
        estadisticas = {
            lecturasCompletadas: 0,
            razonamientoCompletado: 0,
            dictadosRealizados: 0,
            matematicasCompletadas: 0,
            totalCorrectas: 0,
            totalPreguntas: 0,
            puntosTotales: 0,
            insigniasObtenidas: []
        };
        guardarEstadisticas();
        alert('Progreso reiniciado');
    }
}

// ==================== INICIALIZACIÓN ====================

window.onload = function() {
    cargarEstadisticas();
    
    // Manejar navegación con botón retroceder
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.screen) {
            showScreen(event.state.screen, false);
        } else {
            // Si no hay estado, volver al inicio
            showScreen('inicio-screen', false);
        }
    });
    
    // Cargar pantalla desde URL si existe hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showScreen(hash, false);
        // Agregar estado inicial
        history.replaceState({ screen: hash }, '', '#' + hash);
    } else {
        // Estado inicial
        history.replaceState({ screen: 'inicio-screen' }, '', '#inicio-screen');
    }
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
};
