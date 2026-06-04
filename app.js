import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

/* ---------------- RADIAL GLOW PARTICLE TEXTURE GENERATOR ---------------- */
function createRadialGlowMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 64, 64);
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.12, 'rgba(255, 255, 255, 0.95)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.35)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();
  
  return new THREE.CanvasTexture(canvas);
}


/* ---------------- PROCEDURAL PLANET TEXTURE GENERATORS ---------------- */
function createSunTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ff4500';
  ctx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = 25 + Math.random() * 45;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(255, 215, 0, 0.95)');
    grad.addColorStop(0.4, 'rgba(255, 100, 0, 0.4)');
    grad.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = 'rgba(60, 5, 0, 0.55)';
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 256, 4 + Math.random() * 10, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createMercuryTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8a8a92';
  ctx.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 128;
    const r = 1.5 + Math.random() * 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.arc(x - 0.5, y - 0.5, r - 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createVenusTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#cc9649';
  ctx.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 16; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#e3ba73' : '#b27a31';
    ctx.beginPath();
    ctx.moveTo(0, Math.random() * 128);
    ctx.bezierCurveTo(80, Math.random() * 128, 176, Math.random() * 128, 256, Math.random() * 128);
    ctx.lineTo(256, 128);
    ctx.lineTo(0, 128);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(0, 0, 256, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f2cfb';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#2b7829';
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = 24 + Math.random() * 55;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#83542f';
    ctx.beginPath();
    ctx.arc(x + (Math.random()-0.5)*r, y + (Math.random()-0.5)*r, r * 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2b7829';
  }
  ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 60, y - 25, x + 90, y + 35, x + 140, y);
    ctx.bezierCurveTo(x + 90, y + 25, x + 60, y - 12, x, y);
    ctx.closePath();
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createMarsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ba4420';
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = '#7a250b';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 128, 8 + Math.random() * 25, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(128, 0, 14, 0, Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(128, 128, 14, Math.PI, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function createJupiterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d5ad83';
  ctx.fillRect(0, 0, 512, 256);
  const colorsList = ['#a26c42', '#f3d9ce', '#b48663', '#734827', '#e8d2c1'];
  for (let y = 0; y < 256; y += 8) {
    ctx.fillStyle = colorsList[Math.floor(Math.random() * colorsList.length)];
    const thickness = 5 + Math.random() * 10;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) {
      ctx.lineTo(x, y + Math.sin(x * 0.06) * 1.8);
    }
    ctx.lineTo(512, y + thickness);
    for (let x = 512; x >= 0; x -= 32) {
      ctx.lineTo(x, y + thickness + Math.sin(x * 0.06) * 1.8);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = '#b03922';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.ellipse(260, 175, 22, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  return new THREE.CanvasTexture(canvas);
}

function createSaturnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#dfba76';
  ctx.fillRect(0, 0, 512, 256);
  const stripes = ['#ecdcb7', '#cfa965', '#d6b374', '#ebd5a2'];
  for (let y = 0; y < 256; y += 12) {
    ctx.fillStyle = stripes[Math.floor(Math.random() * stripes.length)];
    ctx.fillRect(0, y, 512, 4 + Math.random() * 8);
  }
  return new THREE.CanvasTexture(canvas);
}

function createUranusTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#9ef0e0');
  grad.addColorStop(0.5, '#bdfdf4');
  grad.addColorStop(1, '#82dccf');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 128);
  return new THREE.CanvasTexture(canvas);
}

function createNeptuneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#254483';
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = '#1b3264';
  ctx.fillRect(0, 42, 256, 12);
  ctx.fillRect(0, 84, 256, 8);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const x = 60 + Math.random() * 110;
    const y = 45 + Math.random() * 35;
    ctx.ellipse(x, y, 14, 1.8, 0.04, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createSaturnRingsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 4;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.12, 'rgba(243, 219, 152, 0.0)');
  grad.addColorStop(0.28, 'rgba(243, 219, 152, 0.82)');
  grad.addColorStop(0.48, 'rgba(90, 80, 50, 0.12)');
  grad.addColorStop(0.56, 'rgba(211, 191, 142, 0.88)');
  grad.addColorStop(0.92, 'rgba(180, 160, 120, 0.35)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createTextSprite(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 64);
  ctx.font = 'bold 24px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#00e5ff';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, 128, 32);
  ctx.shadowBlur = 0;
  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(2.4, 0.6, 1);
  return sprite;
}


/* ---------------- SYNTHESIZER (WEB AUDIO API) ---------------- */
let audioCtx, masterGain, filterNode, delayNode;
let synthOsc1, synthOsc2;
let audioActive = false;

function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.16;
    
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.Q.value = 5.0; 
    filterNode.frequency.value = 350;
    
    delayNode = audioCtx.createDelay(1.0);
    delayNode.delayTime.value = 0.42;
    
    const delayFeedback = audioCtx.createGain();
    delayFeedback.gain.value = 0.6;
    
    synthOsc1 = audioCtx.createOscillator();
    synthOsc1.type = 'sawtooth';
    synthOsc1.frequency.value = 82.41;
    
    synthOsc2 = audioCtx.createOscillator();
    synthOsc2.type = 'triangle';
    synthOsc2.frequency.value = 82.7;
    
    const synthGain = audioCtx.createGain();
    synthGain.gain.value = 0.22;
    
    synthOsc1.connect(synthGain);
    synthOsc2.connect(synthGain);
    synthGain.connect(filterNode);
    
    filterNode.connect(masterGain);
    filterNode.connect(delayNode);
    delayNode.connect(delayFeedback);
    delayFeedback.connect(delayNode);
    delayFeedback.connect(masterGain);
    
    masterGain.connect(audioCtx.destination);
    
    synthOsc1.start();
    synthOsc2.start();
  } catch (err) {
    console.warn("Audio Context init blocked:", err);
  }
}

function toggleAudio(active) {
  audioActive = active;
  const wrapper = document.getElementById('volume-wrapper');
  if (active) {
    wrapper.style.opacity = '1';
    wrapper.style.pointerEvents = 'auto';
    if (!audioCtx) initAudio();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  } else {
    wrapper.style.opacity = '0.5';
    wrapper.style.pointerEvents = 'none';
    if (audioCtx && audioCtx.state === 'running') audioCtx.suspend();
  }
}

function onVolumeChange(val) {
  document.getElementById('vol-val').innerText = Math.round(val / 0.4 * 100) + '%';
  if (masterGain) {
    masterGain.gain.setTargetAtTime(parseFloat(val), audioCtx.currentTime, 0.08);
  }
}

let lastChimeTime = 0;
function processSynthesizer(avgX, avgY, handSpeed, palmSpread) {
  if (!audioActive || !audioCtx || audioCtx.state !== 'running') return;
  const normY = (avgY + 9) / 18;
  const cutoff = 120 + Math.pow(normY, 2.5) * 2200;
  filterNode.frequency.setTargetAtTime(Math.max(80, Math.min(3500, cutoff)), audioCtx.currentTime, 0.12);
  
  const normX = (avgX + 11) / 22;
  const baseFreq = 41.20 + normX * 82.41;
  synthOsc1.frequency.setTargetAtTime(baseFreq, audioCtx.currentTime, 0.25);
  synthOsc2.frequency.setTargetAtTime(baseFreq * 1.007, audioCtx.currentTime, 0.25);
  
  const now = audioCtx.currentTime;
  if (handSpeed > 0.07 && now - lastChimeTime > 0.2) {
    triggerPulsarChime(normX, palmSpread);
    lastChimeTime = now;
  }
}

function triggerPulsarChime(positionX, spread) {
  const osc = audioCtx.createOscillator();
  const mod = audioCtx.createOscillator();
  const modGain = audioCtx.createGain();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  mod.type = 'sine';
  const scale = [110.0, 123.47, 130.81, 146.83, 164.81, 220.0, 246.94, 261.63, 293.66, 329.63, 440.0, 523.25, 587.33, 659.25, 880.0];
  const idx = Math.floor(positionX * (scale.length - 1));
  const noteFreq = scale[Math.max(0, Math.min(scale.length - 1, idx))];
  osc.frequency.value = noteFreq;
  mod.frequency.value = noteFreq * 3.0; 
  modGain.gain.value = 220.0 * (spread + 0.05);
  gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
  const decay = 0.4 + spread * 2.2; 
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + decay);
  mod.connect(modGain);
  modGain.connect(osc.frequency);
  osc.connect(gain);
  gain.connect(filterNode);
  mod.start();
  osc.start();
  mod.stop(audioCtx.currentTime + decay + 0.05);
  osc.stop(audioCtx.currentTime + decay + 0.05);
}


/* ---------------- THREE.JS GRAPHICS SETUP ---------------- */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, -12, 22);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const pointLight = new THREE.PointLight(0xfff5d8, 3.8, 80, 0.6);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x282838, 0.3);
scene.add(ambientLight);


/* ---------------- MILKY WAY SPIRAL GALAXY BACKDROP ---------------- */
let showGalaxy = true;
const galaxyCount = 20000;
const galaxyPositions = new Float32Array(galaxyCount * 3);
const galaxyColors = new Float32Array(galaxyCount * 3);

const galaxyColorsList = [
  new THREE.Color('#382352'), // Deep Indigo
  new THREE.Color('#10223e'), // Cobalt Nebula
  new THREE.Color('#ffdfa8'), // Star Gold
  new THREE.Color('#e0f7fc')  // Electric Frost
];

for (let i = 0; i < galaxyCount; i++) {
  const arm = i % 2;
  const theta = (i / galaxyCount) * Math.PI * 18.0;
  const r = 35.0 + Math.pow(i / galaxyCount, 0.65) * 150.0;
  const angle = theta + (arm * Math.PI) + (Math.random() - 0.5) * 0.4;
  const x = r * Math.cos(angle);
  const z = r * Math.sin(angle);
  const y = (Math.random() - 0.5) * (18.0 - r * 0.08); // Flatten at ends
  
  galaxyPositions[i * 3] = x;
  galaxyPositions[i * 3 + 1] = y;
  galaxyPositions[i * 3 + 2] = z;
  
  const col = galaxyColorsList[Math.floor(Math.random() * galaxyColorsList.length)];
  galaxyColors[i * 3] = col.r * (0.35 + Math.random() * 0.65);
  galaxyColors[i * 3 + 1] = col.g * (0.35 + Math.random() * 0.65);
  galaxyColors[i * 3 + 2] = col.b * (0.35 + Math.random() * 0.65);
}

const galaxyGeometry = new THREE.BufferGeometry();
galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

const galaxyMaterial = new THREE.PointsMaterial({
  size: 0.045,
  vertexColors: true,
  transparent: true,
  opacity: 0.42,
  blending: THREE.AdditiveBlending,
  map: createRadialGlowMap(),
  depthWrite: false
});

const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxyPoints);


/* ---------------- CELESTIAL PLANET MESH INITIATION ---------------- */
const sunGeo = new THREE.SphereGeometry(2.0, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({
  map: createSunTexture(),
  color: 0xffddaa
});
const sunMesh = new THREE.Mesh(sunGeo, sunMat);
scene.add(sunMesh);

const sunLabel = createTextSprite('SUN');
sunLabel.position.set(0, 2.8, 0);
sunMesh.add(sunLabel);

const planetDefs = [
  { name: 'MERCURY', radius: 0.22, orbit: 4.2, speed: 0.038, textFunc: createMercuryTexture },
  { name: 'VENUS', radius: 0.38, orbit: 6.0, speed: 0.024, textFunc: createVenusTexture },
  { name: 'EARTH', radius: 0.42, orbit: 8.0, speed: 0.016, textFunc: createEarthTexture },
  { name: 'MARS', radius: 0.30, orbit: 10.0, speed: 0.012, textFunc: createMarsTexture },
  { name: 'JUPITER', radius: 0.85, orbit: 12.8, speed: 0.007, textFunc: createJupiterTexture },
  { name: 'SATURN', radius: 0.72, orbit: 16.0, speed: 0.005, textFunc: createSaturnTexture, hasRings: true },
  { name: 'URANUS', radius: 0.52, orbit: 19.2, speed: 0.003, textFunc: createUranusTexture },
  { name: 'NEPTUNE', radius: 0.50, orbit: 22.0, speed: 0.002, textFunc: createNeptuneTexture }
];

const planets = [];
planetDefs.forEach((def) => {
  const geo = new THREE.SphereGeometry(def.radius, 32, 32);
  const mat = new THREE.MeshStandardMaterial({
    map: def.textFunc(),
    roughness: 0.85,
    metalness: 0.08
  });
  if (def.name === 'EARTH') {
    mat.roughness = 0.45;
    mat.metalness = 0.18;
  }
  const mesh = new THREE.Mesh(geo, mat);
  if (def.hasRings) {
    const ringGeo = new THREE.RingGeometry(0.95, 2.1, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      map: createSaturnRingsTexture(),
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.rotation.y = Math.PI / 15;
    mesh.add(ringMesh);
  }
  const label = createTextSprite(def.name);
  label.position.set(0, def.radius + 0.65, 0);
  mesh.add(label);
  scene.add(mesh);
  planets.push({
    name: def.name,
    mesh: mesh,
    label: label,
    radius: def.radius,
    orbit: def.orbit,
    speed: def.speed,
    angle: Math.random() * Math.PI * 2
  });
});


/* ---------------- BLACK HOLE GRAVITATIONAL LENSING ---------------- */
let blackholeActive = false;
let blackholeTimer = 0;
const bhLensingGeo = new THREE.TorusGeometry(2.3, 0.28, 16, 80);
const bhLensingMat = new THREE.MeshBasicMaterial({
  color: 0x8a2be2,
  transparent: true,
  opacity: 0.0,
  blending: THREE.AdditiveBlending,
  wireframe: true
});
const bhLensingMesh = new THREE.Mesh(bhLensingGeo, bhLensingMat);
bhLensingMesh.rotation.x = Math.PI / 2.3;
bhLensingMesh.rotation.y = Math.PI / 12;
scene.add(bhLensingMesh);


/* ---------------- OPTIMIZED CELESTIAL PARTICLES SYSTEM ---------------- */
const particleCount = 40000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const trailColors = planetDefs.map(def => {
  if (def.name === 'MERCURY') return new THREE.Color('#9c9c9c');
  if (def.name === 'VENUS') return new THREE.Color('#d2aa6b');
  if (def.name === 'EARTH') return new THREE.Color('#00bbff');
  if (def.name === 'MARS') return new THREE.Color('#ff4d00');
  if (def.name === 'JUPITER') return new THREE.Color('#dfa069');
  if (def.name === 'SATURN') return new THREE.Color('#edd395');
  if (def.name === 'URANUS') return new THREE.Color('#7cf8e0');
  if (def.name === 'NEPTUNE') return new THREE.Color('#0c2fff');
  return new THREE.Color('#ffffff');
});
const solarWindColor = new THREE.Color('#ffa600');
const asteroidColor = new THREE.Color('#787880');
const supernovaColor = new THREE.Color('#00ffff');

const particleData = [];
for (let i = 0; i < particleCount; i++) {
  let group = 0; 
  let radius = 0;
  let angle = Math.random() * Math.PI * 2;
  let speed = 0;
  let yOffset = 0;
  let color = solarWindColor;
  
  if (i < 12000) {
    group = 0;
    radius = 1.0 + Math.random() * 20.0;
    speed = 0.08 + Math.random() * 0.12;
    color = solarWindColor;
    yOffset = (Math.random() - 0.5) * 1.5;
  } else if (i < 32000) {
    const planetIdx = Math.floor((i - 12000) / 2500); 
    group = planetIdx + 1;
    const baseR = planetDefs[planetIdx].orbit;
    radius = baseR + (Math.random() - 0.5) * 0.22;
    speed = planetDefs[planetIdx].speed;
    color = trailColors[planetIdx];
    yOffset = (Math.random() - 0.5) * 0.06;
  } else {
    group = 9;
    radius = 11.0 + Math.random() * 1.4;
    speed = 0.008 + Math.random() * 0.004;
    color = asteroidColor;
    yOffset = (Math.random() - 0.5) * 0.22;
  }
  particleData.push({ group, radius, angle, speed, yOffset });
  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  map: createRadialGlowMap(),
  depthWrite: false
});

const orreryPoints = new THREE.Points(geometry, particleMaterial);
scene.add(orreryPoints);


/* ---------------- POST-PROCESSING PIPELINE (CINEMATIC SHADERS) ---------------- */
let useBloom = true;
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.35, 
  0.35, 
  0.75  
);
const composer = new EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(bloomPass);


/* ---------------- PARAMETER MODIFIER STATE ---------------- */
let orbitSpeedMultiplier = 1.0;
let handGravityStrength = 1.5;
let smoothingFactor = 0.06; // Highly smoothed (EMA) to avoid webcam jitter
let simulationMode = 'orrery';
let orbitSqueezeFactor = 1.0;
let autopilot = false;
let supernovaActive = false;
let supernovaTime = 0;


/* ---------------- DOM INTERFACES & CONTROL BINDINGS ---------------- */
document.getElementById('enter-btn').addEventListener('click', startExperience);

document.getElementById('dashboard-hdr').addEventListener('click', () => {
  const dash = document.getElementById('dashboard');
  const btn = document.getElementById('collapse-btn');
  const minimized = dash.classList.toggle('minimized');
  btn.innerHTML = minimized ? '▼' : '✕';
});

document.getElementById('simulation-mode').addEventListener('change', (e) => {
  simulationMode = e.target.value;
});

document.getElementById('autopilot-toggle').addEventListener('change', (e) => {
  autopilot = e.target.checked;
  if (!autopilot) {
    // Reset camera observation angle
    camera.position.set(0, -12, 22);
    camera.lookAt(0, 2, 0);
  }
});

document.getElementById('galaxy-toggle').addEventListener('change', (e) => {
  showGalaxy = e.target.checked;
  galaxyPoints.visible = showGalaxy;
});

document.getElementById('supernova-btn').addEventListener('click', () => {
  supernovaActive = true;
  supernovaTime = clock.getElapsedTime();
});

document.getElementById('blackhole-btn').addEventListener('click', () => {
  blackholeActive = !blackholeActive;
  const btn = document.getElementById('blackhole-btn');
  if (blackholeActive) {
    btn.innerText = 'Restore Orrery';
    btn.style.background = 'linear-gradient(135deg, #000000 0%, #3a0066 100%)';
  } else {
    btn.innerText = 'Trigger Black Hole';
    btn.style.background = 'linear-gradient(135deg, #8a2be2 0%, #00e5ff 100%)';
  }
});

document.getElementById('bloom-toggle').addEventListener('change', (e) => {
  useBloom = e.target.checked;
  const wrapper = document.getElementById('bloom-intensity-wrapper');
  wrapper.style.opacity = useBloom ? '1' : '0.5';
  wrapper.style.pointerEvents = useBloom ? 'auto' : 'none';
});

document.getElementById('bloom-intensity').addEventListener('input', (e) => {
  document.getElementById('bloom-val').innerText = e.target.value;
  bloomPass.strength = parseFloat(e.target.value);
});

document.getElementById('orbit-speed').addEventListener('input', (e) => {
  document.getElementById('orbit-val').innerText = e.target.value + 'x';
  orbitSpeedMultiplier = parseFloat(e.target.value);
});

document.getElementById('hand-gravity').addEventListener('input', (e) => {
  document.getElementById('gravity-val').innerText = e.target.value + 'x';
  handGravityStrength = parseFloat(e.target.value);
});

document.getElementById('tracking-smooth').addEventListener('input', (e) => {
  document.getElementById('smooth-val').innerText = e.target.value;
  smoothingFactor = parseFloat(e.target.value);
});

document.getElementById('sound-toggle').addEventListener('change', (e) => {
  toggleAudio(e.target.checked);
});

document.getElementById('synth-volume').addEventListener('input', (e) => {
  onVolumeChange(e.target.value);
});

document.getElementById('pip-toggle').addEventListener('change', (e) => {
  const container = document.getElementById('webcam-container');
  container.classList.toggle('hidden', !e.target.checked);
});


/* ---------------- WEBCAM & MEDIAPIPE TRACKING ---------------- */
const video = document.getElementById('webcam');
const handCanvas = document.getElementById('hand-overlay');
const ctx = handCanvas.getContext('2d');

const fingerTargets = Array.from({ length: 5 }, () => new THREE.Vector3(0, 0, 0));
let handRotX = 0;
let handRotY = 0;
let palmSpread = 0;
let hasHand = false;

const emaLandmarks = Array.from({ length: 21 }, () => new THREE.Vector3(0, 0, 0));

const hands = new window.Hands({
  locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.75,
  minTrackingConfidence: 0.75
});

hands.onResults(results => {
  ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
  
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    hasHand = true;
    const rawLm = results.multiHandLandmarks[0];
    
    // Apply EMA filter
    for (let j = 0; j < 21; j++) {
      const rx = rawLm[j].x;
      const ry = rawLm[j].y;
      const rz = rawLm[j].z;
      emaLandmarks[j].x += (rx - emaLandmarks[j].x) * smoothingFactor;
      emaLandmarks[j].y += (ry - emaLandmarks[j].y) * smoothingFactor;
      emaLandmarks[j].z += (rz - emaLandmarks[j].z) * smoothingFactor;
    }
    
    window.drawConnectors(ctx, emaLandmarks, window.HAND_CONNECTIONS, { color: 'rgba(0, 229, 255, 0.45)', lineWidth: 2 });
    window.drawLandmarks(ctx, emaLandmarks, { color: '#ffffff', fillColor: '#00e5ff', radius: 2.5, lineWidth: 1 });
    
    const tips = [4, 8, 12, 16, 20];
    for (let f = 0; f < 5; f++) {
      const lm = emaLandmarks[tips[f]];
      fingerTargets[f].set(
        (lm.x - 0.5) * -22.0,
        (lm.y - 0.5) * -16.0,
        lm.z * -25.0
      );
    }
    
    const wrist = emaLandmarks[0];
    const middleBase = emaLandmarks[9];
    handRotY = (middleBase.x - wrist.x) * Math.PI;
    handRotX = (middleBase.y - wrist.y) * Math.PI;
    palmSpread = emaLandmarks[4].distanceTo(emaLandmarks[20]);
  } else {
    hasHand = false;
    palmSpread = 0;
  }
});

let cameraInstance = null;

function startExperience() {
  document.getElementById('onboarding').classList.add('hidden');
  if (document.getElementById('sound-toggle').checked) {
    toggleAudio(true);
  }
  cameraInstance = new window.Camera(video, {
    onFrame: async () => {
      await hands.send({ image: video });
    },
    width: 640,
    height: 480
  });
  cameraInstance.start()
    .then(() => console.log("Astrodynamics engine active."))
    .catch(err => {
      console.error("Camera fail:", err);
      alert("Please connect a camera device and approve browser permissions.");
    });
}


/* ---------------- WINDOW RESIZING ---------------- */
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  handCanvas.width = 180;
  handCanvas.height = 135;
  renderer.setSize(w, h);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();


/* ---------------- OPTIMIZED PHYSICAL ORBIT LOOP ---------------- */
const clock = new THREE.Clock();
const smoothedHandCenter = new THREE.Vector3(0, 0, 0);
const lastHandCenter = new THREE.Vector3(0, 0, 0);
let handSpeed = 0;
const cameraLookAtVector = new THREE.Vector3(0, 2, 0);

function animate() {
  requestAnimationFrame(animate);
  
  const time = clock.getElapsedTime();
  const posAttr = geometry.attributes.position;
  const colorAttr = geometry.attributes.color;
  
  // Easing hand positions to prevent tracking jumps (0.06 is extremely smooth)
  const currentHandCenter = new THREE.Vector3(0, 0, 0);
  if (hasHand) {
    for (let f = 0; f < 5; f++) {
      currentHandCenter.add(fingerTargets[f]);
    }
    currentHandCenter.divideScalar(5.0);
    smoothedHandCenter.lerp(currentHandCenter, 0.06);
    
    handSpeed = lastHandCenter.distanceTo(smoothedHandCenter);
    lastHandCenter.copy(smoothedHandCenter);
    
    // Hand squeeze (clenched fist collapse)
    const minSpread = 0.16;
    const maxSpread = 0.36;
    const normalized = (palmSpread - minSpread) / (maxSpread - minSpread);
    const targetSqueeze = Math.max(0.01, Math.min(1.0, normalized));
    orbitSqueezeFactor += (targetSqueeze - orbitSqueezeFactor) * 0.08;
  } else {
    // Elegant cosmic loop when hand is absent
    smoothedHandCenter.set(
      Math.sin(time * 0.45) * 4.5,
      Math.cos(time * 0.3) * 2.5,
      Math.sin(time * 0.2) * 1.5
    );
    handSpeed = 0.002;
    orbitSqueezeFactor += (1.0 - orbitSqueezeFactor) * 0.05;
  }

  // Slowly rotate background Milky Way galaxy
  galaxyPoints.rotation.y = time * 0.0006;
  galaxyPoints.rotation.x = Math.sin(time * 0.05) * 0.05;
  
  // Position Sun
  sunMesh.position.copy(smoothedHandCenter);
  sunMesh.rotation.y += 0.004;
  
  // Black Hole Accretion Disk expansion / collapse
  if (blackholeActive) {
    blackholeTimer += (1.0 - blackholeTimer) * 0.05;
    bhLensingMesh.visible = true;
    bhLensingMesh.position.copy(smoothedHandCenter);
    bhLensingMesh.rotation.z += 0.01;
    bhLensingMat.opacity = blackholeTimer * 0.75;
    
    // Collapse Sun visual scale
    const sunScale = 1.0 - blackholeTimer * 0.96; // Shrinks Sun into tiny core
    sunMesh.scale.set(sunScale, sunScale, sunScale);
    sunMat.color.setHex(0x1a052e); // Fade Sun to dark violet
    pointLight.color.setHex(0x8a2be2); // Purple gravitational glow
  } else {
    blackholeTimer += (0.0 - blackholeTimer) * 0.05;
    if (blackholeTimer < 0.01) {
      bhLensingMesh.visible = false;
    } else {
      bhLensingMesh.position.copy(smoothedHandCenter);
      bhLensingMesh.rotation.z += 0.01;
      bhLensingMat.opacity = blackholeTimer * 0.75;
    }
    const sunScale = 1.0 - blackholeTimer * 0.96;
    sunMesh.scale.set(sunScale, sunScale, sunScale);
    sunMat.color.setHex(0xffddaa);
    pointLight.color.setHex(0xfff5d8);
  }
  
  // Calculate squeeze multiplier: combines hand squeeze + black hole collapse
  const totalSqueeze = orbitSqueezeFactor * (1.0 - blackholeTimer * 0.95);
  
  // Move 3D planets along Keplerian orbits relative to the Sun center
  const planetCenters = [];
  planets.forEach((p, idx) => {
    p.mesh.rotation.y += 0.012; // Axis spin
    
    if (simulationMode === 'nebula') {
      p.angle += 0.045 * orbitSpeedMultiplier;
    } else {
      p.angle += p.speed * orbitSpeedMultiplier;
    }
    
    const currentOrbit = p.orbit * totalSqueeze;
    const px = smoothedHandCenter.x + currentOrbit * Math.cos(p.angle);
    const py = smoothedHandCenter.y + currentOrbit * Math.sin(p.angle);
    const pz = smoothedHandCenter.z + Math.sin(time + p.orbit) * 0.12 * totalSqueeze; 
    
    p.mesh.position.set(px, py, pz);
    planetCenters.push(p.mesh.position);
    
    // Scale planet meshes down relative to the squeeze factor
    const sizeScale = Math.max(0.12, totalSqueeze);
    p.mesh.scale.set(sizeScale, sizeScale, sizeScale);
    
    // Auto-orient planet name tags to face camera observer
    p.label.quaternion.copy(camera.quaternion);
    p.label.visible = totalSqueeze > 0.3;
  });
  
  // Auto-orient Sun name tag
  sunLabel.quaternion.copy(camera.quaternion);
  sunLabel.visible = totalSqueeze > 0.3;

  // --- CINEMATIC AUTOPILOT CAMERA SWEEP ---
  if (autopilot) {
    const cycle = 9.0; // Focus swap interval
    const index = Math.floor(time / cycle) % (planets.length + 1) - 1; // -1 to 7
    let targetCamPos = new THREE.Vector3(0, -14, 24);
    let targetLookAt = new THREE.Vector3(0, 0, 0);
    
    if (index === -1) {
      // Cosmic overview: slow orbital panning
      targetCamPos.set(Math.sin(time * 0.12) * 22.0, Math.cos(time * 0.08) * 6.0 - 9.0, Math.cos(time * 0.12) * 22.0 + 6.0);
      targetLookAt.copy(smoothedHandCenter);
    } else {
      // Focus specific planet
      const p = planets[index];
      const pPos = p.mesh.position;
      targetCamPos.set(pPos.x + Math.sin(time * 0.4) * 3.8, pPos.y + Math.cos(time * 0.4) * 1.2 - 1.5, pPos.z + Math.cos(time * 0.4) * 3.8);
      targetLookAt.copy(pPos);
    }
    
    // Smoothly slide camera position and lookAt coordinate vector
    camera.position.lerp(targetCamPos, 0.02);
    cameraLookAtVector.lerp(targetLookAt, 0.04);
    camera.lookAt(cameraLookAtVector);
  } else {
    // Normal manual user lookAt (lock center)
    cameraLookAtVector.lerp(smoothedHandCenter, 0.08);
    camera.lookAt(cameraLookAtVector);
  }

  // --- SUPERNOVA EXPANSION preset ---
  let supernovaScale = 1.0;
  let colorShift = 0.0;
  if (supernovaActive) {
    const elapsed = time - supernovaTime;
    if (elapsed < 6.0) {
      if (elapsed < 2.0) {
        // Fast blast expansion
        supernovaScale = 1.0 + (elapsed / 2.0) * 4.2;
        colorShift = elapsed / 2.0;
      } else {
        // Slow dissipate cooling and collapse back
        supernovaScale = 5.2 - ((elapsed - 2.0) / 4.0) * 4.2;
        colorShift = 1.0 - ((elapsed - 2.0) / 4.0);
      }
      pointLight.intensity = 3.8 + (1.0 - Math.abs(elapsed - 2.0) / 2.0) * 10.0;
    } else {
      supernovaActive = false;
      pointLight.intensity = 3.8;
    }
  }

  // Update particles with highly optimized loops
  for (let i = 0; i < particleCount; i++) {
    const pData = particleData[i];
    const idxX = i * 3;
    const idxY = idxX + 1;
    const idxZ = idxX + 2;
    
    let tx = 0, ty = 0, tz = 0;
    
    if (simulationMode === 'nebula') {
      pData.angle += 0.02 * orbitSpeedMultiplier;
      const spiralR = pData.radius * 0.8 * totalSqueeze * supernovaScale;
      tx = smoothedHandCenter.x + spiralR * Math.cos(pData.angle + spiralR * 0.12);
      ty = smoothedHandCenter.y + spiralR * Math.sin(pData.angle + spiralR * 0.12);
      tz = smoothedHandCenter.z + pData.yOffset * 1.5 * totalSqueeze * supernovaScale;
    } else {
      if (pData.group === 0) {
        // Solar Wind (accelerates during supernova)
        const windSpeedMult = supernovaActive ? 3.5 : 1.0;
        pData.radius += pData.speed * 2.2 * orbitSpeedMultiplier * windSpeedMult;
        const maxWind = 22.0 * supernovaScale;
        if (pData.radius > maxWind) {
          pData.radius = 1.0 + Math.random() * 2.0;
          pData.angle = Math.random() * Math.PI * 2;
        }
        tx = smoothedHandCenter.x + pData.radius * totalSqueeze * Math.cos(pData.angle);
        ty = smoothedHandCenter.y + pData.radius * totalSqueeze * Math.sin(pData.angle);
        tz = smoothedHandCenter.z + pData.yOffset * totalSqueeze;
      } else if (pData.group >= 1 && pData.group <= 8) {
        // Orbit Rings (expanded by supernova wave)
        pData.angle += pData.speed * orbitSpeedMultiplier;
        tx = smoothedHandCenter.x + pData.radius * totalSqueeze * supernovaScale * Math.cos(pData.angle);
        ty = smoothedHandCenter.y + pData.radius * totalSqueeze * supernovaScale * Math.sin(pData.angle);
        tz = smoothedHandCenter.z + pData.yOffset * totalSqueeze * supernovaScale;
      } else if (pData.group === 9) {
        // Asteroid Belt
        pData.angle += pData.speed * orbitSpeedMultiplier;
        tx = smoothedHandCenter.x + pData.radius * totalSqueeze * supernovaScale * Math.cos(pData.angle);
        ty = smoothedHandCenter.y + pData.radius * totalSqueeze * supernovaScale * Math.sin(pData.angle);
        tz = smoothedHandCenter.z + pData.yOffset * 2.0 * totalSqueeze * supernovaScale;
      }
    }
    
    // Dynamic fingertip gravity pull (high-end physics)
    let fx = 0, fy = 0, fz = 0;
    if (hasHand) {
      const gFactor = simulationMode === 'storm' ? handGravityStrength * 5.0 : handGravityStrength;
      for (let f = 0; f < 5; f++) {
        const finger = fingerTargets[f];
        const dx = finger.x - posAttr.array[idxX];
        const dy = finger.y - posAttr.array[idxY];
        const dz = finger.z - posAttr.array[idxZ];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < 22.0 && distSq > 0.04) {
          const accel = (gFactor * 0.05) / (distSq + 0.08);
          fx += dx * accel;
          fy += dy * accel;
          fz += dz * accel;
        }
      }
      
      // Coronal Mass Ejection push
      if (palmSpread > 0.4) {
        const dx = posAttr.array[idxX] - smoothedHandCenter.x;
        const dy = posAttr.array[idxY] - smoothedHandCenter.y;
        const dz = posAttr.array[idxZ] - smoothedHandCenter.z;
        const dist = Math.hypot(dx, dy, dz);
        if (dist < 14.0 && dist > 0.1) {
          const power = (palmSpread - 0.4) * 0.45;
          fx += (dx / dist) * power;
          fy += (dy / dist) * power;
          fz += (dz / dist) * power;
        }
      }
    }
    
    // Particle motion integration
    posAttr.array[idxX] += (tx - posAttr.array[idxX]) * 0.065 + fx + (Math.random() - 0.5) * 0.005;
    posAttr.array[idxY] += (ty - posAttr.array[idxY]) * 0.065 + fy + (Math.random() - 0.5) * 0.005;
    posAttr.array[idxZ] += (tz - posAttr.array[idxZ]) * 0.065 + fz + (Math.random() - 0.5) * 0.005;
    
    // Supernova color shift (particles transition to glowing cyan-white)
    if (supernovaActive) {
      const baseR = colors[idxX];
      const baseG = colors[idxY];
      const baseB = colors[idxZ];
      
      // Interpolate towards glowing cyan-white
      colorAttr.array[idxX] = baseR + (supernovaColor.r - baseR) * colorShift;
      colorAttr.array[idxY] = baseG + (supernovaColor.g - baseG) * colorShift;
      colorAttr.array[idxZ] = baseB + (supernovaColor.b - baseB) * colorShift;
    } else {
      // Revert to original colors
      const originalCol = pData.group === 0 ? solarWindColor : (pData.group === 9 ? asteroidColor : trailColors[pData.group - 1]);
      colorAttr.array[idxX] = originalCol.r;
      colorAttr.array[idxY] = originalCol.g;
      colorAttr.array[idxZ] = originalCol.b;
    }
  }
  
  posAttr.needsUpdate = true;
  if (supernovaActive) {
    colorAttr.needsUpdate = true;
  }
  
  // Tumble solar system relative to palm base rotation
  if (hasHand) {
    orreryPoints.rotation.y += (handRotY * 0.6 - orreryPoints.rotation.y) * 0.05;
    orreryPoints.rotation.x += (handRotX * 0.4 - orreryPoints.rotation.x) * 0.05;
    sunMesh.rotation.y += (handRotY * 0.6 - sunMesh.rotation.y) * 0.05;
    sunMesh.rotation.x += (handRotX * 0.4 - sunMesh.rotation.x) * 0.05;
    planets.forEach(p => {
      p.mesh.rotation.y += (handRotY * 0.6 - p.mesh.rotation.y) * 0.05;
      p.mesh.rotation.x += (handRotX * 0.4 - p.mesh.rotation.x) * 0.05;
    });
  } else {
    orreryPoints.rotation.y += 0.0015;
    orreryPoints.rotation.x = Math.sin(time * 0.15) * 0.08;
    sunMesh.rotation.y += 0.002;
    sunMesh.rotation.x = 0;
  }
  
  processSynthesizer(smoothedHandCenter.x, smoothedHandCenter.y, handSpeed, palmSpread);
  
  if (useBloom) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

animate();
