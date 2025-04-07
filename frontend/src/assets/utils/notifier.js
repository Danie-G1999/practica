// src/utils/notifier.js
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

// Configuración global
const notifier = new AWN({
  position: "top-right",
  labels: {
    success: "Éxito",
    alert: "Alerta",
    info: "Información",
    warning: "Advertencia",
    error: "Error",
  },
  icons: {
    enabled: true,
    success: "check",
    alert: "exclamation-triangle",
    info: "info-circle",
    warning: "exclamation-circle",
  },
  durations: {
    success: 3000,
    alert: 4000,
    info: 3000,
    warning: 4000,
    error: 5000,
  },
});

export default notifier;
