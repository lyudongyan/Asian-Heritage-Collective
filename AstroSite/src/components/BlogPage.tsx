import React, { useState } from "react";
import { BLOG_POSTS } from "../data/blogPosts";

const images = import.meta.glob<{ default: { src: string } }>("../assets/images/*", { eager: true });

function imageFor(filename: string): string {
  return images[`../assets/images/${filename}`]?.default?.src ?? "";
}

function readingTime(content: string): number {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200));
}

const tags = ["All", ...Array.from(new Set(BLOG_POSTS.map((post) => post.tag)))];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const posts = activeTag === "All" ? BLOG_POSTS : BLOG_POSTS.filter((post) => post.tag === activeTag);

  return (
    <main className="page-shell">
      <header className="page-hero page-width">
        <h1>Student Blogs</h1>
        <p>Student writing on language, identity, family, culture, and community.</p>
      </header>

      <section className="page-width">
        <div className="filters" aria-label="Filter posts by topic">
          {tags.map((tag) => (
            <button
              className={`filter-button ${activeTag === tag ? "is-active" : ""}`}
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="content-grid">
          {posts.map((post, index) => (
            <a
              className={`content-tile reveal ${index === 0 ? "featured" : ""}`}
              href={`/blog/${post.slug}`}
              key={post.slug}
              style={{ backgroundImage: `url(${imageFor(post.imageFile)})` }}
            >
              <div className="image-shade" />
              <div className="tile-copy liquid-surface liquid-dark" data-glass>
                <div className="tile-meta">
                  <span>{post.tag}</span>
                  <span>{post.date}</span>
                  <span>{readingTime(post.content)} min read</span>
                </div>
                {index === 0 ? <h2>{post.title}</h2> : <h3>{post.title}</h3>}
                <p>{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
