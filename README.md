# 📚 Mi Lectura - App Educativa para 6to de Primaria

Aplicación web móvil diseñada para ayudar a estudiantes de sexto grado de primaria en Perú a practicar comprensión lectora, razonamiento verbal y dictados.

## 🌐 Demo en Vivo
[Ver aplicación en vivo](#) <!-- Actualiza este enlace después de publicar -->

## 🚀 Publicar en GitHub Pages

### Paso 1: Crear repositorio en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión
2. Clic en el botón **"New"** (verde) para crear un nuevo repositorio
3. Nombre sugerido: `lectura-6to-primaria`
4. Marca como **público**
5. Clic en **"Create repository"**

### Paso 2: Subir archivos
Desde tu computadora, abre PowerShell/Terminal en esta carpeta y ejecuta:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Primera versión de Mi Lectura"

# Conectar con tu repositorio (reemplaza TU-USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/lectura-6to-primaria.git

# Subir archivos
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. En tu repositorio de GitHub, ve a **Settings** (Configuración)
2. En el menú lateral, busca **Pages**
3. En **"Source"**, selecciona: **main** branch y carpeta **/ (root)**
4. Clic en **"Save"**
5. ¡Espera 1-2 minutos!
6. Tu app estará en: `https://TU-USUARIO.github.io/lectura-6to-primaria/`

### 📱 Compartir con tu sobrino
Una vez publicada, solo envíale el enlace:
- `https://TU-USUARIO.github.io/lectura-6to-primaria/`
- Puede abrir el enlace y agregar la app a su pantalla de inicio
- **No necesita instalar nada**, funciona directo en el navegador

## 🔄 Actualizar Contenido

### Método 1: Desde tu computadora
```bash
# 1. Edita los archivos (especialmente data.js)
# 2. Guarda los cambios
# 3. En PowerShell/Terminal:

git add .
git commit -m "Agregué nuevas lecturas"
git push

# Los cambios aparecerán en 1-2 minutos en el enlace
```

### Método 2: Desde GitHub (más fácil)
1. Ve a tu repositorio en GitHub
2. Busca el archivo `data.js`
3. Clic en el ícono del lápiz (editar)
4. Agrega o modifica el contenido
5. Clic en **"Commit changes"** abajo
6. ¡Listo! Los cambios se actualizarán automáticamente

**💡 Tip**: La forma más fácil de agregar contenido es editando `data.js` directamente desde GitHub.

## 🎯 Características

### 📖 Comprensión Lectora
- Textos adaptados al nivel de 6to de primaria
- Preguntas de opción múltiple
- Retroalimentación inmediata
- Temas relacionados con la cultura peruana

### 🧠 Razonamiento Verbal
- **Sinónimos**: Encuentra palabras con significado similar
- **Antónimos**: Identifica palabras opuestas
- **Analogías**: Completa relaciones lógicas
- **Completar Oraciones**: Elige la palabra correcta

### ✍️ Dictados
- Utiliza síntesis de voz del navegador
- Verificación automática de ortografía
- Diferentes niveles de dificultad

### 📊 Seguimiento de Progreso
- Estadísticas de actividades completadas
- Promedio de respuestas correctas
- Guardado automático del progreso

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente
1. Abre el archivo `index.html` en un navegador web moderno (Chrome, Edge, Safari)
2. ¡Listo para usar!

### Opción 2: Como PWA (Progressive Web App)
1. Abre la aplicación en Chrome o Edge en tu celular
2. Ve al menú del navegador (⋮)
3. Selecciona "Instalar aplicación" o "Agregar a pantalla de inicio"
4. La app se instalará como una aplicación nativa

### Opción 3: Servidor Local
Para mejor experiencia, especialmente con PWA:

```bash
# Si tienes Python instalado:
python -m http.server 8000

# Si tienes Node.js con npx:
npx serve

# Luego abre en tu navegador:
# http://localhost:8000
```

## 📱 Compatibilidad

- ✅ Chrome (PC/Android)
- ✅ Edge (PC/Android)
- ✅ Safari (iOS/Mac)
- ✅ Firefox (PC/Android)

**Nota**: La función de dictados requiere navegadores que soporten síntesis de voz (Chrome, Edge, Safari).

## 🎨 Cómo Personalizar

### Agregar Nuevas Lecturas
Edita el archivo `data.js` y agrega objetos al array `lecturas`:

```javascript
{
    id: 4,
    titulo: "Título de tu lectura",
    texto: `Contenido de la lectura...`,
    preguntas: [
        {
            pregunta: "¿Tu pregunta?",
            opciones: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            correcta: 0 // Índice de la respuesta correcta (0-3)
        }
    ]
}
```

### Agregar Ejercicios de Razonamiento
En `data.js`, en la sección `razonamiento`:

```javascript
// Para sinónimos o antónimos:
{ 
    palabra: "PALABRA", 
    opciones: ["op1", "op2", "op3", "op4"], 
    correcta: 1 
}

// Para analogías:
{
    pregunta: "A es a B como C es a:",
    opciones: ["op1", "op2", "op3", "op4"],
    correcta: 1
}
```

### Agregar Dictados
```javascript
{
    id: 6,
    texto: "Texto del dictado a leer",
    audio: "dictado6"
}
```

### Cambiar Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #4A90E2;  /* Color principal */
    --secondary-color: #50C878; /* Color secundario */
    /* ... más colores */
}
```

## 📂 Estructura de Archivos

```
fabian/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño responsive
├── app.js              # Lógica de la aplicación
├── data.js             # Contenido educativo (fácil de editar)
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker para PWA
└── README.md          # Este archivo
```

## 🔄 Actualizar Contenido

1. **Editar Contenido**: Modifica `data.js` con el nuevo contenido
2. **Probar**: Abre la app y verifica que funcione correctamente
3. **Actualizar PWA**: Si la app está instalada como PWA:
   - Cambia `CACHE_NAME` en `sw.js` (ej: `'mi-lectura-v2'`)
   - La próxima vez que se abra, se actualizará automáticamente

## 💡 Consejos de Uso

- **Para tu sobrino**: Crea un acceso directo en la pantalla de inicio del celular
- **Práctica diaria**: Establece una meta (ej: 1 lectura + 5 ejercicios al día)
- **Sin internet**: Una vez instalada como PWA, funciona offline
- **Progreso**: Se guarda automáticamente en el navegador

## 🛠️ Requisitos Técnicos

- Navegador web moderno
- JavaScript habilitado
- Para dictados: Navegador con soporte de Web Speech API

## 📝 Licencia

Este proyecto es de código abierto y puede ser modificado libremente para uso educativo.

## 🤝 Contribuir

¿Tienes ideas para mejorar la app? ¡Adelante! Modifica el código según tus necesidades.

## ❓ Soporte

Si tienes problemas:
1. Asegúrate de usar un navegador actualizado
2. Verifica que JavaScript esté habilitado
3. Para PWA, asegúrate de que la app esté servida desde HTTPS o localhost

---

Hecho con ❤️ para estudiantes de 6to de primaria del Perú
