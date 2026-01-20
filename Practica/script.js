// FJavier Lopez 2DAW

const mapa = L.map("mapa").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
}).addTo(mapa);

// Elementos del DOM
const spanLat = document.getElementById("latitud");
const spanLong = document.getElementById("longitud");
const canvas = document.getElementById("grafico");
const contexto = canvas.getContext("2d"); // Grafico 2d

// Datos almacenados
let puntos = JSON.parse(localStorage.getItem("puntosMapa") || "[]");
let capasMarcadores = [];

// Eventos
mapa.on("mousemove", actualizarCoordenadas);
mapa.on("click", registrarPunto);

cargarMarcadores();
dibujarCanvas();

// Funciones

// Mostrar coordenadas en tiempo real
function actualizarCoordenadas(e) {
    spanLat.textContent = e.latlng.lat.toFixed(3);
    spanLong.textContent = e.latlng.lng.toFixed(3);
}

// Guardar punto al hacer clic
function registrarPunto(e) {
    puntos.push({
        lat: e.latlng.lat,
        lng: e.latlng.lng
    });

    localStorage.setItem("puntosMapa", JSON.stringify(puntos));
    cargarMarcadores();
    dibujarCanvas();
}

// Cargar marcadores desde el array
function cargarMarcadores() {
    capasMarcadores.forEach(m => mapa.removeLayer(m));
    capasMarcadores = [];

    puntos.forEach((p, i) => {
        const marcador = L.marker([p.lat, p.lng])
            .addTo(mapa)
            .bindPopup(`Punto ${i + 1}`);
        capasMarcadores.push(marcador);
    });
}

// Dibujar información en canvas
function dibujarCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.font = "18px Arial";

    puntos.forEach((p, i) => {
        contexto.fillText(
            `Punto ${i + 1}: (${p.lat.toFixed(2)}, ${p.lng.toFixed(2)})`,
            20,
            30 + i * 30
        );
    });
}
