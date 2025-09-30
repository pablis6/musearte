document.addEventListener("DOMContentLoaded", function () {
  // Cargar el header
  fetch("../templates/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-header").innerHTML = data;
      // Marcar el enlace activo en el menú de navegación después de cargar el header
      const currentUrl =
        window.location.pathname !== "/"
          ? window.location.pathname
          : "/index.html";
      const navLinks = document.querySelectorAll("nav a");

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentUrl) {
          link.setAttribute("aria-current", "active");
          link.classList.add("active");
        } else {
          link.removeAttribute("aria-current");
          link.classList.remove("active");
        }
      });
    });

  // Cargar el footer
  fetch("/templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-footer").innerHTML = data;
    });
});

function activarCamara() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      const botonCamara = document.getElementById("boton-camara");
      const video = document.getElementById("camara");
      video.autoplay = true;
      video.srcObject = stream;
      botonCamara.style.display = "none";
      video.style.display = "block";
      setTimeout(() => {
        window.location.href = "/pages/detalle-obra.html";
      }, 5000);
    })
    .catch((err) => {
      alert("No se pudo acceder a la cámara: " + err.message);
    });
}

function playAudio(obra) {
  const audioSrc = `../audios/descripcion_${obra}.wav`;
  audioElement = document.createElement("audio");
  audioElement.id = `audio-${obra}`;
  audioElement.src = audioSrc;
  audioElement.style.display = "none";
  document.body.appendChild(audioElement);
  audioElement.play();
  audioElement.addEventListener("ended", function () {
    pauseAudio(obra);
  });
  toggleIcon(obra, true);
}
function pauseAudio(obra) {
  const audioElement = document.getElementById(`audio-${obra}`);
  const isPlaying = !audioElement.paused;

  if (isPlaying) {
    audioElement.pause();
  }
  toggleIcon(obra, false);
}

function toggleIcon(obra, isPlaying) {
  document.getElementById(`icon-play-${obra}`).style.display = isPlaying
    ? "none"
    : "inline";
  document.getElementById(`icon-pause-${obra}`).style.display = isPlaying
    ? "inline"
    : "none";
}
