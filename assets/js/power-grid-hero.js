// Homepage effects: a 3D "smart grid" particle network behind the page, a
// three-phase waveform strip under the subtitle, and two warm glow orbs.
// Loaded only by _pages/about.md. Respects prefers-reduced-motion (renders one
// still frame) and pauses while the tab is hidden.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

const PALETTE = {
  dark: { base: new THREE.Color("#ffb800"), line: new THREE.Color("#ff6b00"), opacity: 0.9, lineOpacity: 0.32 },
  light: { base: new THREE.Color("#af8650"), line: new THREE.Color("#c99a5b"), opacity: 0.75, lineOpacity: 0.28 },
};
// Overload heat ramp: yellow (cool) -> orange -> red (hot).
const HEAT = [new THREE.Color("#ffd23f"), new THREE.Color("#ff6b00"), new THREE.Color("#ff2a1a")];

document.body.classList.add("has-grid-hero");

// Glow orbs ------------------------------------------------------------------
for (const side of ["tl", "br"]) {
  const orb = document.createElement("div");
  orb.className = `grid-hero-glow grid-hero-glow-${side}`;
  orb.setAttribute("aria-hidden", "true");
  document.body.appendChild(orb);
}

// 3D particle grid -----------------------------------------------------------
function startGrid() {
  const canvas = document.createElement("canvas");
  canvas.className = "grid-hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 20, 17);
  camera.lookAt(0, 0, -3);

  const small = window.innerWidth < 640;
  const NX = small ? 40 : 72;
  const NZ = small ? 26 : 40;
  const SPACING = 1.05;
  const N = NX * NZ;

  // Deterministic pseudo-random so the topology is the same on every visit.
  let seed = 20260613;
  const rand = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

  const base = new Float32Array(N * 2); // x, z
  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const hubs = new Uint8Array(N);
  for (let j = 0; j < NZ; j++) {
    for (let i = 0; i < NX; i++) {
      const k = j * NX + i;
      base[2 * k] = (i - (NX - 1) / 2) * SPACING + (rand() - 0.5) * 0.25;
      base[2 * k + 1] = (j - (NZ - 1) / 2) * SPACING + (rand() - 0.5) * 0.25;
      hubs[k] = rand() < 0.035 ? 1 : 0; // substations / major buses
    }
  }

  // Topology: transmission corridors every 6th row/column are always
  // connected; distribution branches elsewhere are sparse.
  const edges = [];
  for (let j = 0; j < NZ; j++) {
    for (let i = 0; i < NX; i++) {
      const k = j * NX + i;
      if (i < NX - 1 && (j % 6 === 0 || rand() < 0.42)) edges.push(k, k + 1);
      if (j < NZ - 1 && (i % 6 === 0 || rand() < 0.42)) edges.push(k, k + NX);
      if (hubs[k] && i < NX - 1 && j < NZ - 1) edges.push(k, k + NX + 1);
    }
  }
  const linePositions = new Float32Array(edges.length * 3);
  const lineColors = new Float32Array(edges.length * 3);

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  pointGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  const pointMat = new THREE.ShaderMaterial({
    uniforms: { uOpacity: { value: 1 }, uScale: { value: 1 } },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float uScale;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * uScale * (110.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vColor;
      uniform float uOpacity;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        a = a * a;
        gl_FragColor = vec4(vColor, a * uOpacity);
      }`,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
  });
  const points = new THREE.Points(pointGeo, pointMat);
  scene.add(points);

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  const applyTheme = () => {
    const p = isDark() ? PALETTE.dark : PALETTE.light;
    const blend = isDark() ? THREE.AdditiveBlending : THREE.NormalBlending;
    pointMat.blending = blend;
    lineMat.blending = blend;
    pointMat.uniforms.uOpacity.value = p.opacity;
    lineMat.opacity = p.lineOpacity;
    pointMat.needsUpdate = true;
    lineMat.needsUpdate = true;
  };
  applyTheme();
  new MutationObserver(() => {
    applyTheme();
    if (reduceMotion) frame(0);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Mouse -> point on the grid plane. Heat follows the cursor with easing.
  const mouse = { x: 0, z: 0, tx: 0, tz: 0, power: 0, target: 0 };
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  const ndc = new THREE.Vector2();
  window.addEventListener(
    "pointermove",
    (e) => {
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        mouse.tx = hit.x;
        mouse.tz = hit.z;
        mouse.target = 1;
      }
    },
    { passive: true }
  );
  document.addEventListener("pointerleave", () => (mouse.target = 0));

  // Current packets travelling along the transmission corridors.
  const packets = Array.from({ length: small ? 4 : 7 }, () => ({
    row: 6 * Math.floor(rand() * Math.ceil(NZ / 6)),
    x: (rand() - 0.5) * NX * SPACING,
    speed: 2.5 + rand() * 3,
    dir: rand() < 0.5 ? -1 : 1,
  }));

  const tmp = new THREE.Color();
  const heatColor = (h, out, baseColor) => {
    if (h < 0.02) return out.copy(baseColor);
    const c = h < 0.5 ? tmp.copy(HEAT[0]).lerp(HEAT[1], h / 0.5) : tmp.copy(HEAT[1]).lerp(HEAT[2], (h - 0.5) / 0.5);
    return out.copy(baseColor).lerp(c, Math.min(1, h * 1.6));
  };

  const heat = new Float32Array(N);
  const nodeColor = new THREE.Color();

  function frame(tMs) {
    const t = tMs * 0.001;
    const p = isDark() ? PALETTE.dark : PALETTE.light;
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.z += (mouse.tz - mouse.z) * 0.08;
    mouse.power += (mouse.target - mouse.power) * 0.05;
    const halfW = (NX * SPACING) / 2;
    for (const pk of packets) {
      pk.x += pk.dir * pk.speed * 0.016;
      if (pk.x > halfW) pk.x = -halfW;
      if (pk.x < -halfW) pk.x = halfW;
    }

    for (let k = 0; k < N; k++) {
      const x = base[2 * k];
      const z = base[2 * k + 1];
      // Low-frequency "power oscillation" of the whole network.
      let y = 0.9 * Math.sin(0.33 * x + t * 0.8) * Math.cos(0.27 * z + t * 0.55) + 0.45 * Math.sin(0.16 * (x + z) - t * 1.2);

      // Cursor: a magnetic-field-like bump with an expanding ripple.
      const dx = x - mouse.x;
      const dz = z - mouse.z;
      const d2 = dx * dx + dz * dz;
      const near = Math.exp(-d2 / 14) * mouse.power;
      const ripple = Math.sin(Math.sqrt(d2) * 1.3 - t * 6) * Math.exp(-d2 / 60) * mouse.power;
      y += near * 1.6 + ripple * 0.35;

      // Packets heat nodes on their corridor as they pass.
      let h = near + Math.max(0, ripple) * 0.25;
      const row = Math.round(z / SPACING + (NZ - 1) / 2);
      for (const pk of packets) {
        if (row === pk.row) h += Math.exp(-((x - pk.x) ** 2) / 1.2) * 0.75;
      }
      h = Math.min(1, h);
      heat[k] = h;

      positions[3 * k] = x;
      positions[3 * k + 1] = y;
      positions[3 * k + 2] = z;
      heatColor(h, nodeColor, p.base);
      colors[3 * k] = nodeColor.r;
      colors[3 * k + 1] = nodeColor.g;
      colors[3 * k + 2] = nodeColor.b;
      sizes[k] = (hubs[k] ? 2.4 : 1.1) * (1 + h * 1.8);
    }

    for (let e = 0; e < edges.length; e++) {
      const k = edges[e];
      linePositions[3 * e] = positions[3 * k];
      linePositions[3 * e + 1] = positions[3 * k + 1];
      linePositions[3 * e + 2] = positions[3 * k + 2];
      heatColor(heat[k], nodeColor, p.line);
      lineColors[3 * e] = nodeColor.r;
      lineColors[3 * e + 1] = nodeColor.g;
      lineColors[3 * e + 2] = nodeColor.b;
    }

    pointGeo.attributes.position.needsUpdate = true;
    pointGeo.attributes.color.needsUpdate = true;
    pointGeo.attributes.size.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    points.rotation.y = lines.rotation.y = Math.sin(t * 0.05) * 0.12;
    renderer.render(scene, camera);
  }

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    pointMat.uniforms.uScale.value = Math.min(1.6, Math.max(0.8, h / 700)) * renderer.getPixelRatio();
    if (reduceMotion) frame(0);
  };
  window.addEventListener("resize", resize);
  resize();

  if (reduceMotion) {
    frame(0);
    return;
  }
  let running = true;
  const loop = (tMs) => {
    if (!running) return;
    frame(tMs);
    requestAnimationFrame(loop);
  };
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });
  requestAnimationFrame(loop);
}

// Three-phase waveform strip with occasional switching transients -------------
function startWaveform() {
  const anchor = document.querySelector(".post-header .desc") || document.querySelector(".post-header");
  if (!anchor) return;
  const wrap = document.createElement("div");
  wrap.className = "grid-hero-wave";
  wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = '<canvas></canvas><span class="grid-hero-wave-label">V<sub>a</sub> V<sub>b</sub> V<sub>c</sub> · 60 Hz</span>';
  anchor.insertAdjacentElement("afterend", wrap);
  const canvas = wrap.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const phases = [
    { shift: 0, dark: "#ff6b00", light: "#b5502b", width: 2 },
    { shift: (2 * Math.PI) / 3, dark: "#ffb800", light: "#af8650", width: 1.5 },
    { shift: (4 * Math.PI) / 3, dark: "rgba(245,235,230,0.55)", light: "rgba(52,58,64,0.45)", width: 1.2 },
  ];
  let transientAt = -10;
  let transientX = 0.5;

  const draw = (tMs) => {
    const t = tMs * 0.001;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const dark = isDark();
    const mid = h / 2;
    const amp = h * 0.32;

    // Faint oscilloscope grid.
    ctx.strokeStyle = dark ? "rgba(255,107,0,0.10)" : "rgba(175,134,80,0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let gx = 0; gx <= w; gx += 40) {
      ctx.moveTo(gx + 0.5, 0);
      ctx.lineTo(gx + 0.5, h);
    }
    ctx.moveTo(0, mid + 0.5);
    ctx.lineTo(w, mid + 0.5);
    ctx.stroke();

    // A switching transient (damped oscillation) every ~6 s on phase a.
    if (!reduceMotion && t - transientAt > 6 + Math.random() * 3) {
      transientAt = t;
      transientX = 0.25 + Math.random() * 0.5;
    }
    const age = t - transientAt;

    phases.forEach((ph, idx) => {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const theta = (x / w) * 4 * Math.PI - t * 2.2 + ph.shift;
        let y = Math.sin(theta);
        if (idx === 0 && age < 1.5) {
          const dx = x / w - transientX;
          if (dx > 0) y += 1.1 * Math.exp(-dx * 9) * Math.exp(-age * 2.2) * Math.sin(dx * 140);
        }
        const py = mid - y * amp;
        x === 0 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
      }
      ctx.strokeStyle = dark ? ph.dark : ph.light;
      ctx.lineWidth = ph.width;
      ctx.shadowColor = dark && idx < 2 ? ph.dark : "transparent";
      ctx.shadowBlur = dark && idx < 2 ? 10 : 0;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  };

  if (reduceMotion) {
    draw(1500);
    new MutationObserver(() => draw(1500)).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", () => draw(1500));
    return;
  }
  const loop = (tMs) => {
    if (!document.hidden) draw(tMs);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

startWaveform();
startGrid();
