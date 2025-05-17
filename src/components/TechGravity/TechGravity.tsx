import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "./TechGravity.scss";
import mouseCursor from "../../assets/mouseCursor.svg";

const LABELS = [
  "[ JAVASCRIPT ]",
  "[ React.JS ]",
  "[ Typescript ]",
  "[ Node.js ]",
  "[ Headless CMS ]",
  "[ React.JS ]",
  "[ Typescript ]",
  "[ Kubernetes ]",
  "[ NoSQL Databases ]",
  "[ Medusa Commerce ]",
  "[ Next.js ]",
  "[ Shopify ]",
  "[ SQL Databases ]",
];

const WIDTH = window.innerWidth - 84 > 1516 ? window.innerWidth - 84 : 1516;
const HEIGHT = 668;
const BLOCK_H = 48;
const GAP_Y = 49;

type Pos = { left: number; top: number; width: number };

export default function TechGravity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [positions, setPositions] = useState<Pos[]>([]);
  
  // for mouse cursor
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      const els = Array.from(container.children) as HTMLDivElement[];
      const half = Math.ceil(els.length / 2);
      const rows = [els.slice(0, half), els.slice(half)];

      const posList: Pos[] = [];
      rows.forEach((row, rowIndex) => {
        const totalWidth = row.reduce((sum, el) => sum + el.offsetWidth, 0);
        const space = (WIDTH - totalWidth) / (row.length - 1);
        let x = 0;

        row.forEach((el) => {
          const width = el.offsetWidth;
          const left = x;
          const top = rowIndex * (BLOCK_H + GAP_Y);
          posList.push({ left, top, width });
          x += width + space;
        });
      });

      setPositions(posList);
    });

    const timer = setTimeout(() => setStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Step 2: Physics falling from same coordinates
  useEffect(() => {
    if (!started || positions.length === 0) return;

    const { Engine, World, Bodies, Runner, Events } = Matter;
    const engine = Engine.create();
    engine.gravity.y = 4;
    const world = engine.world;

    // Add boundaries
    World.add(world, [
      Bodies.rectangle(WIDTH / 2, HEIGHT + 25, WIDTH, 54, { isStatic: true }),
      Bodies.rectangle(-25, HEIGHT / 2, 50, HEIGHT, { isStatic: true }),
      Bodies.rectangle(WIDTH + 26, HEIGHT / 2, 50, HEIGHT, { isStatic: true }),
    ]);

    const els = Array.from(containerRef.current!.children) as HTMLDivElement[];
    const bodies = positions.map((pos, i) => {
      const el = els[i];
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.top = "0";
      el.style.margin = "0";

      const x = pos.left + pos.width / 2;
      const y = pos.top + BLOCK_H / 2;

      const body = Bodies.rectangle(x, y, pos.width, BLOCK_H, {
        restitution: 1.4,
        friction: 1,
        frictionAir: 0.045,
        density: 100,
      });

      World.add(world, body);
      return { el, body, w: pos.width, h: BLOCK_H };
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    Events.on(engine, "afterUpdate", () => {
      bodies.forEach(({ el, body, w, h }) => {
        el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${
          body.angle
        }rad)`;
      });
    });

    return () => {
      Events.off(engine, "afterUpdate");
      World.clear(world, false);
      Engine.clear(engine);
      Runner.stop(runner);
    };
  }, [started, positions]);

  // for mouse cursor
  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);
  return (
    <div ref={containerRef} className="tech-gravity__container">
      {LABELS.map((label, i) => (
        <div
          key={i}
          className="tech-block"
          style={{
            left: positions[i]?.left ?? 0,
            top: positions[i]?.top ?? 0,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {label}
        </div>
      ))}

      {isHovering && (
        <img
          src={mouseCursor}
          className="cursor-block"
          style={{
            top: position.y - 3,
            left: position.x,
          }}
        />
      )}
    </div>
  );
}
