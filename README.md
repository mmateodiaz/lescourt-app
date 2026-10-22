# 🎾⚽ Les Courts - Sistema de Gestión y Reserva de Canchas

Aplicación web moderna y autogestionable desarrollada para el complejo deportivo **Les Courts** (Córdoba, Argentina). Permite a los usuarios consultar la disponibilidad en tiempo real, filtrar por sede, disciplina y horarios, seleccionar canchas específicas (múltiples canchas independientes para fútbol y pádel) y confirmar la reserva de forma directa mediante integración con WhatsApp.

---

## 🚀 Características Principales

- **Gestión Multi-Sede:** Soporte para las sedes de *Villa Belgrano* (Av. Laplace 550) y *Rivera Indarte* (Av. Boderau 7700), con enrutamiento automático de WhatsApp a los números de contacto correspondientes de cada complejo.
- **Selección Independiente de Canchas:** Control de capacidad por disciplina (ej. 3 canchas de Fútbol 7 y 4 de Pádel en Rivera Indarte), permitiendo reservas simultáneas en un mismo horario sin bloquear todo el bloque horario.
- **Identificación Inteligente de Clientes:** Sistema de memoria local (`localStorage`) que reconoce a clientes recurrentes por su número de teléfono y recupera sus datos automáticamente.
- **Tarifas Dinámicas y Promociones:** Visualización en tiempo real de precios según franjas horarias (diurno, nocturno, estelar) y avisos de promociones especiales (ej. pago en efectivo).
- **Diseño UI/UX Profesional:** Interfaz limpia y responsive basada en Tailwind CSS, utilizando la paleta de colores oficial de la marca y optimizada para dispositivos móviles y de escritorio.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando tecnologías modernas del ecosistema frontend:

- **React** (Hooks: `useState`, `useEffect`) para la gestión del estado de la aplicación.
- **Tailwind CSS** para el diseño de interfaces responsivas y de alto rendimiento.
- **Lucide React** para la iconografía moderna.
- **Vite** como entorno de desarrollo rápido y empaquetador.
- **LocalStorage API** para la persistencia del estado de turnos ocupados y clientes en el navegador.
- **GitHub & Vercel** para control de versiones e infraestructura de despliegue continuo.

---

## 📱 Flujo de Reserva de Turnos

1. **Identificación:** El usuario ingresa su número de teléfono/WhatsApp. Si ya es cliente, el sistema lo saluda por su nombre; si es nuevo, le solicita su nombre y lo registra.
2. **Selección de Sede y Deporte:** El sistema filtra automáticamente las disciplinas disponibles según la sede elegida (Pádel, Fútbol 7, Tenis, Squash).
3. **Elección de Fecha y Horario:** Calendario dinámico de los próximos días y grilla de horarios con precios actualizados y etiquetas informativas.
4. **Elección de Cancha:** Permite seleccionar la cancha específica disponible (Cancha 1, 2, 3 o 4) para ese horario.
5. **Confirmación vía WhatsApp:** Genera un mensaje preformateado con todos los detalles de la reserva y abre la API de WhatsApp de la sede seleccionada para coordinar la seña.

---

## ⚙️ Instalación y Ejecución Local

Si querés clonar y probar el proyecto en tu entorno local, seguí estos pasos:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/lescourt-app.git](https://github.com/tu-usuario/lescourt-app.git)

2. cd lescourt-app

3. npm install

4. npm run dev



👨‍💻 Autor

Desarrollado por Mateo Diaz

Estudiante de Ingeniería en Sistemas de Información – UTN Facultad Regional Córdoba (UTN FRC).