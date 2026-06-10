import React, { useState } from "react";
import { BLOG_POSTS } from "../data/blogPosts";
import { Eyebrow } from "./ui";

// Resolve cover images from filenames at build time (Vite)
const allImages = import.meta.glob<{ default: { src: string } }>(
  "../assets/images/*",
  { eager: true }
);

function imgSrc(filename: string): string {
  return allImages[`../assets/images/${filename}`]?.default?.src ?? "";
}

const TAGS = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.tag)))];

function readingTime(content: string): number {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200));
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.tag === activeTag);

  const [featured, ...rest] = filtered;

  return (
    <div className="pt-36 pb-24 min-h-screen bg-[#faf8f6] select-text relative text-left overflow-hidden">
      <span
        aria-hidden="true"
        className="text-watermark font-headline text-[13rem] absolute top-16 right-0 leading-none pointer-events-none hidden xl:block"
      >
        故事
      </span>

      <div className="container mx-auto px-6 md:px-12 max-w-[1180px] relative">
        {/* Header */}
        <header className="max-w-2xl mb-12 animate-slide-up-fade">
          <Eyebrow className="mb-6">Living Heritage</Eyebrow>
          <h1 className="font-headline text-4xl md:text-6xl text-primary font-bold leading-[1.05] mb-6">
            Stories worth <em className="italic">passing down</em>.
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            Essays, reflections, and cultural deep-dives written by AHC
            members and contributors — on identity, family, food, and finding
            your way back.
          </p>
        </header>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2.5 mb-14 animate-slide-up-fade delay-100">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full font-body text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                activeTag === tag
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-white text-on-surface-variant border border-outline/15 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <a
            href={`/blog/${featured.slug}`}
            key={featured.slug}
            className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-300 no-underline group mb-12 animate-fade-in"
          >
            <div className="h-64 lg:h-auto overflow-hidden relative">
              <img
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={imgSrc(featured.imageFile)}
              />
              <span className="absolute top-5 left-5 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md font-mono">
                Featured · {featured.tag}
              </span>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex gap-2 items-center text-[11px] text-on-surface-variant/70 font-semibold font-mono mb-4">
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span>{featured.author}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span>{readingTime(featured.content)} min read</span>
              </div>
              <h2 className="font-headline text-2xl md:text-4xl font-bold text-primary leading-tight mb-4 group-hover:text-primary-container transition-colors">
                {featured.title}
              </h2>
              <p className="font-body text-sm md:text-base text-on-surface-variant/90 leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <span className="font-body text-[11px] font-bold text-primary uppercase tracking-widest inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                Read the full essay
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </a>
        )}

        {/* Remaining posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((post, i) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ animationDelay: `${i * 80}ms` }}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm flex flex-col transition-all duration-300 hover:border-primary/25 hover:shadow-xl cursor-pointer hover:-translate-y-1.5 no-underline group animate-slide-up-fade"
            >
              <div className="h-48 w-full overflow-hidden relative border-b border-neutral-50">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  src={imgSrc(post.imageFile)}
                />
                <span className="absolute top-4 left-4 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md font-mono">
                  {post.tag}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1">
                <div className="flex gap-2 items-center text-[11px] text-on-surface-variant/70 font-semibold font-mono">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300" />
                  <span>{readingTime(post.content)} min</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary leading-snug line-clamp-2 group-hover:text-primary-container transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant/85 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between">
                <span className="font-body text-[11px] text-on-surface-variant/70 font-semibold">
                  {post.author}
                </span>
                <span className="text-xs text-primary font-bold font-body uppercase tracking-wider inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
