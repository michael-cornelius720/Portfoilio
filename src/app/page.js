"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  profile,
  skills,
  experience,
  projects,
  education,
  achievements,
  certifications,
  navLinks,
} from "@/data/resume";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background decoration blur orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
      
      {/* Interactive Background Particles */}
      <BackgroundParticles />
      
      <Header />
      <main className="relative z-10">
        <Hero />
        <TechTicker />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------- Background Particles ---------------------------- */

function BackgroundParticles() {
  useEffect(() => {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 50;
    const connectionDistance = 120;
    let mouse = { x: null, y: null, radius: 180 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 2 + 0.6;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around borders
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Interactive mouse force
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Flee direction
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    init();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Drawing node lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08;
            ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="particles-canvas"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}

/* ---------------------------------- Header --------------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-[family-name:var(--font-mono)] text-sm tracking-wide gold-text">
          M.S.P
        </a>
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline focus-ring font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-[var(--ivory)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="focus-ring rounded-full border border-[var(--gold)] px-4 py-1.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide gold-text transition-all hover:bg-[var(--gold)] hover:text-[#030712] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
        >
          Say hello
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------- Hero ----------------------------------- */

function Hero() {
  return (
    <section id="top" className="reveal-on-scroll active mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
      <div className="grid gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <p className="eyebrow mb-5">Software Engineer Intern · Full Stack</p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] md:text-6xl text-gradient-gold font-bold">
            {profile.name.split(" ")[0]} {profile.name.split(" ")[1]}
            <br />
            <span className="italic text-muted">{profile.name.split(" ")[2]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Building responsive, AI-powered products with{" "}
            <span className="gold-text font-medium">React</span>,{" "}
            <span className="gold-text font-medium">Next.js</span> and{" "}
            <span className="gold-text font-medium">Node.js</span> — from Karwar, Karnataka.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring rounded-full bg-[var(--gold)] px-6 py-2.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[#030712] transition-transform hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Email me
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline focus-ring font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-muted hover:text-[var(--ivory)]"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline focus-ring font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-muted hover:text-[var(--ivory)]"
            >
              LinkedIn ↗
            </a>
          </div>
          <p className="mt-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-muted">
            {profile.location} · {profile.phone}
          </p>
        </div>

        <div className="image-container relative mx-auto w-full max-w-sm transition-transform duration-500 hover:scale-[1.02]">
          <div className="image-border-glow" aria-hidden />
          <div className="panel relative overflow-hidden rounded-[1.75rem] border border-[var(--line)]">
            <Image
              src="/profile.jpeg"
              alt={`Portrait of ${profile.name}`}
              width={900}
              height={1100}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechTicker() {
  const stack = [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "OpenAI API",
    "PostgreSQL",
    "Tailwind CSS",
    "Express",
    "Python",
  ];
  const items = [...stack, ...stack];
  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--bg-panel)] py-3">
      <div className="ticker-track flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-muted"
          >
            {item} <span className="gold-text">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------- About ---------------------------------- */

function About() {
  return (
    <section id="about" className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="01 — About" title="Summary" />
      <p className="max-w-3xl text-lg leading-relaxed text-muted">{profile.summary}</p>
    </section>
  );
}

/* ---------------------------------- Skills ---------------------------------- */

function Skills() {
  return (
    <section id="skills" className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="02 — Toolkit" title="Skills" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.label} className="panel rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <p className="eyebrow mb-4">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--ivory)] transition-all hover:bg-[var(--line)] hover:scale-[1.03] duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Experience -------------------------------- */

function Experience() {
  return (
    <section id="experience" className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="03 — Experience" title="Where I've worked" />
      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.role} className="chain-line flex gap-6 pl-2">
            <div className="chain-node mt-2" />
            <div className="panel flex-1 rounded-2xl p-7 hover:border-[var(--gold)]/30">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ivory)] font-semibold">{job.role}</h3>
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide gold-text">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-muted">{job.org}</p>
              <p className="mt-0.5 text-sm text-muted/80">{job.place}</p>
              <ul className="mt-5 space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-[var(--ivory)]">
                    <span className="gold-text font-bold">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-[family-name:var(--font-mono)] text-xs text-muted/80">{job.stack}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Projects --------------------------------- */

function Projects() {
  return (
    <section id="projects" className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="04 — Projects" title="Selected work" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.name} className="panel flex flex-col rounded-2xl p-7 hover:border-[var(--gold)]/30">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ivory)] font-semibold">{p.name}</h3>
              <span className="rounded-full border border-[var(--gold)] px-3 py-1 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-wide gold-text">
                {p.highlight}
              </span>
            </div>
            <p className="mt-1 gold-text">{p.tagline}</p>
            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="font-[family-name:var(--font-mono)] text-xs text-muted/70">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Education -------------------------------- */

function Education() {
  return (
    <section id="education" className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="05 — Education" title="Academic background" />
      <div className="space-y-8">
        {education.map((e) => (
          <div key={e.degree} className="chain-line flex gap-6 pl-2">
            <div className="chain-node mt-1.5" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-2 border-b border-[var(--line)] pb-6">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--ivory)] font-medium">{e.degree}</h3>
                <p className="text-muted">{e.school}</p>
                {e.detail && <p className="text-sm gold-text mt-1">{e.detail}</p>}
              </div>
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-muted/80">
                {e.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Achievements -------------------------------- */

function Achievements() {
  return (
    <section className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="06 — Recognition" title="Achievements" />
          <ul className="space-y-5">
            {achievements.map((a) => (
              <li key={a.title} className="panel rounded-2xl p-5 hover:border-[var(--gold)]/30">
                <p className="font-[family-name:var(--font-display)] text-lg text-[var(--ivory)] font-medium">{a.title}</p>
                <p className="mt-1 text-sm text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="07 — Credentials" title="Certifications" />
          <ul className="space-y-5">
            {certifications.map((c) => (
              <li key={c.name} className="panel rounded-2xl p-5 hover:border-[var(--gold)]/30">
                <p className="font-[family-name:var(--font-display)] text-lg text-[var(--ivory)] font-medium">{c.name}</p>
                <p className="mt-1 text-sm gold-text">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Contact ---------------------------------- */

function Contact() {
  return (
    <section id="contact" className="reveal-on-scroll mx-auto max-w-6xl px-6 py-20">
      <div className="panel relative overflow-hidden rounded-3xl p-12 md:p-20 text-center border border-[var(--line)] bg-gradient-to-b from-[var(--bg-panel)] to-transparent">
        {/* Glow behind the CTA content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)]/10 blur-[80px] rounded-full pointer-events-none" />

        <p className="eyebrow mb-5">08 — Contact</p>
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-gradient-gold font-bold">
          Let's build something.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-muted">
          Open to Software Engineer Internship roles — reach out and I'll get back to you.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5 relative z-10">
          <a
            href={`mailto:${profile.email}`}
            className="focus-ring rounded-full bg-[var(--gold)] px-8 py-3.5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[#030712] font-semibold transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {profile.email}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-muted relative z-10">
          <a href={`tel:${profile.phone}`} className="link-underline focus-ring hover:text-[var(--ivory)] transition-colors">
            {profile.phone}
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="link-underline focus-ring hover:text-[var(--ivory)] transition-colors">
            GitHub ↗
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="link-underline focus-ring hover:text-[var(--ivory)] transition-colors">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-8 relative z-10">
      <p className="text-center font-[family-name:var(--font-mono)] text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} — Built with Next.js.
      </p>
    </footer>
  );
}

/* ------------------------------ Shared bits ------------------------------ */

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-gradient font-bold">{title}</h2>
    </div>
  );
}
