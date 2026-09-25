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

        {posts.length > 0 && (
          <div className="blog-layout blog-filter-stage" key={activeTag} aria-live="polite">
            <a className="blog-featured blog-filter-item liquid-surface liquid-light" data-glass href={`/blog/${posts[0].slug}`}>
              <img src={imageFor(posts[0].imageFile)} alt="" />
              <div className="blog-featured-copy">
                <div className="blog-meta"><span>{posts[0].tag}</span><span>{posts[0].date}</span></div>
                <h2>{posts[0].title}</h2>
                <p>{posts[0].excerpt}</p>
                <span className="blog-byline">{posts[0].author} · {readingTime(posts[0].content)} min read</span>
              </div>
            </a>

            <div className="blog-grid">
              {posts.slice(1).map((post, index) => (
                <a
                  className="blog-card blog-filter-item liquid-surface liquid-light"
                  data-glass
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  style={{ "--blog-index": index + 1 } as React.CSSProperties}
                >
                  <img src={imageFor(post.imageFile)} alt="" />
                  <div className="blog-card-copy">
                    <div className="blog-meta"><span>{post.tag}</span><span>{post.date}</span></div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-byline">{post.author} · {readingTime(post.content)} min read</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
