const formatDate = () => {
    const fecha = new Date(); // Puedes reemplazar esto con tu fecha específica

// Obtenemos los componentes de la fecha
const year = fecha.getFullYear();
const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Ajustamos el mes para que tenga dos dígitos
const day = String(fecha.getDate()).padStart(2, '0');
const hours = String(fecha.getHours()).padStart(2, '0');
const minutes = String(fecha.getMinutes()).padStart(2, '0');
const seconds = String(fecha.getSeconds()).padStart(2, '0');

// Formateamos la cadena de salida
return  `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

module.exports = formatDate