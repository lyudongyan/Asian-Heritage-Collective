import React, { useState, useRef, useEffect } from "react";
import { Eyebrow, SplitWords } from "./ui";

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

const GAME_SHORTCUTS = [
  { title: "Mooncake Maker", desc: "Sculpt, seal & kiln-fire pastries", icon: "cookie" },
  { title: "Lantern Riddles", desc: "Traditional homophone wordplay", icon: "wb_iridescent" },
  { title: "Guzheng Recorder", desc: "Record pentatonic sweeps", icon: "mic_none" },
  { title: "Tea Brewmaster", desc: "Steep the perfect pot", icon: "emoji_food_beverage" }
];

function playGuzhengPluck(frequency: number) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const osc1 = ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(frequency, ctx.currentTime);

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

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

export default function Hub() {
  const [activeTab, setActiveTab] = useState<"guzheng" | "calligraphy">("guzheng");
  const [vibratingString, setVibratingString] = useState<number | null>(null);
  const [currentProverbIdx, setCurrentProverbIdx] = useState(0);
  const [brushColor, setBrushColor] = useState("rgba(43, 31, 23, 0.95)");
  const [brushSize, setBrushSize] = useState(12);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentWidthRef = useRef<number>(12);

  function handlePluck(index: number, freq: number) {
    setVibratingString(index);
    playGuzhengPluck(freq);
    setTimeout(() => {
      setVibratingString((prev) => (prev === index ? null : prev));
    }, 850);
  }

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

    const dist = Math.sqrt((pos.x - lastPos.x) ** 2 + (pos.y - lastPos.y) ** 2);
    const maxSpeed = 24;
    const normalizedSpeed = Math.min(dist, maxSpeed) / maxSpeed;

    const minFactor = 0.15;
    const maxFactor = 1.50;
    const targetSize = brushSize * (maxFactor - normalizedSpeed * (maxFactor - minFactor));

    const lerpFactor = 0.18;
    const nextWidth = currentWidthRef.current + (targetSize - currentWidthRef.current) * lerpFactor;
    currentWidthRef.current = nextWidth;

    const baseColor = brushColor;
    let opacity = 0.95;
    if (normalizedSpeed > 0.4) {
      opacity = 0.95 - (normalizedSpeed - 0.4) * 0.5;
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);

    ctx.strokeStyle = baseColor.replace(/[\d\.]+\)$/, `${opacity})`);
    ctx.lineWidth = nextWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();

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

  useEffect(() => {
    if (activeTab === "calligraphy") {
      clearCanvas();
    }
  }, [activeTab, currentProverbIdx]);

  return (
    <section className="bg-hub py-28 relative overflow-hidden" id="interactive">
      <span
        aria-hidden="true"
        data-parallax="0.12"
        className="text-watermark font-headline text-[14rem] absolute -top-8 right-0 leading-none pointer-events-none hidden xl:block"
      >
        06
      </span>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="mb-12 scroll-reveal">
          <Eyebrow className="mb-6">06 · Try It Yourself</Eyebrow>
          <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-5">
            <SplitWords>
              A small piece of <em className="italic">the workshop</em>.
            </SplitWords>
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Experience the music and brushwork of traditional heritage right
            here — pluck a synthesized guzheng tuned to the pentatonic scale,
            or trace a proverb in virtual ink.
          </p>
        </div>

        <div className="liquid-glass-strong rounded-3xl p-6 md:p-8 shadow-xl border border-primary/15 scroll-reveal">
          {/* Tab controllers */}
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
                setTimeout(() => { clearCanvas(); }, 60);
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

          {/* Guzheng strings */}
          {activeTab === "guzheng" && (
            <div className="space-y-6 text-center animate-fade-in">
              <span className="text-xs text-on-surface-variant/80 font-semibold inline-block">
                Pentatonic tuning: Gong · Shang · Jiao · Zhi · Yu
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

          {/* Ink calligraphy */}
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
                    Hold &amp; Draw on rice paper
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

                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05] z-0 select-none">
                    <span className="text-[100px] select-none text-primary font-bold font-serif leading-none tracking-widest">
                      {PROVERBS[currentProverbIdx].chinese}
                    </span>
                  </div>
                </div>

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
                      { color: "rgba(43, 31, 23, 0.95)", title: "Soot Ink" },
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

        {/* Games room shortcuts */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 scroll-reveal">
          {GAME_SHORTCUTS.map((game) => (
            <a
              key={game.title}
              href="/games"
              className="p-5 bg-white/60 hover:bg-white border border-secondary/15 hover:border-secondary-container rounded-2xl text-center flex flex-col items-center justify-between gap-2.5 transition-all shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-1 active:scale-95 group no-underline"
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
            </a>
          ))}
        </div>
        <p className="text-center mt-6 font-body text-xs text-on-surface-variant/70 scroll-reveal">
          Four full minigames live in the{" "}
          <a href="/games" className="text-primary font-bold hover:underline">
            Games Room →
          </a>
        </p>
      </div>
    </section>
  );
}
