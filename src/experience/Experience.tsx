"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Blocks, BrainCircuit, CircuitBoard, Network, ScanSearch, Sparkles, UsersRound, type LucideIcon } from "lucide-react";
import * as THREE from "three";

const COUNT = 1800;

type SceneState = "hero" | "network" | "research" | "build" | "people" | "collapse" | "mark";

const sceneVisuals: Record<SceneState, { icon: LucideIcon; label: string }> = {
  hero: { icon: BrainCircuit, label: "NÚCLEO NEURAL" },
  network: { icon: Network, label: "SISTEMAS AGÊNTICOS" },
  research: { icon: ScanSearch, label: "PESQUISA APLICADA" },
  build: { icon: Blocks, label: "SOFTWARE EM CONSTRUÇÃO" },
  people: { icon: UsersRound, label: "INTELIGÊNCIA COLETIVA" },
  collapse: { icon: Sparkles, label: "IDEIAS EM SÍNTESE" },
  mark: { icon: CircuitBoard, label: "LEGADA LAB" },
};

function createRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function diamondPoint(progress: number, radius: number) {
  const corners = [[0, radius], [radius, 0], [0, -radius], [-radius, 0], [0, radius]];
  const scaled = progress * 4;
  const segment = Math.min(3, Math.floor(scaled));
  const local = scaled - segment;
  return {
    x: corners[segment][0] + (corners[segment + 1][0] - corners[segment][0]) * local,
    y: corners[segment][1] + (corners[segment + 1][1] - corners[segment][1]) * local,
  };
}

type ShapePart =
  | { kind: "line"; from: [number, number]; to: [number, number] }
  | { kind: "circle"; center: [number, number]; radius: number }
  | { kind: "arc"; center: [number, number]; radius: number; start: number; end: number };

function setShapePoint(target: Float32Array, offset: number, index: number, count: number, parts: ShapePart[], random: () => number) {
  const partIndex = index % parts.length;
  const part = parts[partIndex];
  const progress = Math.floor(index / parts.length) / Math.ceil(count / parts.length);
  let x = 0;
  let y = 0;

  if (part.kind === "line") {
    x = part.from[0] + (part.to[0] - part.from[0]) * progress;
    y = part.from[1] + (part.to[1] - part.from[1]) * progress;
  } else {
    const start = part.kind === "arc" ? part.start : 0;
    const end = part.kind === "arc" ? part.end : Math.PI * 2;
    const angle = start + (end - start) * progress;
    x = part.center[0] + Math.cos(angle) * part.radius;
    y = part.center[1] + Math.sin(angle) * part.radius;
  }

  target[offset] = x + (random() - 0.5) * 0.026;
  target[offset + 1] = y + (random() - 0.5) * 0.026;
  target[offset + 2] = (random() - 0.5) * 0.14;
}

function createTargets(count: number) {
  const core = new Float32Array(count * 3);
  const network = new Float32Array(count * 3);
  const research = new Float32Array(count * 3);
  const build = new Float32Array(count * 3);
  const people = new Float32Array(count * 3);
  const collapse = new Float32Array(count * 3);
  const mark = new Float32Array(count * 3);
  const random = createRandom(24081999);
  const networkNodes: [number, number][] = [[-1.55, -0.85], [-1.55, 0], [-1.55, 0.85], [0, -1.15], [0, -0.38], [0, 0.38], [0, 1.15], [1.55, -0.72], [1.55, 0.72]];
  const networkParts: ShapePart[] = [
    ...networkNodes.map((center): ShapePart => ({ kind: "circle", center, radius: 0.13 })),
    ...networkNodes.slice(0, 3).flatMap((from) => networkNodes.slice(3, 7).map((to): ShapePart => ({ kind: "line", from, to }))),
    ...networkNodes.slice(3, 7).flatMap((from) => networkNodes.slice(7).map((to): ShapePart => ({ kind: "line", from, to }))),
  ];
  const researchParts: ShapePart[] = [
    { kind: "circle", center: [-0.28, 0.27], radius: 1.18 },
    { kind: "circle", center: [-0.28, 0.27], radius: 1.18 },
    { kind: "line", from: [0.55, -0.56], to: [1.55, -1.56] },
    { kind: "line", from: [0.43, -0.68], to: [1.43, -1.68] },
    { kind: "circle", center: [-0.75, 0.58], radius: 0.12 },
    { kind: "circle", center: [0.18, 0.67], radius: 0.12 },
    { kind: "circle", center: [-0.12, -0.25], radius: 0.12 },
    { kind: "line", from: [-0.64, 0.54], to: [0.06, 0.63] },
    { kind: "line", from: [-0.68, 0.48], to: [-0.18, -0.14] },
    { kind: "line", from: [0.14, 0.55], to: [-0.08, -0.13] },
  ];
  const buildParts: ShapePart[] = [
    { kind: "line", from: [-0.65, 0.72], to: [0.65, 0.72] },
    { kind: "line", from: [0.65, 0.72], to: [0.65, -0.72] },
    { kind: "line", from: [0.65, -0.72], to: [-0.65, -0.72] },
    { kind: "line", from: [-0.65, -0.72], to: [-0.65, 0.72] },
    { kind: "line", from: [-1.65, 0.72], to: [-2.12, 0] },
    { kind: "line", from: [-2.12, 0], to: [-1.65, -0.72] },
    { kind: "line", from: [1.65, 0.72], to: [2.12, 0] },
    { kind: "line", from: [2.12, 0], to: [1.65, -0.72] },
    { kind: "line", from: [-0.95, 0.48], to: [-0.65, 0.48] },
    { kind: "line", from: [-0.95, 0], to: [-0.65, 0] },
    { kind: "line", from: [-0.95, -0.48], to: [-0.65, -0.48] },
    { kind: "line", from: [0.65, 0.48], to: [0.95, 0.48] },
    { kind: "line", from: [0.65, 0], to: [0.95, 0] },
    { kind: "line", from: [0.65, -0.48], to: [0.95, -0.48] },
    { kind: "circle", center: [0, 0], radius: 0.24 },
  ];
  const peopleParts: ShapePart[] = [
    { kind: "circle", center: [-1.25, 0.58], radius: 0.34 },
    { kind: "circle", center: [0, 0.78], radius: 0.38 },
    { kind: "circle", center: [1.25, 0.58], radius: 0.34 },
    { kind: "arc", center: [-1.25, -0.55], radius: 0.78, start: Math.PI * 0.08, end: Math.PI * 0.92 },
    { kind: "arc", center: [0, -0.48], radius: 0.88, start: Math.PI * 0.08, end: Math.PI * 0.92 },
    { kind: "arc", center: [1.25, -0.55], radius: 0.78, start: Math.PI * 0.08, end: Math.PI * 0.92 },
    { kind: "line", from: [-0.91, 0.58], to: [-0.38, 0.76] },
    { kind: "line", from: [0.38, 0.76], to: [0.91, 0.58] },
    { kind: "line", from: [-0.94, 0.28], to: [-0.34, 0.5] },
    { kind: "line", from: [0.34, 0.5], to: [0.94, 0.28] },
  ];
  const collapseParts: ShapePart[] = [
    { kind: "line", from: [0, 1.55], to: [0.28, 0.28] },
    { kind: "line", from: [0.28, 0.28], to: [1.55, 0] },
    { kind: "line", from: [1.55, 0], to: [0.28, -0.28] },
    { kind: "line", from: [0.28, -0.28], to: [0, -1.55] },
    { kind: "line", from: [0, -1.55], to: [-0.28, -0.28] },
    { kind: "line", from: [-0.28, -0.28], to: [-1.55, 0] },
    { kind: "line", from: [-1.55, 0], to: [-0.28, 0.28] },
    { kind: "line", from: [-0.28, 0.28], to: [0, 1.55] },
    { kind: "circle", center: [0, 0], radius: 0.72 },
    { kind: "circle", center: [0, 0], radius: 1.12 },
  ];

  for (let i = 0; i < count; i++) {
    const k = i * 3;
    const a = random() * Math.PI * 2;
    const b = Math.acos(2 * random() - 1);
    const r = 1.05 + (random() - 0.5) * 0.32;
    core[k] = Math.sin(b) * Math.cos(a) * r;
    core[k + 1] = Math.cos(b) * r;
    core[k + 2] = Math.sin(b) * Math.sin(a) * r;

    setShapePoint(network, k, i, count, networkParts, random);
    setShapePoint(research, k, i, count, researchParts, random);
    setShapePoint(build, k, i, count, buildParts, random);
    setShapePoint(people, k, i, count, peopleParts, random);
    setShapePoint(collapse, k, i, count, collapseParts, random);

    const quadrant = i % 4;
    const centers = [[0, 1.05], [1.05, 0], [0, -1.05], [-1.05, 0]];
    const progress = ((i - quadrant) / 4) / Math.ceil(count / 4);
    const point = diamondPoint(progress, 0.68);
    mark[k] = centers[quadrant][0] + point.x + (random() - 0.5) * 0.035;
    mark[k + 1] = centers[quadrant][1] + point.y + (random() - 0.5) * 0.035;
    mark[k + 2] = (random() - 0.5) * 0.08;
  }
  return { hero: core, network, research, build, people, collapse, mark };
}

function Particles({ state }: { state: SceneState }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useRef<THREE.BufferGeometry>(null);
  const targets = useMemo(() => createTargets(COUNT), []);
  const current = useMemo(() => new Float32Array(targets.hero), [targets]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const target = targets[state];
    for (let i = 0; i < current.length; i += 3) {
      current[i] += (target[i] - current[i]) * 0.035;
      current[i + 1] += (target[i + 1] - current[i + 1]) * 0.035;
      current[i + 2] += (target[i + 2] - current[i + 2]) * 0.035;
    }
    const attr = geometry.current?.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (attr) {
      attr.array.set(current);
      attr.needsUpdate = true;
    }
    if (points.current) {
      const baseRotation = state === "hero" ? clock.elapsedTime * 0.08 : Math.sin(clock.elapsedTime * 0.2) * 0.055;
      points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, baseRotation + pointer.current.x * 0.04, 0.04);
      points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, pointer.current.y * 0.06, 0.04);
      points.current.rotation.z = Math.sin(clock.elapsedTime * 0.15) * 0.025;
      points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, pointer.current.x * 0.12, 0.035);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e7e7e2" size={0.022} sizeAttenuation transparent opacity={0.78} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function Experience() {
  const [state, setState] = useState<SceneState>("hero");
  const SceneIcon = sceneVisuals[state].icon;

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const next = visible?.target.getAttribute("data-scene") as SceneState | null;
      if (next) setState(next);
    }, { threshold: [0.2, 0.35, 0.5, 0.65] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="experience" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={["#050505", 4.5, 10]} />
        <Particles state={state} />
      </Canvas>
      <div className={`experience__hologram experience__hologram--${state}`}>
        <span className="experience__orbit" />
        <span className="experience__orbit experience__orbit--inner" />
        <div className="experience__symbol"><SceneIcon size={38} strokeWidth={1.2} /></div>
        <span className="experience__status">{sceneVisuals[state].label}</span>
      </div>
      <div className="experience__glow" />
    </div>
  );
}
