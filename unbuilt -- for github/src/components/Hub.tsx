import React, { useState, useRef, useEffect } from "react";
import { HUB_ITEMS } from "../data";

interface BlogArticle {
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const SAMPLE_BLOGS: BlogArticle[] = [
  {
    title: "Reviving Language through Active Storytelling",
    date: "May 12, 2026",
    excerpt: "How traditional memorization failed our children, and how storytelling and performance brought Chinese back to life.",
    content: "For years, Chinese school was seen as a weekend chore of memorizing stroke orders and characters. Mr. Yan noticed a sharp, alarming drop in student engagement. By transitioning classes towards modern role-play, short performances of Chinese myths, and active storybook writing, we saw an immediate 40% jump in vocabulary retention and children actually asking to join! Understanding heritage shouldn't be a test of rote memory, but an exploration of living narrative."
  },
  {
    title: "Preserving the Craft of Calligraphy in a Digital Era",
    date: "April 18, 2026",
    excerpt: "In a world of fast-moving keyboards, the calligraphy brush offers a slow, therapeutic connection to history.",
    content: "At our recent spring workshop, over forty youth held a traditional ink brush for the first time. The slow, intentional breathing and muscle control required to paint standard characters sparked a deep curiosity. Many participants noted it felt like a screenless meditation. This craft connects modern fingers directly with historical minds."
  },
  {
    title: "Culinary Heritage: Dumplings, Culture, and Classrooms",
    date: "March 5, 2026",
    excerpt: "Inside our food history session: learning cultural migration patterns through family recipes.",
    content: "Recipes are active living maps of migration. At our latest community service event, youth pairs interviewed local senior citizens of Asian descent, documenting family recipes and baking traditional stuffed dumplings. The outcome was a beautifully compiled community cookbook distributed across regional schools, bridging generations over a kitchen table."
  }
];

const PROVERBS = [
  { chinese: "上善若水", pinyin: "Shàng shàn ruò shuǐ", meaning: "The highest goodness is like water - nourishing all things without struggling, seeking humble ground." },
  { chinese: "厚德载物", pinyin: "Hòu dé zài wù", meaning: "A person of great character embraces all things with deep tolerance and generosity." },
  { chinese: "学无止境", pinyin: "Xué wú zhǐ jìng", meaning: "Learning is a endless horizon; knowledge is an infinite ocean of discovery." },
  { chinese: "海纳百川", pinyin: "Hǎi nà bǎi chuān", meaning: "The ocean is vast because it welcomes all rivers; great minds thrive through inclusion." },
  { chinese: "天道酬勤", pinyin: "Tiān dào chóu qín", meaning: "Under heaven's natural law, diligence, perseverance, and sincerity are always rewarded." }
];

const GUZHENG_STRINGS = [
  { name: "宫 (Gōng)", note: "D4", freq: 293.66 },
  { name: "商 (Shāng)", note: "E4", freq: 329.63 },
  { name: "角 (Jiǎo)", note: "G4", freq: 392.00 },
  { name: "徵 (Zhǐ)", note: "A4", freq: 440.00 },
  { name: "羽 (Yǔ)", note: "B4", freq: 493.88 },
  { name: "宫 (Gōng-H)", note: "D5", freq: 587.33 }
];

// Synthesis helper for Guzheng pluck using standard HTML AudioNode graph
function playGuzhengPluck(frequency: number) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Oscillator 1 for fundamental warm triangle
    const osc1 = ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Oscillator 2 for higher woody harmonic
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

    // Gain node envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

    // Lowpass filter to simulate resonant hollow bamboo body
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 1.9);
    osc2.stop(ctx.currentTime + 1.9);
  } catch (error) {
    console.warn("AudioContext initialization fell back:", error);
  }
}

interface HubProps {
  onNavigate?: (page: "home" | "about" | "events" | "team" | "blog" | "games", extra?: any) => void;
}

export default function Hub({ onNavigate }: HubProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showMoreInteractives, setShowMoreInteractives] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);

  // Interactive dynamic features states
  const [activeTab, setActiveTab] = useState<"guzheng" | "calligraphy">("guzheng");
  const [vibratingString, setVibratingString] = useState<number | null>(null);
  const [currentProverbIdx, setCurrentProverbIdx] = useState(0);
  const [brushColor, setBrushColor] = useState("rgba(43, 31, 23, 0.95)");
  const [brushSize, setBrushSize] = useState(12);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentWidthRef = useRef<number>(12);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setFormSubmitted(false);
      setActiveModal(null);
    }, 1200);
  }

  // Plucks Guzheng note and flags string vibration
  function handlePluck(index: number, freq: number) {
    setVibratingString(index);
    playGuzhengPluck(freq);
    setTimeout(() => {
      setVibratingString((prev) => (prev === index ? null : prev));
    }, 850);
  }

  // Brush drawing stroke functions
  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height
    };
  }

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const pos = getCanvasPos(e);
    setIsDrawing(true);
    setLastPos(pos);
    currentWidthRef.current = brushSize;
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getCanvasPos(e);

    // Speed indicator is proportional to distance traveled since events trigger periodically
    const dist = Math.sqrt((pos.x - lastPos.x) ** 2 + (pos.y - lastPos.y) ** 2);
    const maxSpeed = 24;
    const normalizedSpeed = Math.min(dist, maxSpeed) / maxSpeed; // 0.0 to 1.0

    // Points when sped up (tapering down to 15%), thicker when slowed (up to 150%)
    const minFactor = 0.15;
    const maxFactor = 1.50;
    const targetSize = brushSize * (maxFactor - normalizedSpeed * (maxFactor - minFactor));

    // Linear interpolation (lerp) to smooth out path thickness shifts
    const lerpFactor = 0.18;
    const nextWidth = currentWidthRef.current + (targetSize - currentWidthRef.current) * lerpFactor;
    currentWidthRef.current = nextWidth;

    // Mimic dry brush/flying white ink texture at high speed by adjusting opacity and bristles
    // Fast strokes have lower opacity (soot ink runs thinner)
    const baseColor = brushColor;
    let opacity = 0.95;
    if (normalizedSpeed > 0.4) {
      opacity = 0.95 - (normalizedSpeed - 0.4) * 0.5; // thinner opacity at higher speeds
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);

    ctx.strokeStyle = baseColor.replace(/[\d\.]+\)$/, `${opacity})`);
    ctx.lineWidth = nextWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.stroke();

    // Bristle effect! Draw 3-4 parallel micro-lines with lower opacity and thickness to simulate splitting wolf-hair brush hairs
    if (nextWidth > 6) {
      const bristleCount = Math.min(4, Math.floor(nextWidth / 4));
      for (let i = 0; i < bristleCount; i++) {
        const angle = Math.atan2(pos.y - lastPos.y, pos.x - lastPos.x) + Math.PI / 2;
        const offset = (i - (bristleCount - 1) / 2) * (nextWidth * 0.15);
        const ox = Math.cos(angle) * offset;
        const oy = Math.sin(angle) * offset;

        ctx.beginPath();
        ctx.moveTo(lastPos.x + ox, lastPos.y + oy);
        ctx.lineTo(pos.x + ox, pos.y + oy);
        
        const bristleOpacity = opacity * 0.4;
        ctx.strokeStyle = baseColor.replace(/[\d\.]+\)$/, `${bristleOpacity})`);
        ctx.lineWidth = nextWidth * 0.12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    }

    setLastPos(pos);
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Initial scroll outline preview
  useEffect(() => {
    if (activeTab === "calligraphy") {
      clearCanvas();
    }
  }, [activeTab, currentProverbIdx]);

  return (
    <>
      <section className="bg-hub py-24 relative animate-fade-in" id="hub">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12 text-center font-bold scroll-reveal">
            Engagement Hub
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HUB_ITEMS.map((item, index) => {
              const bgClass = item.isPrimary
                ? "liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-sm hover:shadow-xl !bg-white/40 border-2 border-primary/20 cursor-pointer"
                : "liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer";

              const handleItemClick = () => {
                if (item.isPrimary) return;
                if (onNavigate) {
                  if (item.type === "blog") onNavigate("blog");
                  else if (item.type === "events") onNavigate("events");
                  else if (item.type === "team") onNavigate("team");
                  else setActiveModal(item.type || "newsletter");
                } else {
                  setActiveModal(item.type || "newsletter");
                }
              };

              return (
                <div key={index} className={bgClass} onClick={handleItemClick}>
                  <h3 className="font-headline text-2xl text-primary mb-4 font-bold">{item.title}</h3>
                  <p className="font-body text-base text-on-surface-variant mb-8 leading-relaxed h-14 overflow-hidden">
                    {item.desc}
                  </p>
                  {item.isPrimary ? (
                    <a
                      className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg hover:shadow-xl inline-block w-full text-center active:scale-95 hover:scale-[1.02]"
                      href="#apply"
                    >
                      {item.buttonText}
                    </a>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick();
                      }}
                      className="liquid-glass text-primary px-8 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider hover:bg-white/80 transition-all inline-block w-full text-center active:scale-95 hover:scale-[1.02]"
                    >
                      {item.buttonText}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW INTERACTIVE CULTURAL EXPERIENCE ELEMENT */}
      <section className="bg-about py-16 relative border-t border-outline-variant/25 overflow-hidden">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-4xl text-center">
          <div className="text-center mb-8 scroll-reveal">
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1 block">Live Engagement</span>
            <h2 className="font-headline text-2xl md:text-3xl text-primary font-bold">Interactive Arts Experience</h2>
            <p className="font-body text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
              Experience the music and scripture of traditional heritage. Pluck five custom synthesized Guzheng harp strings or brush virtual ink on the practice scroll below.
            </p>
          </div>

          <div className="liquid-glass-strong rounded-3xl p-6 md:p-8 shadow-xl border border-primary/15 bg-white/30 backdrop-blur-md scroll-reveal">
            {/* Tab Controllers */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab("guzheng")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 active:scale-95 hover:scale-[1.02] ${
                  activeTab === "guzheng"
                    ? "bg-primary text-on-primary shadow-md"
                    : "liquid-glass text-primary hover:bg-white/50"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">music_note</span> Guzheng Harp
              </button>
              <button
                onClick={() => {
                  setActiveTab("calligraphy");
                  setTimeout(() => {
                    clearCanvas();
                  }, 60);
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 active:scale-95 hover:scale-[1.02] ${
                  activeTab === "calligraphy"
                    ? "bg-primary text-on-primary shadow-md"
                    : "liquid-glass text-primary hover:bg-white/50"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">brush</span> Ink Calligraphy
              </button>
            </div>

            {/* Guzheng strings block */}
            {activeTab === "guzheng" && (
              <div className="space-y-6 text-center animate-fade-in">
                <span className="text-xs text-on-surface-variant font-semibold bg-primary/10 px-4 py-1.5 rounded-full">
                  Pentatonic Tuning: Gong · Shang · Jiao · Zhi · Yu (Traditional Scale)
                </span>
                
                <div className="bg-amber-950/10 border border-amber-900/10 rounded-2xl p-6 relative flex flex-col justify-between items-stretch gap-5 min-h-[220px] shadow-inner select-none max-w-2xl mx-auto">
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-amber-900/20 rounded-l-2xl border-r border-white/10" />
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-amber-900/20 rounded-r-2xl border-l border-white/10" />

                  {GUZHENG_STRINGS.map((str, idx) => {
                    const isVibrating = vibratingString === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handlePluck(idx, str.freq)}
                        className="group relative flex items-center justify-between focus:outline-none w-full py-1"
                      >
                        <span className="font-body text-[11px] font-bold text-amber-900/80 tracking-widest uppercase group-hover:text-primary transition-colors text-left w-20 leading-none">
                          {str.name}
                        </span>

                        <div className="flex-1 px-4 relative flex items-center h-4">
                          <div className="absolute left-[30%] top-0 bottom-0 w-1 bg-amber-900/15 transform rotate-12 z-0" />
                          <div
                            className={`w-full h-[2px] rounded-full transition-all duration-75 relative z-10 ${
                              idx === 3 ? "bg-rose-700/85" : "bg-primary/50"
                            } ${
                              isVibrating ? "animate-vibrate scale-y-125 translate-y-[1px]" : "group-hover:bg-primary/90"
                            }`}
                          />
                        </div>

                        <span className="font-mono text-[10px] text-on-surface-variant/50 w-12 text-right group-hover:text-primary font-bold">
                          {str.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="font-body text-[11px] text-on-surface-variant/70 italic text-center max-w-md mx-auto">
                  Tip: Drag or click across strings to play a serene pentatonic sweep (glissando)!
                </p>
              </div>
            )}

            {/* Ink practice canvas block */}
            {activeTab === "calligraphy" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-fade-in">
                <div className="space-y-4">
                  <h4 className="font-headline text-xs font-bold text-primary tracking-widest uppercase">
                    Choose Wisdom Proverb
                  </h4>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {PROVERBS.map((prov, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentProverbIdx(idx)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 active:scale-95 ${
                          currentProverbIdx === idx
                            ? "bg-primary/10 border-primary shadow-sm"
                            : "border-outline/10 hover:bg-white/40"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-0.5">
                          <strong className="font-headline text-[13px] text-primary">{prov.chinese}</strong>
                          <span className="font-mono text-[9px] text-on-surface-variant/50 font-semibold">{prov.pinyin}</span>
                        </div>
                        <p className="font-body text-[9px] text-on-surface-variant/80 line-clamp-1">{prov.meaning}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={clearCanvas}
                    className="w-full bg-primary/10 text-primary border border-primary/20 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary/20 active:scale-95 transition-all text-center"
                  >
                    Clear Scroll Ink
                  </button>
                </div>

                <div className="md:col-span-2 flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-headline text-xs font-bold text-primary uppercase tracking-wider">
                      Ink Tracer Scroll ({PROVERBS[currentProverbIdx].chinese})
                    </span>
                    <span className="text-[10px] text-on-surface-variant italic">
                      Hold & Draw on rice paper
                    </span>
                  </div>

                  <div className="relative border border-amber-900/10 rounded-2xl overflow-hidden bg-[#faf7f2] shadow-inner select-none">
                    <canvas
                      ref={canvasRef}
                      width={480}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full block bg-transparent relative z-10 cursor-crosshair touch-none"
                    />
                    
                    {/* Watermark trace template */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05] z-0 select-none">
                      <span className="text-[100px] select-none text-primary font-bold font-serif leading-none tracking-widest">
                        {PROVERBS[currentProverbIdx].chinese}
                      </span>
                    </div>
                  </div>

                  {/* Canvas controls */}
                  <div className="flex items-center justify-between gap-4 bg-white/50 p-2 rounded-xl border border-outline/10 text-xs">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-body text-[10px] font-bold text-on-surface-variant">BRUSH:</span>
                      <input
                        type="range"
                        min="4"
                        max="26"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-full accent-primary h-1 bg-outline/20 rounded"
                      />
                      <span className="font-mono text-[10px] w-6 text-right font-bold">{brushSize}px</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-body text-[10px] font-bold text-on-surface-variant mr-1">COLOR:</span>
                      {[
                        { color: "rgba(43, 31, 23, 0.95)", title: "Soot Soot" },
                        { color: "rgba(182, 39, 39, 0.95)", title: "Vermilion Red" },
                        { color: "rgba(22, 65, 114, 0.95)", title: "Indigo Blue" }
                      ].map((item) => (
                        <button
                          key={item.color}
                          onClick={() => setBrushColor(item.color)}
                          className={`w-5 h-5 rounded-full border transition-all active:scale-90 ${
                            brushColor === item.color ? "ring-2 ring-primary border-white scale-110" : "border-outline/10"
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* More Interactives expanding drawer */}
          <div className="mt-12 text-center relative z-10">
            <button
              onClick={() => setShowMoreInteractives(!showMoreInteractives)}
              className="bg-secondary/15 hover:bg-secondary/20 text-secondary border border-secondary/35 px-10 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-sm hover:scale-[1.01]"
            >
              <span className="material-symbols-outlined text-[16px] select-none">videogame_asset</span>
              {showMoreInteractives ? "Hide Extra Interactives" : "More Interactives"}
              <span className="material-symbols-outlined text-[14px]">
                {showMoreInteractives ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </button>

            {showMoreInteractives && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in">
                {[
                  { id: "mooncake", title: "Autumn Mooncake Maker", desc: "Form shapes & kiln roast controls", icon: "cookie" },
                  { id: "riddles", title: "Lantern Riddle Matcher", desc: "Traditional homophone wordplays", icon: "wb_iridescent" },
                  { id: "recorder", title: "Guzheng Recorder", desc: "Record and playback pentatone sweeps", icon: "mic_none" },
                  { id: "tea", title: "Tea ceremony Brewmaster", desc: "Thermometer water steep masteries", icon: "emoji_food_beverage" }
                ].map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate("games", game.id);
                      }
                    }}
                    className="p-5 bg-white/60 hover:bg-white border border-secondary/15 hover:border-secondary-container rounded-2xl text-center flex flex-col items-center justify-between gap-2.5 transition-all shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-1 active:scale-95 group"
                  >
                    <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform select-none">
                      {game.icon}
                    </span>
                    <div>
                      <h4 className="font-headline text-[13px] text-primary font-bold leading-tight group-hover:text-secondary mb-1">
                        {game.title}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant font-body leading-relaxed line-clamp-2">
                        {game.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>



      {/* MODAL SYSTEM */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-bright border border-outline/20 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative select-text animate-pop-in">
            {/* Close */}
            <button
              onClick={() => {
                setActiveModal(null);
                setSelectedBlog(null);
              }}
              className="absolute top-4 right-4 text-on-surface-variant/70 hover:text-primary transition-colors p-1"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {/* Newsletter Modal */}
            {activeModal === "newsletter" && (
              <div className="text-center py-6 animate-fade-in">
                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">mail</span>
                <h3 className="font-headline text-2xl text-primary font-bold mb-3">AHC Community Newsletter</h3>
                <p className="font-body text-on-surface-variant mb-6 text-sm md:text-base">
                  Get monthly news about free cultural arts workshops, tutoring schedules, upcoming musical events, and impact highlights.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-full border border-outline/30 bg-white px-5 py-3 text-sm focus:border-primary outline-none font-body"
                  />
                  <button
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full bg-primary text-on-primary py-3 rounded-full font-body text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all disabled:bg-primary/50"
                  >
                    {formSubmitted ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
              </div>
            )}

            {/* Blog Modal */}
            {activeModal === "blog" && (
              <div className="animate-fade-in">
                <h3 className="font-headline text-2xl text-primary font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-primary">feed</span>
                  Living Heritage Blog
                </h3>

                {selectedBlog ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="text-primary hover:text-primary-container text-xs font-bold flex items-center gap-1 uppercase tracking-wider mb-2 font-body"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Blog List
                    </button>
                    <div className="border hover:border-primary/10 p-5 rounded-2xl bg-white/40">
                      <span className="font-body text-xs text-on-surface-variant/70 font-semibold uppercase">
                        {selectedBlog.date}
                      </span>
                      <h4 className="font-headline text-xl text-primary font-bold mt-1 mb-3">
                        {selectedBlog.title}
                      </h4>
                      <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
                        {selectedBlog.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                    {SAMPLE_BLOGS.map((blog, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedBlog(blog)}
                        className="p-5 border border-outline/10 hover:border-primary/25 rounded-2xl cursor-pointer bg-white/40 hover:bg-white/75 transition-all group"
                      >
                        <span className="font-body text-[11px] text-on-surface-variant/70 font-semibold uppercase font-mono">
                          {blog.date}
                        </span>
                        <h4 className="font-headline text-lg text-primary font-bold group-hover:text-primary-container transition-colors mt-1 mb-2 font-medium">
                          {blog.title}
                        </h4>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <span className="text-xs text-primary font-bold font-body group-hover:underline inline-block mt-3 uppercase tracking-wider">
                          Read Full Article →
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Events Modal */}
            {activeModal === "events" && (
              <div className="text-center py-4 animate-fade-in">
                <span className="material-symbols-outlined text-5xl text-primary mb-3 block">photo_library</span>
                <h3 className="font-headline text-2xl text-primary font-bold mb-5">Previous Performances &amp; Galas</h3>
                <div className="grid grid-cols-2 gap-4 max-h-[350px] overflow-y-auto p-1">
                  <div className="border border-outline/10 p-3 bg-white/50 rounded-2xl hover:scale-[1.03] transition-transform">
                    <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center font-headline text-primary font-bold text-sm">
                      Spring Calligraphy Expo
                    </div>
                    <span className="text-xs font-body text-on-surface-variant/80 mt-2 block font-medium">April 2026</span>
                  </div>
                  <div className="border border-outline/10 p-3 bg-white/50 rounded-2xl hover:scale-[1.03] transition-transform">
                    <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center font-headline text-primary font-bold text-sm">
                      Duanwu Festival Gala
                    </div>
                    <span className="text-xs font-body text-on-surface-variant/80 mt-2 block font-medium">June 2025</span>
                  </div>
                  <div className="border border-outline/10 p-3 bg-white/50 rounded-2xl hover:scale-[1.03] transition-transform">
                    <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center font-headline text-primary font-bold text-sm">
                      Detroit Civic Performance
                    </div>
                    <span className="text-xs font-body text-on-surface-variant/80 mt-2 block font-medium">September 2025</span>
                  </div>
                  <div className="border border-outline/10 p-3 bg-white/50 rounded-2xl hover:scale-[1.03] transition-transform">
                    <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center font-headline text-primary font-bold text-sm">
                      Dragon Boat Folk Gala
                    </div>
                    <span className="text-xs font-body text-on-surface-variant/80 mt-2 block font-medium">August 2025</span>
                  </div>
                </div>
              </div>
            )}

            {/* Team Modal */}
            {activeModal === "team" && (
              <div className="animate-fade-in">
                <h3 className="font-headline text-2xl text-primary font-bold mb-6 text-center">Meet Our Directors</h3>
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  <div className="p-4 border rounded-2xl bg-white/50 flex flex-col md:flex-row gap-4 items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline text-xl font-bold font-serif shrink-0">
                      LY
                    </div>
                    <div>
                      <h4 className="font-headline text-base font-bold text-primary">L. Yan, Founder &amp; Chairman</h4>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                        Dedicated local administrator with over a decade of Chinese school experience. Visionary who pivoted rote learning toward service and dynamic storytelling.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-2xl bg-white/50 flex flex-col md:flex-row gap-4 items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline text-xl font-bold font-serif shrink-0">
                      WH
                    </div>
                    <div>
                      <h4 className="font-headline text-base font-bold text-primary">W. Huang, Educational Director</h4>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                        Educational scholar focusing on cultural adaptation and curriculum building. Designs our calligraphy, arts, and conversation modules.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-2xl bg-white/50 flex flex-col md:flex-row gap-4 items-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline text-xl font-bold font-serif shrink-0">
                      XL
                    </div>
                    <div>
                      <h4 className="font-headline text-base font-bold text-primary">X. Li, Performing Arts Coordinator</h4>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                        Accomplished musician and stage performance director. Oversees instruments, orchestra collaborations, and community folk performances.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Awards Modal */}
            {activeModal === "collabs" && (
              <div className="text-center py-6 animate-fade-in">
                <span className="material-symbols-outlined text-5xl text-primary mb-3 block">emoji_events</span>
                <h3 className="font-headline text-2xl text-primary font-bold mb-5">Awards &amp; Community Recognition</h3>
                <div className="space-y-3 text-left max-w-lg mx-auto">
                  <div className="flex items-start gap-3 border p-3 bg-white/40 rounded-xl">
                    <strong className="text-primary font-headline text-xs uppercase tracking-wider">2025 Civic Impact Award</strong>
                    <span className="text-xs text-on-surface-variant font-medium">(Nominee) Detroit Regional Council</span>
                  </div>
                  <div className="flex items-start gap-3 border p-3 bg-white/40 rounded-xl">
                    <strong className="text-primary font-headline text-xs uppercase tracking-wider">501(c)(3) Nonprofit</strong>
                    <span className="text-xs text-on-surface-variant font-medium">IRS authorized active status in good standing</span>
                  </div>
                  <div className="flex items-start gap-3 border p-3 bg-white/40 rounded-xl">
                    <strong className="text-primary font-headline text-xs uppercase tracking-wider text-amber-900 border-b border-dashed border-amber-900">Candid Silver Mark</strong>
                    <span className="text-xs text-on-surface-variant font-medium">Highest transparency verification in founding phases</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
