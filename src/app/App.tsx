import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT = "#4da6ff";
const ACCENT_DIM = "rgba(77,166,255,0.55)";

// ─── Background oscilloscope (very dim, decorative) ──────────────────────────

function HeroBackground() {
  const W = 1200;
  const H = 520;

  // Multi-layer signal: sum of harmonics resembling a real measurement
  const pts: string[] = [];
  for (let i = 0; i <= 500; i++) {
    const x = (i / 500) * W;
    const t = (i / 500) * Math.PI * 8;
    const y =
      H * 0.52 -
      (Math.sin(t) * 110 +
        Math.sin(t * 2.1) * 38 +
        Math.sin(t * 4.9) * 14 +
        Math.sin(t * 11.3) * 5);
    pts.push(
      `${x.toFixed(1)},${Math.max(10, Math.min(H - 10, y)).toFixed(1)}`,
    );
  }
  const sine = `M ${pts.join(" L ")}`;

  // Square wave (digital signal underneath)
  const sqPts: string[] = [];
  const steps = 14;
  let sy = H * 0.72;
  sqPts.push(`0,${sy}`);
  for (let i = 0; i < steps; i++) {
    const x = (i / steps) * W;
    sqPts.push(`${x.toFixed(1)},${sy}`);
    sy = sy < H * 0.5 ? H * 0.72 : H * 0.28;
    sqPts.push(`${x.toFixed(1)},${sy}`);
  }
  sqPts.push(`${W},${sy}`);
  const square = `M ${sqPts.join(" L ")}`;

  const gridCols = 10;
  const gridRows = 5;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Grid lines */}
      {Array.from({ length: gridRows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={(H / gridRows) * i}
          x2={W}
          y2={(H / gridRows) * i}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: gridCols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={(W / gridCols) * i}
          y1="0"
          x2={(W / gridCols) * i}
          y2={H}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {/* Center axis */}
      <line
        x1="0"
        y1={H * 0.52}
        x2={W}
        y2={H * 0.52}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
      />
      {/* Square wave */}
      <path
        d={square}
        fill="none"
        stroke="rgba(77,166,255,0.09)"
        strokeWidth="1.5"
      />
      {/* Main sine trace */}
      <path
        d={sine}
        fill="none"
        stroke="rgba(77,166,255,0.14)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          filter: "drop-shadow(0 0 8px rgba(77,166,255,0.08))",
          strokeDasharray: 6000,
          animation: "traceReveal 3s ease-out forwards",
        }}
      />
    </svg>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span
        className="font-mono text-xs"
        style={{ color: ACCENT_DIM }}
      >
        {num}
      </span>
      <h2
        className="text-3xl font-bold tracking-tight uppercase"
        style={{
          fontFamily: "Rajdhani, sans-serif",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  org: string;
  summary: string;
  detail: string;
  tags: string[];
  featured: boolean;
  specs: { label: string; value: string }[];
  link?: { label: string; url: string };
  photos?: { src: string; alt: string }[];
}

const projects: Project[] = [
  {
    id: "01",
    title: "Stanford Camera Trap Network",
    org: "Stanford Smart Sensing Systems Lab (PI: Zerina Kapetanovic)",
    summary:
      "Hardware and firmware development of remote field sensor for ultra-low-power consumption and semi-permanent wireless operation.",
    detail:
      "Camera traps are used by field ecologists to collect data from remote wilderness or biological reserves to better understand animal behavior. However, image processing, classification, and even data retrieval remain highly manual tasks that limit research throughput.\n\nThrough this project, we aim to improve ecologists' workflow by providing:\n\n• Onboard intelligence for data classification using an inverted vector table for fast query and minimal communication overhead\n• Wireless communication via LoRa in a mesh network to reduce manual retrieval frequency\n• Low-power operation for system longevity and compatibility with commercial batteries\n\nWe are currently designing a minimally-sized PCB based on the STM32N657, with MIPI-CSI, USB, and SDIO high-speed communication lines for the sensing and storage modalities we need.",
    tags: [
      "Embedded C",
      "PCB Design",
      "High-speed design",
      "LoRa",
    ],
    featured: true,
    photos: [
      { src: "IMG_6360.jpg", alt: "Camera trap prototype field deployment against other commerical systems" },
      { src: "IMG_4660.jpg", alt: "Camera trap field deployment scene" },
    ],
    specs: [
      { label: "Started", value: "Apr 2025" },
      {
        label: "Status",
        value: "Prototype complete, PCB in development",
      },
    ],
  },
  {
    id: "02",
    title: "Stanford Escape",
    org: "Stanford Student Robotics / Stanford ACM",
    summary:
      "In-person on-campus escape room designed and crafted by team of engineers, theater artists, and creative designers.",
    detail:
      "As an escape room enthusiast, I always wondered what it would take to build one from scratch. That opportunity arrived with Stanford Escape.\n\nThroughout the 2025–2026 academic year, I led a multidisciplinary team of 15–20 students to design and construct an immersive, The Matrix-themed escape room. Utilizing Stanford Electrical Engineering’s Lab64 makerspace, we engineered interactive hardware puzzles from the ground up. Simultaneously, we collaborated with the Theater and Performance Studies department to construct custom walls, successfully transforming a restricted physical environment into a seamless two-room experience.\n\nThis project was not only a personal milestone but also an incredible leadership experience, allowing me to bridge the gap between technical engineering and creative, outside-the-box storytelling.",
    tags: [
      "Leadership",
      "Circuit design",
      "Embedded Python",
      "Mechanical prototyping",
    ],
    featured: false,
    link: { label: "View our Website", url: "https://escaperoom.stanford.edu/photos" },
    photos: [
      { src: "KC_04806.JPG", alt: "Escape room overview" },
      { src: "KC_04752.JPG", alt: "Escape room puzzle - 1" },
      { src: "KC_04778.JPG", alt: "Escape room video game" },
      { src: "KC_04802.JPG", alt: "Escape room puzzle - 2" },
    ],
    specs: [
      { label: "Started", value: "Aug 2025" },
      { label: "Status", value: "Finished" },
      { label: "Ended", value: "May 2026" },
    ],
  },
  {
    id: "03",
    title: "Digital RGB Clock PCB",
    org: "EE 156/256: Board Level Design",
    summary:
      "PCB design for a 7-segment 4-digit clock display.",
    detail:
      "In this end-to-end PCB project, I designed a digital clock combining a 7-segment 4-digit display to show the time and temperature/lux sensors to allow for dynamic color shifting and dimming/brightening of the display. The project incorporates I2C, SPI, UART and SWD communication interfaces to support all the functionalities.",
    tags: [
      "KiCad",
      "Python",
      "Circuit design",
    ],
    featured: false,
    photos: [
      { src: "IMG_3959.jpeg", alt: "RGB clock PCB" },
      { src: "IMG_3961.jpeg", alt: "RGB clock assembled" },
    ],
    specs: [
      { label: "Started", value: "Sept 2024" },
      { label: "Status", value: "Finished" },
      { label: "Ended", value: "Dec 2024"},
    ],
  },
  {
    id: "04",
    title: "Through-Wall Sensing with mmWave Radar",
    org: "Stanford EE 119/219: 3D+ Imaging Sensors",
    summary:
      "FMCW radar detection and tracking of human movement behind walls.",
    detail:
      "In this project, we leveraged a TI IWR6843ISK 60GHz FMCW radar to achieve through-wall sensing of human movement. To optimize the system for our specific environment, we systematically configured the FMCW chirp parameters—fine-tuning the maximum unambiguous range, velocity limits, and their respective resolutions. Using the resulting Range-Doppler plots, we developed a target identification algorithm to accurately detect human motion across successive frames.",
    tags: [
      "3D+ sensing",
      "Radars",
      "Image signal processing",
    ],
    featured: false,
    photos: [
      { src: "Thicksquare.jpg", alt: "mmWave radar setup" },
      { src: "thickwall_tracking.png", alt: "Through-wall detection output" },
    ],
    specs: [
      { label: "Started", value: "Apr 2026" },
      { label: "Status", value: "Finished" },
      { label: "Ended", value: "June 2026" },
    ],
  },
];

const skillGroups = [
  {
    mono: "SIG_PROC",
    label: "Signal Processing",
    skills: [
      "DSP",
      "FIR Filters",
      "Fourier Analysis",
      "FFT",
      "Stochastic Signals",
    ],
  },
  {
    mono: "CTRL",
    label: "Control Systems",
    skills: [
      "Laplace/Z-domain Analysis",
      "Stability Analysis",
      "Bode Analysis",
      "Feedback Systems",
    ],
  },
  {
    mono: "SENS_MOD",
    label: "Sensing Modalities",
    skills: [
      "Radars",
      "ToF Camera",
      "Ultrasonic Sensors",
      "IMU",
      "Capacitive Touch Sensor/Array",
      "EEG",
    ],
  },
  {
    mono: "EMBED_SYS",
    label: "Embedded Systems",
    skills: [
      "C / C++",
      "Python",
      "FPGAs",
      "Verilog",
      "RTOS",
      "I2C / SPI / UART",
      "MIPI / SDIO / USB"
    ],
  },
  {
    mono: "HW_DESIGN",
    label: "Hardware Design",
    skills: [
      "KiCad",
      "Altium",
      "LTSPICE Simulation",
      "Bench Equipment"
    ],
  },
  {
    mono: "SW_TOOLS",
    label: "Software & Tools",
    skills: [
      "Python",
      "C/C++",
      "MATLAB",
      "Linux",
      "Git",
    ],
  },
];

// ─── Project detail page ──────────────────────────────────────────────────────

function ProjectPage({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <style>{`
        @keyframes traceReveal {
          from { stroke-dashoffset: 6000; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Back nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/8"
        style={{
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs transition-colors"
            style={{ color: "rgba(240,240,240,0.65)" }}
            onMouseEnter={(e) =>
              ((
                e.currentTarget as HTMLButtonElement
              ).style.color = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              ((
                e.currentTarget as HTMLButtonElement
              ).style.color = "rgba(240,240,240,0.65)")
            }
          >
            <ArrowLeft size={12} />
            BACK
          </button>
          <span
            className="font-mono text-[10px]"
            style={{ color: "rgba(240,240,240,0.25)" }}
          >
            /
          </span>
          <span
            className="font-mono text-[10px]"
            style={{ color: "rgba(240,240,240,0.5)" }}
          >
            projects
          </span>
          <span
            className="font-mono text-[10px]"
            style={{ color: "rgba(240,240,240,0.25)" }}
          >
            /
          </span>
          <span
            className="font-mono text-[10px]"
            style={{ color: ACCENT_DIM }}
          >
            {project.id}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-12">
          <div
            className="font-mono text-[11px] mb-2"
            style={{ color: "rgba(240,240,240,0.6)" }}
          >
            {project.id} // {project.org}
          </div>
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] px-2.5 py-1 border"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(240,240,240,0.7)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] mt-5 px-4 py-2.5 border transition-all"
              style={{
                borderColor: `rgba(77,166,255,0.35)`,
                color: ACCENT,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT;
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(77,166,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(77,166,255,0.35)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              <ArrowUpRight size={12} />
              {project.link.label}
            </a>
          )}
        </div>

        {/* Hero photo slot */}
        <div
          className="w-full mb-12 overflow-hidden"
          style={{ height: "340px", background: "rgba(255,255,255,0.02)" }}
        >
          {project.photos?.[0] ? (
            <img
              src={project.photos[0].src}
              alt={project.photos[0].alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center border border-dashed"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <div className="text-center pointer-events-none select-none">
                <div className="font-mono text-[11px] mb-1" style={{ color: "rgba(240,240,240,0.25)" }}>PHOTO_01</div>
                <div className="font-mono text-[10px]" style={{ color: "rgba(240,240,240,0.18)" }}>replace with image</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-[1fr_260px] gap-12 items-start">
          {/* Description */}
          <div>
            <div
              className="h-px mb-8"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div className="space-y-4">
              {project.detail.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                const isList = lines.every((l) =>
                  l.startsWith("•"),
                );
                if (isList) {
                  return (
                    <ul key={i} className="space-y-2">
                      {lines.map((l, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-base leading-relaxed"
                          style={{
                            color: "rgba(240,240,240,0.82)",
                          }}
                        >
                          <span
                            style={{
                              color: ACCENT_DIM,
                              flexShrink: 0,
                            }}
                          >
                            —
                          </span>
                          <span>{l.replace(/^•\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed"
                    style={{ color: "rgba(240,240,240,0.82)" }}
                  >
                    {block}
                  </p>
                );
              })}
            </div>

            {/* Secondary photo slot */}
            <div
              className="mt-8 overflow-hidden"
              style={{ height: "220px", background: "rgba(255,255,255,0.015)" }}
            >
              {project.photos?.[1] ? (
                <img
                  src={project.photos[1].src}
                  alt={project.photos[1].alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center border border-dashed"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="text-center pointer-events-none select-none">
                    <div className="font-mono text-[11px] mb-1" style={{ color: "rgba(240,240,240,0.25)" }}>PHOTO_02</div>
                    <div className="font-mono text-[10px]" style={{ color: "rgba(240,240,240,0.18)" }}>replace with image</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spec table */}
          <div className="border border-white/8 p-5">
            <div
              className="font-mono text-[10px] uppercase tracking-widest mb-4"
              style={{ color: "rgba(240,240,240,0.4)" }}
            >
              SPECS
            </div>
            <div className="space-y-0 divide-y divide-white/6">
              {project.specs.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between py-3 gap-4 last:border-b-0"
                >
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider flex-shrink-0"
                    style={{ color: "rgba(240,240,240,0.5)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-mono text-[12px] text-right font-medium"
                    style={{ color: "rgba(240,240,240,0.85)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main portfolio ───────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  // If a project is selected, render the detail page
  if (selectedProject) {
    return (
      <ProjectPage
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  const goto = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });

  const navLinks = [
    "home",
    "projects",
    "skills",
    "contact",
  ] as const;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <style>{`
        @keyframes traceReveal {
          from { stroke-dashoffset: 6000; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .cursor-blink { animation: blink 1.1s step-end infinite; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); }
      `}</style>

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/8"
        style={{
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => goto(id)}
                className="font-mono text-[11px] uppercase tracking-wider transition-colors"
                style={{
                  color:
                    activeSection === id
                      ? "#f0f0f0"
                      : "rgba(240,240,240,0.6)",
                }}
                onMouseEnter={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.color = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.color =
                    activeSection === id
                      ? "#f0f0f0"
                      : "rgba(240,240,240,0.6)")
                }
              >
                {activeSection === id && (
                  <span
                    style={{ color: ACCENT, marginRight: 4 }}
                  >
                    //
                  </span>
                )}
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        id="home"
        className="min-h-screen pt-14 flex items-center relative overflow-hidden"
      >
        {/* Hero background image — replace src when ready */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Replace this div with: <img src="your-banner.jpg" alt="" className="w-full h-full object-cover" /> */}
          <div className="w-full h-full" style={{ background: "#080808" }} />
        </div>

        {/* Dark overlay so text stays legible over any photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(8,8,8,0.55)" }}
        />

        {/* Fade at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
        />

        <div className="max-w-6xl mx-auto px-6 w-full py-28 relative z-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-stretch">
          <div className="">
            <div
              className="font-mono text-[11px] mb-6 flex items-center gap-2"
              style={{ color: "rgba(240,240,240,0.65)" }}
            >
              <span style={{ color: ACCENT }}>{">"}</span>
              <span>Users</span>
              <span style={{ color: "rgba(240,240,240,0.35)" }}>
                /
              </span>
              <span>Sam Chen</span>
              <span style={{ color: "rgba(240,240,240,0.35)" }}>
                /
              </span>
              <span>portfolio</span>
              <span
                className="cursor-blink"
                style={{ color: ACCENT }}
              >
                _
              </span>
            </div>

            <h1
              className="text-6xl lg:text-7xl font-bold leading-none mb-5"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                letterSpacing: "-0.01em",
                color: "#f0f0f0",
              }}
            >
              Shuan-Lin
              <br />
              <span style={{ color: "rgba(240,240,240,0.6)" }}>
                (Sam){" "}
              </span>
              Chen
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: ACCENT }}
              />
              <p
                className="font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  letterSpacing: "0.12em",
                  color: "rgba(240,240,240,0.75)",
                  fontSize: "0.9rem",
                }}
              >
                Electrical Engineer · embedded engineer
              </p>
            </div>

            <p
              className="text-sm leading-relaxed mb-7 max-w-lg"
              style={{ color: "rgba(240,240,240,0.75)" }}
            >
              Stanford M.S. and B.S. EE student focused on
              signal processing, control systems, and embedded
              hardware. Motivated by building systems that
              bridge the physical and digital — from life-sized
              parts to circuits to the firmware layer.
            </p>

            <div className="flex flex-wrap gap-2 mb-9">
              {[
                "Signal Processing",
                "Control Systems",
                "Embedded Systems",
                "PCB Design",
              ].map((d) => (
                <span
                  key={d}
                  className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 border cursor-default"
                  style={{
                    borderColor: "rgba(77,166,255,0.25)",
                    color: "rgba(240,240,240,0.7)",
                  }}
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                {
                  href: "mailto:samchen2@stanford.edu",
                  icon: <Mail size={11} />,
                  label: "EMAIL",
                },
                {
                  href: "https://www.linkedin.com/in/shuan-lin-chen-6b1401260/",
                  icon: <Linkedin size={11} />,
                  label: "LINKEDIN",
                },
                {
                  href: "https://github.com/samshuanlin",
                  icon: <Github size={11} />,
                  label: "GITHUB",
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] px-4 py-2.5 border transition-all"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "rgba(240,240,240,0.75)",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.borderColor =
                      "rgba(255,255,255,0.5)";
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.color = "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.borderColor =
                      "rgba(255,255,255,0.2)";
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.color = "rgba(240,240,240,0.75)";
                  }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Portrait photo slot */}
          <div
            className="hidden md:self-stretch md:block flex-shrink-0 overflow-hidden"
            style={{ width: "200px" }}
          >
            <img src="front.jpg" alt="Sam Chen" className="w-full h-full object-cover object-top" />
          </div>

          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="py-24 border-t border-white/8"
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader num="01" title="Projects" />

          <div className="grid md:grid-cols-2 gap-px bg-white/8">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="text-left p-6 transition-colors group relative"
                style={{ background: "#080808" }}
                onMouseEnter={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.background =
                    "rgba(255,255,255,0.025)")
                }
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.background = "#080808")
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div
                      className="font-mono text-[10px] mb-1"
                      style={{ color: "rgba(240,240,240,0.6)" }}
                    >
                      {p.id} // {p.org}
                    </div>
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        color: "#f0f0f0",
                      }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span
                        className="font-mono text-[9px] px-2 py-0.5"
                        style={{
                          color: ACCENT,
                          border: `1px solid ${ACCENT}44`,
                        }}
                      >
                        ACTIVE
                      </span>
                    )}
                    <ArrowUpRight
                      size={14}
                      style={{ color: "rgba(240,240,240,0.4)" }}
                      className="group-hover:opacity-100 opacity-0 transition-opacity"
                    />
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(240,240,240,0.75)" }}
                >
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 border"
                      style={{
                        borderColor: "rgba(255,255,255,0.12)",
                        color: "rgba(240,240,240,0.65)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom border hint */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to right, ${ACCENT}44, transparent)`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        id="skills"
        className="py-24 border-t border-white/8"
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader num="02" title="Technical Skills" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {skillGroups.map((g) => (
              <div
                key={g.mono}
                className="p-6 transition-colors"
                style={{ background: "#080808" }}
                onMouseEnter={(e) =>
                  ((
                    e.currentTarget as HTMLDivElement
                  ).style.background = "rgba(255,255,255,0.02)")
                }
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLDivElement
                  ).style.background = "#080808")
                }
              >
                <div
                  className="font-mono text-[10px] mb-1"
                  style={{ color: ACCENT_DIM }}
                >
                  {g.mono}
                </div>
                <div
                  className="text-base font-semibold mb-4"
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    color: "#f0f0f0",
                  }}
                >
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-1 border cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "rgba(240,240,240,0.72)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="py-24 border-t border-white/8"
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader num="03" title="Contact" />

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p
                className="text-sm leading-relaxed mb-8 max-w-md"
                style={{ color: "rgba(240,240,240,0.78)" }}
              >
                Actively seeking opportunities in sensor engineering, 3D vision engineering, and data analysis for physical AI/robotics. Based in
                Stanford, CA with roots in Taipei, Taiwan.
              </p>
              <div className="space-y-3">
                {[
                  {
                    href: "mailto:samchen2@stanford.edu",
                    label: "samchen2@stanford.edu",
                    icon: <Mail size={11} />,
                  },
                  {
                    href: "mailto:samchen2112@gmail.com",
                    label: "samchen2112@gmail.com",
                    icon: <Mail size={11} />,
                  },
                  {
                    href: "https://www.linkedin.com/in/shuan-lin-chen-6b1401260/",
                    label: "linkedin.com/in/shuan-lin-chen-6b1401260",
                    icon: <Linkedin size={11} />,
                  },
                  {
                    href: "https://github.com",
                    label: "github.com/samshuanlin",
                    icon: <Github size={11} />,
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={
                      href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-sm transition-colors"
                    style={{ color: "rgba(240,240,240,0.75)" }}
                    onMouseEnter={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.color = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.color = "rgba(240,240,240,0.75)")
                    }
                  >
                    <span style={{ color: ACCENT_DIM }}>
                      {icon}
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-white/8 p-6">
              <div
                className="font-mono text-[10px] uppercase tracking-widest mb-5"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                STATUS
              </div>
              <div className="space-y-0 divide-y divide-white/6">
                {[
                  {
                    key: "LOCATION",
                    val: "Stanford, CA / Taipei, TW",
                  },
                  {
                    key: "STATUS",
                    val: "Open to full-time positions",
                    accent: true,
                  },
                  { key: "GRADUATION", val: "June 2027" },
                  {
                    key: "DEGREE",
                    val: "M.S./B.S. Electrical Engineering",
                  },
                  {
                    key: "EMAIL",
                    val: "samchen2@stanford.edu / samchen2112@gmail.com",
                  },
                ].map(({ key, val, accent }) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2.5 gap-4"
                  >
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider flex-shrink-0"
                      style={{ color: "rgba(240,240,240,0.6)" }}
                    >
                      {key}
                    </span>
                    <span
                      className="font-mono text-[11px] text-right"
                      style={{
                        color: accent
                          ? ACCENT
                          : "rgba(240,240,240,0.82)",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/8 py-7">
        <div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between font-mono text-[10px]"
          style={{ color: "rgba(240,240,240,0.5)" }}
        >
          <span>© 2026 Shuan-Lin (Sam) Chen</span>
          <span>samchen2@stanford.edu</span>
        </div>
      </footer>
    </div>
  );
}