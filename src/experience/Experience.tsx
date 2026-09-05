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

function createTargets(count: number) {
  const core = new Float32Array(count * 3);
  const network = new Float32Array(count * 3);
  const research = new Float32Array(count * 3);
  const build = new Float32Array(count * 3);
  const people = new Float32Array(count * 3);
  const collapse = new Float32Array(count * 3);
  const mark = new Float32Array(count * 3);
  const random = createRandom(24081999);

  for (let i = 0; i < count; i++) {
    const k = i * 3;
    const a = random() * Math.PI * 2;
    const b = Math.acos(2 * random() - 1);
    const r = 1.05 + (random() - 0.5) * 0.32;
    core[k] = Math.sin(b) * Math.cos(a) * r;
    core[k + 1] = Math.cos(b) * r;
    core[k + 2] = Math.sin(b) * Math.sin(a) * r;

    const ring = i % 5;
    const rr = 0.65 + ring * 0.36 + random() * 0.18;
    network[k] = Math.cos(a) * rr;
    network[k + 1] = (random() - 0.5) * 2.4;
    network[k + 2] = Math.sin(a) * rr;

    const x = (random() - 0.5) * 4.6;
    research[k] = x;
    research[k + 1] = Math.sin(x * 2.1 + a) * 0.7 + (random() - 0.5) * 0.5;
    research[k + 2] = (random() - 0.5) * 1.5;

    const side = 2.4;
    build[k] = (random() - 0.5) * side;
    build[k + 1] = (random() - 0.5) * side;
    build[k + 2] = (random() - 0.5) * side;

    people[k] = (random() - 0.5) * 5.2;
    people[k + 1] = (random() - 0.5) * 1.4;
    people[k + 2] = -0.9 - random() * 1.4;

    const cr = random() * 0.65;
    collapse[k] = Math.cos(a) * cr;
    collapse[k + 1] = Math.sin(a) * cr;
    collapse[k + 2] = (random() - 0.5) * 0.24;

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
      points.current.rotation.y += 0.0008;
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
