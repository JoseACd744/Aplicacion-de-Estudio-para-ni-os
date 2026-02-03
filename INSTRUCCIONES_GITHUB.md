# 🚀 Guía Paso a Paso para Publicar en GitHub Pages

## ✅ Requisitos Previos
- Tener una cuenta en [GitHub](https://github.com) (es gratis)
- Tener Git instalado (si no lo tienes, descárgalo de [git-scm.com](https://git-scm.com/))

---

## 📋 PASO 1: Crear el Repositorio en GitHub

1. **Inicia sesión** en [GitHub.com](https://github.com)

2. **Clic en el botón verde "New"** (esquina superior derecha, junto a tu foto de perfil)

3. **Configura tu repositorio**:
   - **Repository name**: `lectura-6to-primaria` (o el nombre que prefieras)
   - **Description**: "App educativa para práctica de lectura - 6to primaria"
   - Marca como **Public** (público)
   - **NO** marques "Add a README file"
   - **NO** agregues .gitignore ni license por ahora

4. **Clic en "Create repository"**

5. **Guarda la URL** que aparece, será algo como:
   ```
   https://github.com/TU-USUARIO/lectura-6to-primaria.git
   ```

---

## 📤 PASO 2: Subir tu App a GitHub

### Opción A: Usando PowerShell/Terminal (Recomendado)

1. **Abre PowerShell** (Windows) o Terminal (Mac/Linux)

2. **Navega a tu carpeta**:
   ```bash
   cd "C:\Users\JOSE\Desktop\fabian"
   ```

3. **Copia y pega estos comandos uno por uno**:

   ```bash
   # Inicializar Git en tu carpeta
   git init
   
   # Agregar todos los archivos
   git add .
   
   # Crear el primer commit
   git commit -m "Primera versión - App de Lectura"
   
   # Conectar con GitHub (REEMPLAZA TU-USUARIO con tu usuario real)
   git remote add origin https://github.com/TU-USUARIO/lectura-6to-primaria.git
   
   # Subir archivos
   git branch -M main
   git push -u origin main
   ```

4. **Te pedirá tu usuario y contraseña** de GitHub
   - Si pide "personal access token", ve a: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic)
   - Dale permisos de "repo" y úsalo como contraseña

### Opción B: Usando GitHub Desktop (Más Visual)

1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. Instala e inicia sesión
3. File → Add Local Repository → Selecciona tu carpeta `fabian`
4. Clic en "Publish repository"

---

## 🌐 PASO 3: Activar GitHub Pages

1. **Ve a tu repositorio** en GitHub.com

2. **Clic en "Settings"** (Configuración, pestaña en la parte superior)

3. **En el menú lateral izquierdo**, busca y haz clic en **"Pages"**

4. **En la sección "Build and deployment"**:
   - **Source**: Selecciona "Deploy from a branch"
   - **Branch**: Selecciona `main` y carpeta `/ (root)`
   - Clic en **"Save"**

5. **Espera 1-2 minutos** ⏱️

6. **Recarga la página** y verás un mensaje verde que dice:
   ```
   Your site is live at https://TU-USUARIO.github.io/lectura-6to-primaria/
   ```

---

## 📱 PASO 4: Compartir con tu Sobrino

1. **Copia el enlace** que aparece en GitHub Pages:
   ```
   https://TU-USUARIO.github.io/lectura-6to-primaria/
   ```

2. **Envíaselo por WhatsApp** o el medio que prefieras

3. **En su celular**, él debe:
   - Abrir el enlace en Chrome o Edge
   - Tocar el menú (⋮)
   - Seleccionar "Instalar aplicación" o "Agregar a pantalla de inicio"
   - ¡Listo! Ahora tendrá un ícono como una app normal

---

## 🔄 ACTUALIZAR CONTENIDO (MUY FÁCIL)

### Método 1: Desde GitHub (Sin programar) ⭐ RECOMENDADO

1. **Ve a tu repositorio** en GitHub.com

2. **Busca el archivo `data.js`** (clic en él)

3. **Clic en el ícono del lápiz** ✏️ (esquina superior derecha del archivo)

4. **Edita el contenido**: Agrega lecturas, ejercicios, etc.

5. **Scroll hasta abajo**, escribe un mensaje como "Agregué 2 nuevas lecturas"

6. **Clic en "Commit changes"** (botón verde)

7. **¡Listo!** En 1-2 minutos, tu sobrino verá el nuevo contenido al recargar la app

### Método 2: Desde tu Computadora

```bash
# 1. Edita los archivos en VS Code o tu editor
# 2. Guarda los cambios
# 3. En PowerShell/Terminal:

cd "C:\Users\JOSE\Desktop\fabian"
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 📝 EJEMPLOS de Actualización

### Agregar una Nueva Lectura

Edita `data.js`, busca el array `lecturas` y agrega:

```javascript
{
    id: 4,
    titulo: "La Costa Peruana",
    texto: `Tu texto aquí...`,
    preguntas: [
        {
            pregunta: "¿Cuál es el puerto más importante del Perú?",
            opciones: ["Callao", "Paita", "Matarani", "Ilo"],
            correcta: 0
        }
    ]
}
```

### Agregar Más Sinónimos

En `data.js`, busca `sinonimos` y agrega:

```javascript
{ palabra: "FELIZ", opciones: ["Triste", "Alegre", "Enojado", "Aburrido"], correcta: 1 }
```

---

## 🎯 VENTAJAS de GitHub Pages

✅ **Gratis** - Completamente sin costo  
✅ **Fácil de actualizar** - Solo editas y guardas  
✅ **Siempre disponible** - Funciona 24/7  
✅ **Un solo enlace** - No necesitas enviar archivos  
✅ **Se actualiza automáticamente** - Tu sobrino siempre verá la última versión  
✅ **Funciona offline** - Después de la primera visita  

---

## ⚠️ Solución de Problemas

### "Error: Permission denied"
- Necesitas crear un Personal Access Token
- Ve a: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Marca "repo" y úsalo como contraseña

### "La página muestra 404"
- Espera 2-3 minutos después de activar Pages
- Verifica que activaste Pages en la rama `main` y carpeta `/ (root)`

### "Los cambios no se ven"
- Espera 1-2 minutos después de hacer commit
- Haz "hard refresh" en el navegador: Ctrl + Shift + R (o Cmd + Shift + R en Mac)
- En celular: cierra y abre la app

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas, puedes:
1. Revisar [Documentación de GitHub Pages](https://pages.github.com/)
2. Ver tutoriales en YouTube: "GitHub Pages tutorial español"

---

## 🎓 Resumen Rápido

```
1. Crea repo en GitHub
2. Sube archivos: git init → git add . → git commit → git push
3. Activa Pages: Settings → Pages → Branch: main → Save
4. Comparte el enlace: https://tu-usuario.github.io/repo-name/
5. Actualiza: Edita data.js en GitHub → Commit changes
```

**¡Eso es todo!** 🎉 Ahora tu sobrino tendrá acceso permanente a la app y podrás actualizarla cuando quieras.
