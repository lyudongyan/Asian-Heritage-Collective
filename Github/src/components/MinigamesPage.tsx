import React, { useState, useRef, useEffect } from "react";
import { IMAGES } from "../data";

interface MinigamesPageProps {
  onBack: () => void;
  initialGame?: "mooncake" | "riddles" | "recorder" | "tea";
}

// Global Guzheng audio plucker helper
function pluckHarmonic(freq: number) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(freq, ctx.currentTime);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 1.0);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 1.6);
    osc2.stop(ctx.currentTime + 1.6);
  } catch (err) {}
}

export default function MinigamesPage({ onBack, initialGame }: MinigamesPageProps) {
  const [activeGame, setActiveGame] = useState<"mooncake" | "riddles" | "recorder" | "tea">(initialGame || "mooncake");

  // Sync with initialGame prop update if any
  useEffect(() => {
    if (initialGame) {
      setActiveGame(initialGame);
    }
  }, [initialGame]);

  // Game 1 State - Mooncake Maker
  const [cakeShape, setCakeShape] = useState<"round" | "square" | "flower">("round");
  const [cakeImprint, setCakeImprint] = useState<"團圓" | "吉祥" | "中秋" | "福">("團圓");
  const [cakeCrust, setCakeCrust] = useState<"golden" | "jade" | "snowy">("golden");
  const [bakeState, setBakeState] = useState<"raw" | "baking" | "done">("raw");
  const [giftBoxed, setGiftBoxed] = useState(false);

  // Game 3 State - Lantern Riddles
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [riddleResult, setRiddleResult] = useState<"unanswered" | "correct" | "incorrect">("unanswered");
  const [score, setScore] = useState(0);

  const RIDDLES = [
    {
      text: "It has a tongue but cannot speak, has veins but no blood, is made of paper and lights up a street. What is it?",
      options: ["A Red Lantern", "A Calligraphy Scroll", "A Tea Kettle", "A Mooncake Mold"],
      answer: "A Red Lantern",
      ex: "Red paper panels form its frame (veins), and the candle inside is termed its tongue!"
    },
    {
      text: "Five brothers of different heights holding the same ink brush, painting characters together on a white cloth. What are they?",
      options: ["Five Ink Brushes", "The Hand Fingers", "Five Scholar Stones", "Five Traditional Instruments"],
      answer: "The Hand Fingers",
      ex: "Fingers work in synergy to hold and guide the calligraphy brush."
    },
    {
      text: "It was born in a mountain forest, grew inside a hot cup of bathwater, and brought comfort to ten thousand lips. What is it?",
      options: ["Red Bean Stuffed Pastry", "Loose Tea Leaves", "Bamboo Flute Dizi", "Fragrant Soap"],
      answer: "Loose Tea Leaves",
      ex: "Tea leaves grow in high rolling mountains and sprout their flavor inside boiling water cups."
    }
  ];

  // Game 4 State - Guzheng Recorder
  const NOTES = [
    { name: "宫 (Gōng)", key: "D", freq: 293.66 },
    { name: "商 (Shāng)", key: "E", freq: 329.63 },
    { name: "角 (Jiǎo)", key: "G", freq: 392.00 },
    { name: "徵 (Zhǐ)", key: "A", freq: 440.00 },
    { name: "羽 (Yǔ)", key: "B", freq: 493.88 },
    { name: "宫 (Gōng-H)", key: "D5", freq: 587.33 }
  ];
  const [recordedNotes, setRecordedNotes] = useState<{ id: number; freq: number; name: string; timestamp: number }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Game 5 State - Tea Brewing Master
  const [teaCategory, setTeaCategory] = useState<"jasmine" | "puer" | "oolong">("jasmine");
  const [tempState, setTempState] = useState(60); // dynamic water heat temperature
  const [heatingActive, setHeatingActive] = useState(false);
  const [brewState, setBrewState] = useState<"idle" | "pour" | "steeping" | "ready">("idle");
  const [steepSeconds, setSteepSeconds] = useState(0);
  const [steepTimerId, setSteepTimerId] = useState<any>(null);
  const [steepResult, setSteepResult] = useState<string | null>(null);

  // Bake trigger with timeout
  function triggerBake() {
    setBakeState("baking");
    setTimeout(() => {
      setBakeState("done");
    }, 2000);
  }

  function submitRiddle(opt: string) {
    if (riddleResult !== "unanswered") return;
    setUserAnswers((prev) => ({ ...prev, [currentRiddleIdx]: opt }));
    const isCorrect = opt === RIDDLES[currentRiddleIdx].answer;
    if (isCorrect) {
      setRiddleResult("correct");
      setScore((p) => p + 10);
    } else {
      setRiddleResult("incorrect");
    }
  }

  function nextRiddle() {
    setRiddleResult("unanswered");
    setCurrentRiddleIdx((p) => (p + 1) % RIDDLES.length);
  }

  // Guzheng key triggers
  function pluckNote(item: typeof NOTES[0]) {
    pluckHarmonic(item.freq);
    if (isRecording) {
      setRecordedNotes((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), freq: item.freq, name: item.name, timestamp: Date.now() }
      ]);
    }
  }

  function toggleRecord() {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setRecordedNotes([]);
      setIsRecording(true);
    }
  }

  function playBackRecording() {
    if (recordedNotes.length === 0 || isPlaying) return;
    setIsPlaying(true);
    const origin = recordedNotes[0].timestamp;
    recordedNotes.forEach((note) => {
      const delay = note.timestamp - origin;
      setTimeout(() => {
        pluckHarmonic(note.freq);
      }, delay);
    });
    setTimeout(() => {
      setIsPlaying(false);
    }, recordedNotes[recordedNotes.length - 1].timestamp - origin + 600);
  }

  // Tea boiling loops
  useEffect(() => {
    let tId: any = null;
    if (heatingActive) {
      tId = setInterval(() => {
        setTempState((temp) => (temp < 100 ? temp + 2 : temp));
      }, 100);
    }
    return () => clearInterval(tId);
  }, [heatingActive]);

  // Steeping Clock loops
  useEffect(() => {
    let tId: any = null;
    if (brewState === "steeping") {
      tId = setInterval(() => {
        setSteepSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(tId);
  }, [brewState]);

  function startSteeping() {
    setBrewState("steeping");
    setSteepSeconds(0);
  }

  function stopSteeping() {
    setBrewState("ready");
    let result = "Over-steeped & Bitter";
    
    // Jasmine Greenfield sweet spot: 78-85 C & 10 to 15 seconds
    if (teaCategory === "jasmine") {
      if (tempState >= 76 && tempState <= 86) {
        if (steepSeconds >= 5 && steepSeconds <= 12) {
          result = "Exquisite Sweet Jasmine Brew! (Perfect 80°C + 8s)";
        } else if (steepSeconds < 5) {
          result = "Under-extracted & Mildly Floral";
        }
      } else if (tempState > 90) {
        result = "Scalded Green Leaves (Too Bitter!)";
      }
    } 
    // Pu'er sweet spot: 95+ C & 18 to 28 seconds
    else if (teaCategory === "puer") {
      if (tempState >= 92 && tempState <= 100) {
        if (steepSeconds >= 12 && steepSeconds <= 25) {
          result = "Rich, Peaty & Masterful Pu'er Nectar!";
        } else if (steepSeconds < 12) {
          result = "Weak Infusion (Needs more depth)";
        }
      } else {
        result = "Lukewarm Muddy Infusion (Temp too low)";
      }
    }
    // Oolong sweet spot: 88-94 C & 15 to 22 seconds
    else if (teaCategory === "oolong") {
      if (tempState >= 86 && tempState <= 95) {
        if (steepSeconds >= 10 && steepSeconds <= 20) {
          result = "Fragrant, Flowery Oolong Masterpiece!";
        } else if (steepSeconds < 10) {
          result = "Thin & Grassy Leaf extract";
        }
      } else {
        result = "Over-boiled Oolong (Aromatic profile lost)";
      }
    }

    setSteepResult(result);
  }

  function resetTeaSession() {
    setTempState(60);
    setBrewState("idle");
    setSteepSeconds(0);
    setSteepResult(null);
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-hub relative select-text text-left">
      {/* Decorative light elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/45 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-1">
            Artistic Playground
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Interactive Games Room
          </h2>
          <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
            Practice structural baking, word deduction, Guzheng recordings, and delicate loose tea brewing!
          </p>
        </div>

        {/* Dynamic Selector Row - 4 Games */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 justify-center mb-10 bg-white/20 p-2.5 rounded-2xl border border-white/30">
          {[
            { id: "mooncake", title: "Autumn Mooncake Maker", icon: "cookie" },
            { id: "riddles", title: "Lantern Riddle Matcher", icon: "wb_iridescent" },
            { id: "recorder", title: "Guzheng Sound Recorder", icon: "mic_none" },
            { id: "tea", title: "Tea Ceremony Brewmaster", icon: "emoji_food_beverage" }
          ].map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id as any)}
              className={`flex-1 min-w-[150px] py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] ${
                activeGame === game.id
                  ? "bg-primary text-on-primary shadow-lg border border-primary/20"
                  : "bg-white/50 text-primary hover:bg-white/80 border border-white/20"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] select-none">{game.icon}</span>
              {game.title}
            </button>
          ))}
        </div>

        {/* ACTIVE GAME CANVAS CONTAINER */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/60 shadow-xl overflow-hidden min-h-[500px] relative flex flex-col justify-between">
          
          {/* GAME 1: MOONCAKE BAKERY */}
          {activeGame === "mooncake" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in text-left">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-primary font-mono uppercase bg-primary/15 px-3 py-1 rounded-full">
                    Minigame #1: Baking Simulation
                  </span>
                  <h3 className="font-headline text-2xl text-primary font-bold mt-2">
                    Harvest Mooncake Studio
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-1">
                    Mid-Autumn pastries require structural configuration. Sculpt raw wheat, choose meaningful calligraphy impressions, and monitor steam levels.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-semibold">
                  {/* Select Shape */}
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-wider block mb-2 font-bold font-body">1. Mold Geometry</label>
                    <div className="flex gap-2">
                      {["round", "square", "flower"].map((sh) => (
                        <button
                          key={sh}
                          onClick={() => { setCakeShape(sh as any); setGiftBoxed(false); }}
                          className={`flex-1 py-2 px-3 border rounded-xl capitalize font-body font-semibold ${
                            cakeShape === sh ? "bg-primary border-primary text-white" : "border-neutral-200 bg-white"
                          }`}
                        >
                          {sh} Form
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Character Imprint */}
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-wider block mb-2 font-bold font-body">2. Traditional Calligraphy Seal</label>
                    <div className="flex gap-2">
                      {["團圓", "吉祥", "中秋", "福"].map((imp) => (
                        <button
                          key={imp}
                          onClick={() => { setCakeImprint(imp as any); setGiftBoxed(false); }}
                          className={`flex-1 py-2 px-3 border rounded-xl font-bold font-headline text-md ${
                            cakeImprint === imp ? "bg-primary border-primary text-white" : "border-neutral-200 bg-white"
                          }`}
                        >
                          {imp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Crust Color */}
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-wider block mb-3 font-bold font-body">3. Crust Formulation</label>
                    <div className="flex gap-3">
                      {[
                        { id: "golden", label: "Golden Pastry (Traditional baked wheat)", color: "bg-[#e2a85e]" },
                        { id: "jade", label: "Matcha Jade (Infused ground leaf)", color: "bg-[#719962]" },
                        { id: "snowy", label: "Snowy Mochi (Sweet rice flour)", color: "bg-[#f2efe4]" }
                      ].map((cr) => (
                        <button
                          key={cr.id}
                          onClick={() => { setCakeCrust(cr.id as any); setBakeState("raw"); setGiftBoxed(false); }}
                          className={`flex-1 p-2 border-2 rounded-xl flex items-center gap-2 transition-all ${
                            cakeCrust === cr.id ? "border-primary bg-white shadow-md scale-[1.01]" : "border-neutral-100 bg-white"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full ${cr.color} border border-neutral-300 block shrink-0`} />
                          <span className="text-[10px] leading-tight font-body font-semibold text-left">{cr.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    disabled={bakeState === "baking"}
                    onClick={triggerBake}
                    className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-container disabled:bg-neutral-200 transition-all active:scale-95"
                  >
                    {bakeState === "raw" && "Bake & Fire Pastry (2s)"}
                    {bakeState === "baking" && "Firing Kiln..."}
                    {bakeState === "done" && "Re-Bake Mooncake"}
                  </button>

                  <button
                    disabled={bakeState !== "done"}
                    onClick={() => setGiftBoxed(true)}
                    className="py-3 px-6 bg-secondary/80 text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-secondary disabled:bg-neutral-200 transition-all active:scale-95"
                  >
                    Wrap Gift-Box
                  </button>
                </div>
              </div>

              {/* Simulation Canvas Side */}
              <div className="flex flex-col items-center justify-center bg-[#fdfaf5] border border-amber-900/10 rounded-2xl p-6 relative min-h-[340px] shadow-inner select-none overflow-hidden">
                {/* Visual heat waves when baking */}
                {bakeState === "baking" && (
                  <div className="absolute inset-x-0 bottom-0 top-0 bg-red-500/10 animate-pulse flex flex-col justify-center items-center z-20">
                    <span className="text-red-700 font-bold font-mono text-[11px] uppercase tracking-widest">BOILING INTERNAL MOISTURE...</span>
                  </div>
                )}

                {/* Main Render Block */}
                <div className="relative z-10 p-1 flex flex-col items-center gap-4">
                  {giftBoxed ? (
                    <div className="text-center animate-pop-in space-y-4">
                      <div className="w-48 h-48 bg-rose-900 rounded-3xl border-4 border-amber-500 flex flex-col items-center justify-center shadow-2xl relative">
                        {/* Decorative golden geometric ribbon and seal */}
                        <div className="absolute inset-x-0 h-4 bg-amber-500/90 top-[45%]" />
                        <div className="absolute inset-y-0 w-4 bg-amber-500/90 left-[45%]" />
                        <div className="bg-amber-500 text-rose-950 font-headline font-bold text-lg w-14 h-14 rounded-full flex items-center justify-center border-4 border-rose-900 z-10 shadow-lg">
                          {cakeImprint}
                        </div>
                      </div>
                      <p className="font-headline text-primary font-bold text-sm">
                        "Your Custom {cakeCrust} Calligraphy Packaged!"
                      </p>
                    </div>
                  ) : (
                    <div className="relative animate-fade-in flex flex-col items-center">
                      {/* Pastry body renderer */}
                      <div
                        className={`w-44 h-44 flex items-center justify-center shadow-xl relative transition-all duration-300 border-b-4 border-black/15 ${
                          cakeShape === "round" ? "rounded-full" : cakeShape === "square" ? "rounded-3xl" : "rounded-[22%] rotate-12"
                        } ${
                          cakeCrust === "golden"
                            ? "bg-amber-500"
                            : cakeCrust === "jade"
                            ? "bg-[#6fa062]"
                            : "bg-[#f5ebd4]"
                        } ${
                          bakeState === "baking" ? "brightness-75 scale-95" : bakeState === "done" ? "brightness-[0.88] ring-4 ring-amber-500/15 scale-105" : ""
                        }`}
                      >
                        {/* Inner imprint circle */}
                        <div
                          className={`w-[85%] h-[85%] rounded-full border-4 border-dashed border-white/25 flex items-center justify-center select-none ${
                            cakeShape === "square" ? "!rounded-2xl" : ""
                          }`}
                        >
                          {/* Sunk Chinese Calligraphy character */}
                          <span
                            className={`text-6xl font-headline font-extrabold select-none ${
                              cakeCrust === "snowy" ? "text-neutral-500/70" : "text-amber-950/70"
                            }`}
                          >
                            {cakeImprint}
                          </span>
                        </div>
                      </div>

                      {/* Descriptive metadata labels */}
                      <div className="mt-6 text-center space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-on-surface-variant block">
                          Formulation Profile
                        </span>
                        <div className="font-headline text-md font-bold text-primary flex gap-2 justify-center capitalize select-none h-6">
                          <span>{cakeCrust}</span> · <span>{cakeShape}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-medium block">
                          {bakeState === "raw" && "Status: Unfired Dough (Raw)"}
                          {bakeState === "baking" && "Status: Active Baking (Convection)"}
                          {bakeState === "done" && "Status: Perfectly Roasted & Cooled!"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GAME 3: LANTERN RIDDLE MATCHER */}
          {activeGame === "riddles" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in text-left">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-primary font-mono uppercase bg-primary/15 px-3 py-1 rounded-full">
                    Minigame #3: Word Wisdom Puzzles
                  </span>
                  <h3 className="font-headline text-2xl text-primary font-bold mt-2">
                    Lantern riddles
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-1">
                    Spring festival lantern riddles employ homophones, shape puns, and metaphorical linkages. Match answers to claim point scores.
                  </p>
                </div>

                {/* Score badge */}
                <div className="bg-primary/5 p-4 rounded-2xl flex justify-between items-center text-xs">
                  <span className="font-bold text-primary font-body uppercase tracking-wider">Accumulated Wisdom Score:</span>
                  <strong className="font-headline text-lg text-primary">{score} Points</strong>
                </div>

                {/* ACTIVE QUESTION PANEL */}
                <div className="border border-amber-200 bg-[#fdfbf6] p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between text-[10px] font-bold font-mono text-primary/70 uppercase">
                    <span>Lantern Riddle {currentRiddleIdx + 1} of {RIDDLES.length}</span>
                    <span>Status: {riddleResult}</span>
                  </div>

                  <p className="font-headline text-base text-primary/95 leading-relaxed font-bold">
                    "{RIDDLES[currentRiddleIdx].text}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {RIDDLES[currentRiddleIdx].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => submitRiddle(opt)}
                        disabled={riddleResult !== "unanswered"}
                        className={`p-3 text-left border rounded-xl text-xs font-bold leading-snug transition-all active:scale-95 ${
                          userAnswers[currentRiddleIdx] === opt
                            ? opt === RIDDLES[currentRiddleIdx].answer
                              ? "bg-emerald-100 border-emerald-500 text-emerald-950"
                              : "bg-red-100 border-red-500 text-red-950"
                            : "border-neutral-200 bg-white hover:border-primary/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {riddleResult !== "unanswered" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 rounded-xl border bg-primary/5 text-xs text-on-surface-variant leading-relaxed text-left">
                      <strong className="block text-primary uppercase tracking-wider mb-1 font-body text-[10px]">Linguistics Insight:</strong>
                      {RIDDLES[currentRiddleIdx].ex}
                    </div>

                    <button
                      onClick={nextRiddle}
                      className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-primary-container transition-all active:scale-95"
                    >
                      Next Lantern Riddle →
                    </button>
                  </div>
                )}
              </div>

              {/* Red Lantern Side Graphic */}
              <div className="bg-gradient-to-br from-red-900 to-rose-950 border border-red-950 rounded-2xl p-6 relative min-h-[340px] shadow-inner select-none flex flex-col justify-between items-center text-center">
                <div className="w-1 bg-[#fdb64b] h-10 absolute top-0" /> {/* Lantern hanging string */}

                {/* Hanging Lantern shape circle with red glow */}
                <div className="w-52 h-56 bg-red-800 rounded-[50%_45%_50%_45%] border-y-8 border-y-[#fdb64b] border-x-4 border-x-red-900 flex flex-col items-center justify-between py-6 shadow-2xl relative translate-y-6">
                  {/* Decorative golden ribs */}
                  <div className="absolute inset-y-0 w-16 border-x-2 border-dashed border-[#fdb64b]/35 top-0" />
                  <div className="absolute inset-y-0 w-32 border-x-2 border-dashed border-[#fdb64b]/20 top-0" />

                  <span className="text-[10px] font-bold text-[#fdb64b] uppercase tracking-widest font-mono relative z-10">
                    🏮 MID-AUTUMN RIDDLE 🏮
                  </span>

                  <span className="text-3xl font-bold font-headline text-white relative z-10 select-none animate-pulse">
                    {riddleResult === "correct" ? "慶" : riddleResult === "incorrect" ? "詰" : "謎"}
                  </span>

                  <span className="text-[10px] text-white/70 font-semibold max-w-[140px] leading-tight relative z-10 font-body">
                    {riddleResult === "correct" ? "Wisdom unlocked!" : "Solve the glyph riddle"}
                  </span>
                </div>

                {/* Hanging Tassel */}
                <div className="w-4 bg-[#fdb64b] h-8 relative translate-y-8" />
                <div className="w-2 bg-red-700 h-16 relative translate-y-8" />
              </div>
            </div>
          )}

          {/* GAME 4: GUZHENG RECORDER */}
          {activeGame === "recorder" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in text-left">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-primary font-mono uppercase bg-primary/15 px-3 py-1 rounded-full">
                    Minigame #4: Pentatonic Studio
                  </span>
                  <h3 className="font-headline text-2xl text-primary font-bold mt-2">
                    Guzheng Studio &amp; Record
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-1">
                    Play traditional pentatonic chords and record them. Toggle record mode, sweep across strings, and play back your original musical score.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={toggleRecord}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all ${
                      isRecording
                        ? "bg-red-650 animate-pulse text-white font-bold border border-red-700"
                        : "bg-primary text-on-primary hover:bg-primary-container"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isRecording ? "stop" : "fiber_manual_record"}
                    </span>
                    {isRecording ? "Stop Recording Session" : "Start New Recording"}
                  </button>

                  <button
                    disabled={recordedNotes.length === 0 || isPlaying || isRecording}
                    onClick={playBackRecording}
                    className="flex-1 py-3 px-4 bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:bg-neutral-200 hover:bg-secondary/95 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    Play Recording ({recordedNotes.length} notes)
                  </button>
                </div>

                {/* Audio guidelines */}
                <div className="bg-primary/5 p-4 rounded-2xl text-xs space-y-2 leading-relaxed text-on-surface-variant">
                  <span className="font-bold text-primary uppercase font-body text-[10px] tracking-wider block">Chord Instructions:</span>
                  <p>
                    Pentatonic systems represent water flows (water has no friction). Standard piano keys represent keys shown in parentheses below (e.g. click strings or keys to record).
                  </p>
                </div>
              </div>

              {/* Soundboard strings visual */}
              <div className="bg-[#fcfaf7] border border-amber-900/10 rounded-2xl p-6 relative min-h-[340px] shadow-inner flex flex-col justify-between items-stretch">
                <span className="font-mono text-[9px] uppercase font-bold text-amber-900/60 block text-center mb-4">
                  Guzheng Studio (Pentatonic Scales)
                </span>

                <div className="bg-amber-950/10 border border-amber-900/10 rounded-2xl p-5 relative flex flex-col justify-between items-stretch gap-4 min-h-[220px] shadow-inner select-none">
                  {NOTES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => pluckNote(item)}
                      className="group relative flex items-center justify-between focus:outline-none w-full py-1.5"
                    >
                      <span className="font-headline text-[13px] font-bold text-amber-900 group-hover:text-primary transition-colors text-left w-16 leading-none">
                        {item.name}
                      </span>

                      <div className="flex-1 px-4 relative flex items-center h-3">
                        <div className="w-full h-[2.5px] bg-[#dfbfbc] rounded-full group-hover:bg-primary/90 transition-colors" />
                      </div>

                      <span className="font-mono text-[10px] text-on-surface-variant/60 w-12 text-right group-hover:text-primary font-semibold">
                        Key: {item.key}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GAME 5: TEA BREWING MASTER */}
          {activeGame === "tea" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in text-left">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-primary font-mono uppercase bg-primary/15 px-3 py-1 rounded-full">
                    Minigame #5: Beverage Science
                  </span>
                  <h3 className="font-headline text-2xl text-primary font-bold mt-2">
                    Tea Brewing Ceremony
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-1">
                    Heat community water to target temperatures, choose loose-leaf categories, and steep for calculated seconds to extract perfect sweet aromatic notes.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Choose Leaf */}
                  <div className="text-xs font-semibold">
                    <label className="text-on-surface-variant uppercase tracking-wider block mb-2 font-bold font-body">1. Choose tea Leaves Category</label>
                    <div className="flex gap-2">
                      {[
                        { id: "jasmine", label: "Green Jasmine", target: "80°C / 8s" },
                        { id: "oolong", label: "Mountain Oolong", target: "90°C / 15s" },
                        { id: "puer", label: "Pulp-Aged Pu'er", target: "98°C / 20s" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setTeaCategory(item.id as any); resetTeaSession(); }}
                          className={`flex-1 p-2.5 border rounded-xl text-left select-none transition-all ${
                            teaCategory === item.id ? "bg-primary border-primary text-white shadow" : "border-neutral-200 bg-white"
                          }`}
                        >
                          <div className="font-bold font-body">{item.label}</div>
                          <div className="text-[9px] opacity-75 font-mono mt-0.5">Target: {item.target}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Boiling Controls */}
                  <div className="border border-neutral-100 p-4 rounded-2xl bg-[#faf9f6] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-on-surface-variant font-body">2. Heat Water Vessel</span>
                      <strong className="font-mono text-base text-primary">{tempState}°C</strong>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onMouseDown={() => setHeatingActive(true)}
                        onMouseUp={() => setHeatingActive(false)}
                        onMouseLeave={() => setHeatingActive(false)}
                        onTouchStart={() => setHeatingActive(true)}
                        onTouchEnd={() => setHeatingActive(false)}
                        className="flex-1 py-2.5 bg-[#fdb64b] hover:bg-amber-500 text-rose-950 rounded-xl text-xs font-bold uppercase tracking-wider select-none shrink-0"
                      >
                        🔥 Hold to Heat Water
                      </button>

                      <button
                        disabled={brewState !== "idle"}
                        onClick={startSteeping}
                        className="py-2.1 px-5 bg-primary text-on-primary rounded-xl text-xs font-bold uppercase tracking-wider select-none hover:bg-primary-container disabled:bg-neutral-200"
                      >
                        Pour to Steep
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Pour Steep Panel */}
                {brewState === "steeping" && (
                  <div className="border border-dashed border-primary bg-primary/5 p-4 rounded-2xl flex justify-between items-center animate-pulse">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-widest block">Extracting Tea Essence...</span>
                      <strong className="font-headline text-md text-primary">{steepSeconds} Seconds elapsed</strong>
                    </div>
                    <button
                      onClick={stopSteeping}
                      className="bg-primary text-white py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      Complete Steeping
                    </button>
                  </div>
                )}

                {steepResult && (
                  <div className="space-y-3 p-4 rounded-2xl bg-white border border-secondary/20 shadow-md animate-pop-in">
                    <span className="text-[10px] font-bold text-secondary font-mono uppercase">Infusion Report:</span>
                    <h4 className="font-headline text-md font-bold text-primary">{steepResult}</h4>
                    <button
                      onClick={resetTeaSession}
                      className="text-xs text-primary underline font-bold uppercase font-body"
                    >
                      Brew Another Pot
                    </button>
                  </div>
                )}
              </div>

              {/* Ceremony Cup Side */}
              <div className="bg-[#f8f5ee] border border-amber-900/10 rounded-2xl p-6 relative min-h-[340px] shadow-inner flex flex-col justify-between items-center text-center">
                <span className="font-mono text-[9px] uppercase font-bold text-amber-900/60 block self-stretch">
                  Ceremony Table Setup
                </span>

                {/* Cup drawing and steam particles */}
                <div className="relative flex flex-col items-center justify-center my-6">
                  {/* Steaming elements when hot */}
                  {brewState === "steeping" && tempState > 70 && (
                    <div className="flex gap-2 mb-2 absolute -top-10 z-20">
                      <div className="w-1.5 h-10 bg-white/40 rounded-full animate-bounce" />
                      <div className="w-1.5 h-12 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-8 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}

                  {/* Teacup shape */}
                  <div className="w-28 h-20 bg-amber-100 rounded-b-3xl border-t-4 border-t-amber-950 border-x-4 border-x-amber-200 shadow-xl relative flex flex-col items-center justify-center">
                    {/* Inner liquid */}
                    {brewState !== "idle" && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 rounded-b-2xl transition-all duration-500 opacity-90 ${
                          teaCategory === "jasmine"
                            ? "bg-yellow-200/60 h-[70%]"
                            : teaCategory === "puer"
                            ? "bg-amber-950/75 h-[80%]"
                            : "bg-amber-600/60 h-[75%]"
                        }`}
                      />
                    )}

                    <span className="text-[10px] font-bold text-amber-950/30 font-headline pointer-events-none relative z-10 select-none">
                      AHC TEA
                    </span>
                  </div>

                  {/* Teacup saucer plate */}
                  <div className="w-36 h-3 bg-amber-900 rounded-full shadow-inner mt-1.5" />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant/60 w-full border-t border-amber-900/10 pt-2 shrink-0">
                  <span>Leaf: {teaCategory}</span>
                  <span>Water: {tempState}°C</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
