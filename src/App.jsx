import { useEffect, useRef, useState } from "react";
import {
  Radio,
  Cpu,
  Focus,
  BellRing,
  Wifi,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import productImg from "./assets/pawping-produk.png"; // foto hero
import logoImg from "./assets/pet-pawping-logo2.png"; // logo navbar & footer
import "./App.css";

/* ====== GANTI INI ======
   Taruh file APK di folder /public dengan nama pawping.apk,
   atau ganti dengan link Google Drive / GitHub Releases. */
const APK_URL = "/pawping.apk";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "features", label: "Features" },
  { id: "how", label: "How It Works" },
];

/* ---------- Custom icons (menyerupai desain) ---------- */
const Esp32Icon = () => (
  <svg viewBox="0 0 48 48" className="icon-stat" aria-hidden="true">
    <rect x="5" y="5" width="38" height="38" rx="6" fill="none" stroke="#3f6fcf" strokeWidth="2" strokeDasharray="3 3" />
    <rect x="12" y="12" width="24" height="24" rx="3" fill="#cfe0fa" />
    <text x="24" y="29" textAnchor="middle" fontSize="13" fontFamily="Inter, sans-serif" fill="#3f6fcf">32</text>
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" className="icon-stat" aria-hidden="true">
    <g fill="currentColor" stroke="#fff" strokeWidth="1.2">
      <path d="M4 15v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
      <path d="M4 9.5v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
      <ellipse cx="12" cy="6" rx="8" ry="3" />
    </g>
  </svg>
);

const RulerIcon = () => (
  <svg viewBox="0 0 96 20" className="icon-ruler" aria-hidden="true">
    <rect x="1" y="1" width="94" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
    {Array.from({ length: 11 }).map((_, i) => (
      <line key={i} x1={9 + i * 7.8} x2={9 + i * 7.8} y1="1" y2={i % 2 === 0 ? 10 : 7} stroke="currentColor" strokeWidth="1.6" />
    ))}
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 32" className="icon-phone" aria-hidden="true">
    <rect x="3" y="2" width="18" height="28" rx="6" fill="#eef1f6" stroke="currentColor" strokeWidth="2" />
    <line x1="9" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const STATS = [
  { icon: <Esp32Icon />, title: "ESP32", desc: "Mikrocontroller" },
  { icon: <Radio className="icon-stat" strokeWidth={2.2} />, title: "Sensors", desc: "Detection" },
  { icon: <DatabaseIcon />, title: "Database", desc: "Data storage" },
];

const FEATURES = [
  {
    icon: <Focus className="icon-feat" strokeWidth={2} />,
    title: "Motion Detected",
    desc: "Detects animal movement using a PIR sensor, helping owners monitor activity around the detection area.",
  },
  {
    icon: <RulerIcon />,
    title: "Distance Measurement",
    desc: "Measures the distance of nearby objects using an ultrasonic sensor.",
  },
  {
    icon: <BellRing className="icon-feat" fill="currentColor" strokeWidth={1.5} />,
    title: "Buzzer Notification",
    desc: "Provides an audible alert through a buzzer when the configured detection conditions are met.",
  },
  {
    icon: <PhoneIcon />,
    title: "Real-Time Monitoring",
    desc: "Sends detection data through Wi-Fi to a database, allowing owners to access monitoring information through the app.",
  },
];

const STEPS = [
  {
    icon: Focus,
    title: "Sensor Detection",
    desc: "The PIR and ultrasonic sensors collect movement and distance data from the surrounding area.",
  },
  {
    icon: Cpu,
    title: "Data Processing",
    desc: "The ESP32 processes sensor readings and handles the configured detection conditions.",
  },
  {
    icon: Wifi,
    title: "Data Transmission",
    desc: "The ESP32 sends monitoring data through Wi-Fi to the database, where it can be accessed by the PawPing application.",
  },
  {
    icon: Bell,
    title: "Notification",
    desc: "The buzzer provides an additional sound alert when the configured conditions are met.",
  },
];

/* ---------- Navbar ---------- */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#home" className="brand" onClick={(e) => go(e, "home")}>
          <img src={logoImg} alt="" />
          <span>PAWPING</span>
        </a>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "is-active" : ""}
              onClick={(e) => go(e, n.id)}
            >
              {n.label}
            </a>
          ))}
          <a href={APK_URL} download="PawPing.apk" className="btn-try btn-try--mobile">
            Let&apos;s Try
          </a>
        </nav>

        <a href={APK_URL} download="PawPing.apk" className="btn-try btn-try--desktop">
          Let&apos;s Try
        </a>

        <button
          className="burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <span className="pill">
            <i className="dot" /> Pet Motion Detection &amp; Alarm System
          </span>
          <h1>
            Smarter Detection,
            <br />
            Closer to Animals.
          </h1>
          <p>
            An IoT-based innovation designed to detect animal presence using smart sensor
            technology.
          </p>
        </div>

        <img src={productImg} alt="Perangkat PawPing" className="hero__img float" />
      </div>

      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.title}>
            {s.icon}
            <strong>{s.title}</strong>
            <span>{s.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="about">
      <h2>
        About
        <br />
        Pawping
      </h2>
      <p>
        PawPing is an IoT-based monitoring system designed to help pet owners keep track of their
        animals. By integrating a PIR sensor, ultrasonic sensor, ESP32 microcontroller, and
        buzzer, PawPing can detect animal movement and measure the distance of nearby objects. The
        collected data is processed and transmitted through Wi-Fi to an integrated application,
        providing real-time monitoring information and making pet supervision easier and more
        convenient.
      </p>
    </section>
  );
}

/* ---------- Features (carousel) ---------- */
function Features() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const t = trackRef.current;
    const update = () => {
      setCanPrev(t.scrollLeft > 4);
      setCanNext(t.scrollLeft + t.clientWidth < t.scrollWidth - 4);
    };
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const slide = (dir) => {
    const t = trackRef.current;
    const c = t.children;
    const step = c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : c[0].offsetWidth;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="features" className="features">
      <h2>Pawping&rsquo;s Features</h2>

      <div className="carousel">
        <button
          className="chevron chevron--left"
          onClick={() => slide(-1)}
          disabled={!canPrev}
          aria-label="Fitur sebelumnya"
        >
          <ChevronLeft />
        </button>

        <div className="carousel__track" ref={trackRef}>
          {FEATURES.map((f) => (
            <article className="feature-card" key={f.title}>
              {f.icon}
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>

        <button
          className="chevron chevron--right"
          onClick={() => slide(1)}
          disabled={!canNext}
          aria-label="Fitur berikutnya"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  return (
    <section id="how" className="how">
      <h2>How It Works</h2>
      <p className="how__lead">
        Keep an eye on your pets through motion detection and distance monitoring. Pawping
        combines smart sensors and IoT technology to help pet owners stay informed about nearby
        animal activity.
      </p>

      <div className="panel">
        <div className="panel__head">
          <span className="live">
            <i className="dot dot--green" /> Real-time Sensor Sync Active
          </span>
          <span className="badge">4 Simple Steps</span>
        </div>

        <div className="steps">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <article className="step" key={title}>
              <div className="step__top">
                <span className="step__icon">
                  <Icon />
                </span>
                <span className="badge badge--step">Step 0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="brand brand--footer">
        <img src={logoImg} alt="" />
        <span>PAWPING</span>
      </div>
      <small>&copy; 2026 PawPing Technologies Inc. Vigilant pet care, peaceful homes.</small>
    </footer>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}