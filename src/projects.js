const containerProjetos = document.querySelector(".container-projetos");
const containercarrossel = containerProjetos.querySelector(".container-carrossel");
const carrossel = containerProjetos.querySelector(".carrossel");
const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

const createcarrossel = () => {
  const carrosselProps = onResize();
  const length = carrosselItems.length;
  const degrees = 360 / length;
  const gap = window.innerWidth < 576 ? 15 : 30;
  const tz = distanceZ(carrosselProps.w, length, gap);

  const fov = calculateFov(carrosselProps);
  const height = calculateHeight(tz);

  containerProjetos.style.width = tz * 2 + gap * length + "px";
  containerProjetos.style.height = height + "px";

  carrosselItems.forEach((item, i) => {
    const degreesByItem = degrees * i + "deg";
    item.style.setProperty("--rotatey", degreesByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap;
};

const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

const calculateFov = (carrosselProps) => {
  const perspective = window
    .getComputedStyle(containercarrossel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrosselProps.w * carrosselProps.w) +
    Math.sqrt(carrosselProps.h * carrosselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

const getPosX = (x) => {
  currentMousePos = x;

  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.1);
  carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(update);
};

const onResize = () => {
  const boundingcarrossel = containercarrossel.getBoundingClientRect();

  const carrosselProps = {
    w: boundingcarrossel.width,
    h: boundingcarrossel.height,
  };

  return carrosselProps;
};

const initEvents = () => {
  carrossel.addEventListener("mousedown", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("mouseup", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  containerProjetos.addEventListener("mouseleave", () => (isMouseDown = false));

  carrossel.addEventListener(
    "mousemove",
    (e) => isMouseDown && getPosX(e.clientX)
  );

  carrossel.addEventListener("touchstart", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("touchend", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  containerProjetos.addEventListener(
    "touchmove",
    (e) => isMouseDown && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", createcarrossel);

  update();
  createcarrossel();
};

initEvents();
