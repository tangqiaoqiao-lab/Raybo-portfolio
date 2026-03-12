<template>
  <div
    class="webgl-wrapper"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @mousemove="onMove"
  >
    <canvas ref="canvasEl" class="webgl-canvas"></canvas>

    <button
      v-if="showButton"
      class="experience-btn"
      :style="btnStyle"
      type="button"
      @click="openExperience"
    >
      Experience Now
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';

const canvasEl = ref<HTMLCanvasElement | null>(null);
const showButton = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const btnStyle = computed(() => ({
  transform: `translate(${mouseX.value}px, ${mouseY.value}px) translate(-50%, -50%)`,
}));

let gl: WebGLRenderingContext | null = null;
let animationId = 0;
let startTime = 0;
let uTimeLocation: WebGLUniformLocation | null = null;
let uResolutionLocation: WebGLUniformLocation | null = null;
let uMouseLocation: WebGLUniformLocation | null = null;
const mouseUniform = { x: 0, y: 0 };

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// 多个不同风格的片元着色器，参考站点上几个案例的视觉感觉
const fragmentShaders = [
  // 0 - 原有的极光/波纹风格（参考 shaders-adamfuhrer-26）
  `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 0.7, 0.4);
  vec3 d = vec3(0.0, 0.15, 0.2);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  float angle = atan(st.y, st.x);
  float radius = length(st);

  vec2 m = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
  float md = length(st - m);

  float t = u_time * 0.12;
  float v = sin(5.0 * radius - t * 4.0 + md * 6.0 + angle * 3.0);
  v += 0.35 * sin(10.0 * radius + t * 2.0 - md * 4.0);
  v *= 0.8 + 0.4 * cos(angle * 4.0 + t * 3.0);

  vec3 color = palette(v);
  gl_FragColor = vec4(color, 1.0);
}
`,
  // 1 - 流体块感（参考 fluid-blocks）
  `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st -= 0.5;
  st.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.25;
  vec2 flow = vec2(
    noise(st * 2.0 + t),
    noise(st * 2.0 - t)
  );

  vec2 uv = st * 1.8 + flow * 0.4;

  float n = noise(uv * 3.0 + t * 0.8);
  float c1 = smoothstep(0.2, 0.8, n);
  float c2 = smoothstep(0.0, 0.6, n);

  vec3 col = mix(
    vec3(0.04, 0.08, 0.15),
    vec3(0.0, 0.6, 0.9),
    c1
  );
  col = mix(col, vec3(0.9, 0.95, 1.0), c2 * 0.6);

  gl_FragColor = vec4(col, 1.0);
}
`,
  // 2 - 森林粒子感（参考 forest-sprites）
  `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

vec3 sprite(vec2 p, vec2 center, float size, float t) {
  vec2 d = p - center;
  float r = length(d) / size;
  float a = atan(d.y, d.x);

  float sparkle = smoothstep(0.4, 0.0, r) *
                  (0.6 + 0.4 * sin(a * 6.0 + t * 4.0));

  vec3 base = mix(vec3(0.0, 0.1, 0.0), vec3(0.1, 0.6, 0.2), r * 0.8);
  vec3 glow = vec3(0.5, 1.0, 0.6) * sparkle;

  return base + glow;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float t = u_time * 0.3;

  vec3 col = vec3(0.01, 0.04, 0.02);

  // 多层 sprite
  for (int i = 0; i < 20; i++) {
    float fi = float(i);
    float offset = hash(fi) * 6.28318;
    vec2 c = vec2(
      sin(fi * 3.1 + offset) * 0.8,
      cos(fi * 4.2 + offset) * 0.4 - 0.1
    );
    float size = 0.12 + hash(fi + 10.0) * 0.18;
    float tt = t + hash(fi + 30.0) * 10.0;
    col += sprite(uv, c, size, tt) * 0.05;
  }

  gl_FragColor = vec4(col, 1.0);
}
`,
  // 3 - 城市灯光感（参考 lulaby-city）
  `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

float rect(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.2;

  // 背景渐变
  vec3 col = mix(vec3(0.02, 0.02, 0.08), vec3(0.0, 0.1, 0.25), uv.y);

  // 简单楼体
  for (int i = 0; i < 18; i++) {
    float fi = float(i);
    float x = (fi - 9.0) * 0.18;
    float h = 0.2 + fract(sin(fi * 12.3) * 43758.2) * 0.6;
    vec2 p = uv - vec2(0.5 + x, 0.0);
    float d = rect(p - vec2(0.0, h * 0.5 - 0.4), vec2(0.06, h * 0.5));
    float building = smoothstep(0.01, 0.0, d);
    col = mix(col, vec3(0.02, 0.02, 0.05), building);

    // 窗口灯
    float rows = 12.0;
    float cols = 4.0;
    vec2 g = (p + vec2(0.06, 0.4)) / vec2(0.12, h) * vec2(cols, rows);
    vec2 cell = floor(g);
    vec2 f = fract(g) - 0.5;
    float dw = rect(f * vec2(1.2, 1.8), vec2(0.18, 0.06));
    float w = smoothstep(0.02, 0.0, dw);

    float rnd = fract(sin(dot(cell, vec2(12.3, 45.7)) + t * 2.0) * 43758.5453);
    float on = step(0.65, rnd);

    vec3 wcol = mix(vec3(0.02, 0.02, 0.05), vec3(1.0, 0.9, 0.6), on);
    col = mix(col, wcol, w * building * 0.9);
  }

  gl_FragColor = vec4(col, 1.0);
}
`,
];

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const { clientWidth, clientHeight } = canvas;
  const needResize =
    canvas.width !== clientWidth || canvas.height !== clientHeight;
  if (needResize) {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }
  return needResize;
}

const render = (time: number) => {
  if (!gl || !canvasEl.value) return;
  const canvas = canvasEl.value;

  resizeCanvasToDisplaySize(canvas);
  gl.viewport(0, 0, canvas.width, canvas.height);

  const now = time * 0.001;
  if (!startTime) startTime = now;
  const elapsed = now - startTime;

  gl.clear(gl.COLOR_BUFFER_BIT);

  if (uTimeLocation) gl.uniform1f(uTimeLocation, elapsed);
  if (uResolutionLocation)
    gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
  if (uMouseLocation)
    gl.uniform2f(uMouseLocation, mouseUniform.x, mouseUniform.y);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  animationId = requestAnimationFrame(render);
};

const initWebGL = () => {
  const canvas = canvasEl.value;
  if (!canvas) return;

  const context = canvas.getContext('webgl', {
    antialias: true,
    preserveDrawingBuffer: true,
  }) as WebGLRenderingContext | null;

  if (!context) {
    console.warn('WebGL not supported');
    return;
  }

  gl = context;

  // 每次进入首页在前两个效果之间随机选择一个片元着色器
  const shaderIndex = Math.floor(Math.random() * 2); // 0: adamfuhrer-style, 1: fluid-blocks-style
  const program = createProgram(
    gl,
    vertexShaderSource,
    fragmentShaders[shaderIndex]
  );
  if (!program) return;
  gl.useProgram(program);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  const positions = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  uTimeLocation = gl.getUniformLocation(program, 'u_time');
  uResolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  uMouseLocation = gl.getUniformLocation(program, 'u_mouse');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  animationId = requestAnimationFrame(render);
};

const onEnter = () => {
  showButton.value = true;
};

const onLeave = () => {
  showButton.value = false;
};

const onMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  mouseX.value = x;
  mouseY.value = y;
  mouseUniform.x = x;
  mouseUniform.y = rect.height - y;
};

const openExperience = () => {
  window.open(
    'https://raybobo.github.io/shadertoy/shaders-adamfuhrer-26',
    '_blank'
  );
};

onMounted(() => {
  initWebGL();
});

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.webgl-wrapper {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.webgl-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* 悬浮按钮样式：圆角、微小阴影，参考设计 */
.experience-btn {
  position: absolute;
  pointer-events: auto;
  padding: 10px 24px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  font-family: "Suisse Intl", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-size: 12px;
  color: #000000;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.12s ease-out, box-shadow 0.12s ease-out,
    background 0.12s ease-out;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.experience-btn:hover {
  transform: scale(1.03) translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.96);
}
</style>