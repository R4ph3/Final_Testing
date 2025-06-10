# 🛡️ Malware Hash DApp

Aplicación web para registrar, validar y visualizar hashes de malware. Desarrollada como una DApp con frontend en Angular y backend en Node.js.

---

## 📌 Características

- ✅ Registro de hashes SHA256 junto con nombre y familia del malware.
- ✅ Validación del formato SHA256.
- ✅ Prevención de hashes duplicados.
- ✅ Visualización en tiempo real de todos los registros.
- ✅ Clasificación por familia (troyano, keylogger, etc).
- ✅ API REST y pruebas unitarias con Jasmine + Karma / Jest + Supertest.

---

## ⚙️ Tecnologías utilizadas

| Capa       | Tecnología                  |
|------------|------------------------------|
| Frontend   | Angular 17, TypeScript       |
| Backend    | Node.js, Express             |
| Testing    | Jasmine, Karma, Jest, Supertest |
| Estilo     | CSS puro                     |
| Comunicación | HTTP (CORS habilitado)     |

---

## 🚀 Instalación y ejecución

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
ng serve
```

### Pruebas
**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
ng test
```

---

## 🔍 Riesgos en la ejecución

- ❗ **Datos en memoria**: La versión actual no utiliza una base de datos persistente.
- ❗ **Sin autenticación**: Acceso abierto, riesgo si se expone a internet.
- ❗ **Colisiones manuales**: Aunque se previenen hashes duplicados, usuarios podrían intentar colisiones deliberadas.
- ❗ **Dependencias vulnerables**: Angular y Node requieren actualizaciones periódicas.

---

## ✅ Pruebas realizadas

- 🧪 **Backend**:
  - Pruebas unitarias y de integración usando Jest y Supertest.
  - Casos testeados: inserción válida, duplicados, errores de validación.

- 🧪 **Frontend**:
  - Pruebas unitarias con Jasmine/Karma.
  - Verificación del formulario, renderizado de listas, y manejo de errores.

---

## 📄 Documentación complementaria

Este proyecto está acompañado de los documentos de **Requisitos Maestros (RM)** y **Especificaciones de Requisitos del Sistema (RS)** donde se detallan el análisis de riesgos, diseño del sistema y cronograma. Por favor, consultar dichos documentos como parte de la entrega oficial.

---
