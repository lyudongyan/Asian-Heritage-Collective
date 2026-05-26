import React from "react";
import { IMAGES } from "../data";

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-about animate-fade-in relative select-text">
      {/* Decorative ambient elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px] relative z-10">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Editorial Quote Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-4">
            Our Philosophy & Legacy
          </span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary font-bold italic leading-tight mb-8">
            "To understand our lineage is to nourish our futures, bridging decades of history with tomorrow's dreams."
          </h2>
          <div className="w-16 h-[2px] bg-primary/30 mx-auto" />
        </div>

        {/* Staggered Lorem Ipsum Blocks with Unique Images */}
        <div className="space-y-24">
          {/* Block 1: Left Text, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                1. Cultivating Cultural Identity
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Aliquam ut porttitor leo a diam sollicitudin tempor. Sed elementum tempus egestas sed sed risus. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Accumsan tortor posuere ac ut consequat semper viverra.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                alt="Cultivating Identity"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.founding_story_left}
              />
            </div>
          </div>

          {/* Block 2: Right Text, Left Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            <div className="lg:order-2 space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                2. Grassroots Advocacy & Service
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Integer vitae justo eget magna fermentum.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Ultrices neque ornare aenean euismod elementum nisi quis. Condimentum lacinia quis vel eros elementum leo. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Purus gravida quis blandit turpis cursus in hac. Viverra suspendisse potenti nullam ac tortor vitae purus. In tellus integer feugiat scelerisque varius morbi enim.
              </p>
            </div>
            <div className="lg:order-1 overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                alt="Advocacy and Service"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.community_engagement}
              />
            </div>
          </div>

          {/* Block 3: Left Text, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                3. The Intersection of Art & Modernity
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Eros in cursus turpis massa tincidunt dui ut. In nibh mauris cursus mattis molestie a iaculis at erat. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus molestie nunc non blandit massa enim. Dignissim suspendisse in est ante in nibh mauris. Quisque id diam vel quam elementum pulvinar etiam non.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Sit amet dictum sit amet justo donec enim diam vulputate. Vitae ultrices leo integer malesuada. Dignissim sodales ut eu sem integer vitae justo eget magna. Enim ut tellus elementum sagittis vitae et leo duis. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Purus non enim praesent elementum facilisis. Leo duis ut diam quam nulla.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                alt="Intersection of Art"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.cultural_performance}
              />
            </div>
          </div>
        </div>

        {/* Closing paragraph block */}
        <div className="mt-24 text-center max-w-3xl mx-auto liquid-glass-strong p-8 md:p-12 rounded-3xl shadow-md border border-primary/10">
          <h3 className="font-headline text-xl font-bold text-primary mb-4">Our Growing Commitment</h3>
          <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
            Asian Heritage Collective is a registered 501(c)(3) nonprofit built on the bedrock of community investment. Each of our classes, performance schedules, and culinary seminars are offered free to the public, backed by generous sponsorships, volunteer devotion, and traditional spirit.
          </p>
          <button
            onClick={onBack}
            className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 shadow-md"
          >
            Explore Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
