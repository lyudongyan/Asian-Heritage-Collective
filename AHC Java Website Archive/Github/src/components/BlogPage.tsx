import React, { useState, useEffect } from "react";
import { IMAGES } from "../data";

interface BlogPageProps {
  onBack: () => void;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  img: string;
  tag: string;
}

const FIVE_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "I Quit Chinese School. Then I Got a 5 on the AP Exam.",
    date: "May 12, 2026",
    author: "Lyudong Yan",
    tag: "Reflection",
    excerpt: "I spent years dreading Chinese school. Then something changed, and I ended up teaching it.",
    content: `I quit Chinese school at the end of middle school. Not because I didn't care about being Chinese — I just couldn't see the point of showing up every Saturday to copy characters I didn't understand into a notebook I'd never look at again. It felt like homework for a subject nobody had convinced me mattered yet. So I stopped going.

Then high school happened, and something shifted. I started thinking more seriously about where my family was from, what I actually knew about it, and what I'd let go of by checking out. I decided to try studying Mandarin again, but this time on my own terms. No classroom, no weekly drills, just me working through the language because I actually wanted to.

I ended up self-studying for the AP Chinese Language exam. When the scores came back, I had a 5. That score meant more to me than almost anything else I'd done academically — not because of the number, but because of what it represented. I had walked away from the language and found my way back to it.

Shortly after, I applied to become a Teacher's Assistant for an AP Chinese class. I got accepted. The thing I had once dreaded going to on Saturday mornings was now something I was voluntarily showing up to teach.

I'm not telling this story to suggest that quitting and coming back is the right path. For a lot of people it isn't. But I think about it a lot when I think about why AHC exists. The traditional model of cultural education wasn't working for me, and it isn't working for a lot of kids. We started AHC because we think there's a better way. I'm still figuring out what that looks like. But it starts with making cultural education something students want to come back to.`,
    img: IMAGES.chinese_school_blog
  },
  {
    id: 2,
    title: "Why I Go Back to Chongqing Every Year",
    date: "April 18, 2026",
    author: "Jerry Mao",
    tag: "Personal",
    excerpt: "It's always 40 degrees outside and the air conditioning is never quite enough. I go back every year anyway.",
    content: `Chongqing is hot. Not warm — the kind of heat that sits on you. It's frequently 40 degrees Celsius in the summer, and the air conditioning is never quite enough. You step outside and within a minute you're already wondering how anyone lives like this.

And yet, every year, my parents take me back. No exceptions.

When I was younger I didn't question it. It was just a thing we did — a month in China, visiting family, eating food I didn't get back home, then back to Michigan. As I got older and summers started filling up with other things, I started to understand that this trip was non-negotiable in a way most things weren't. My parents didn't ask whether I wanted to go. We were going.

I think I understand why now.

When I land in Chongqing, I see my grandparents. My younger cousin picks up the er'hu and plays something in the living room while dinner is being made. There's a particular kind of noise to those evenings — dishes, conversation, a television on somewhere — that I don't hear anywhere else. It doesn't feel like visiting. It feels like returning.

The closest I can get to describing it: it's like going on vacation, except the destination is the one place where you feel the most like yourself. Even if it's 40 degrees and there's no relief in sight.

I'm not always in a rush to get there. The flights are long, the heat is real, and a month is a long time. But somewhere around day three, when the jet lag has worn off and I've settled back into the rhythm of that apartment, I stop thinking about what I'm missing back home. This is also home.

That's what my parents understood that took me longer to get. You can build a life somewhere new without letting go of where you came from. The trip back every year isn't a concession to the past. It's how you make sure the past stays part of you.`,
    img: IMAGES.chongqing_blog
  },
  {
    id: 3,
    title: "Why Do Asians Drink Hot Water?",
    date: "March 5, 2026",
    author: "AHC Editorial Team",
    tag: "Culture",
    excerpt: "Your grandparents swore by it. There might be more to it than habit.",
    content: `Why does my grandma always drink hot water? Even in summer?

Mine does the same thing. I asked her once and she looked at me like it was a strange question.

It kind of is, from her perspective.

The preference for hot water runs deep in Chinese culture and goes back further than most people expect. Traditional Chinese medicine has long held that cold water disrupts the body's internal balance — that it contracts the stomach and interferes with digestion, particularly after eating. Hot water is seen as warming and stabilizing, something that keeps the body functioning as it should.

So it's a health thing?

Partly. But it's also generational habit reinforced over centuries. In many parts of China, boiling water was a practical necessity before modern water treatment. Drinking it hot, or letting boiled water cool before drinking, was simply safer. The habit outlasted the original reason.

That actually makes sense. We still do it even though we have clean water now.

Yeah. My grandparents don't think about why. It's just what you do.

There's also a social dimension. Offering someone hot water or tea when they arrive at your home is a gesture of care — an acknowledgment that someone has arrived and you want them to be comfortable. Cold water doesn't carry the same weight in that context.

So it's hospitality.

In a way. Though your grandparents would probably just say it's good for you.

Western medicine doesn't have a strong consensus on the specific health claims, but there is some evidence that warm liquids aid digestion and circulation in mild ways. The scientific case isn't really the point though.

The point is that it's a habit with a history.

Right. And like a lot of things our grandparents do, it makes more sense once you know where it comes from.`,
    img: IMAGES.chinese_hot_water
  },
  {
    id: 4,
    title: "Why Asians Are Perceived as Racist — And Why It's More Complicated Than That",
    date: "February 20, 2026",
    author: "AHC Editorial Team",
    tag: "Society",
    excerpt: "Many observers view homogeneous Asian countries as having issues with racism, but the historical and cultural context of ethnic uniformity is much more complex.",
    content: `When visitors travel to homogeneous Asian nations, they often notice social dynamics that seem exclusionary or discriminatory. It is common to hear stories of landlords refusing to rent to foreigners, or people staring in public. To Western observers, these actions are quickly classified under the framework of racism. However, understanding these behaviors requires examining a very different historical and cultural context.

First, many East Asian nations historically practiced strict policies of national isolation—such as the Sakoku period in Japan or China's imperial restrictions. For centuries, these societies developed in relative isolation, creating a strong sense of ethnic and cultural uniformity. Unlike Western multicultural societies, identity in these regions became deeply tied to a singular ancestry, language, and social code.

Second, the lack of exposure to diversity plays a major role. In countries where 98% or more of the population shares the same ethnic background, interactions with foreigners are rare. What is often perceived as malice or systemic racism is frequently a combination of extreme curiosity, social awkwardness, and a fear of not being able to communicate due to language barriers.

Furthermore, social conformity is highly valued in collectivist cultures. Any individual who stands out—whether a foreigner or a native who deviates from the norm—faces social pressure. 

While discrimination and xenophobia certainly exist and should be addressed, framing them solely through the lens of Western racial theory oversimplifies the issue. It is not about historical systems of racial supremacy, but rather about a deep-seated insularity and the challenge of adapting traditional homogeneous societies to an increasingly globalized world.`,
    img: IMAGES.homogenous_race
  },
  {
    id: 5,
    title: "Why Asians Spend More on Food as They Get Richer",
    date: "January 15, 2026",
    author: "AHC Editorial Team",
    tag: "Economics",
    excerpt: "In many Western countries, food spending stabilizes as wealth increases. In Asia, dining expenses skyrocket. Let's look at the cultural obsession with dining.",
    content: `In classical economics, Engel's Law states that as household income rises, the percentage of income spent on food declines. While this holds true for basic sustenance, modern consumer behavior in Asian countries presents a fascinating deviation: as households enter the middle and upper classes, their absolute spending on dining and premium food experiences grows exponentially.

To understand this, one must look at the unique cultural significance of food in Asian societies. In the West, wealth displays often take the form of luxury vehicles, fashion, or real estate. In Asia, while those indicators exist, food is a primary medium for social capital and prestige.

Hosting a dinner is not merely a social gathering; it is an active demonstration of respect, relationship building, and hospitality. Offering guests rare ingredients, high-grade seafood, or dining at an exclusive establishment signals the host's esteem for their guests and their own social standing.

Additionally, food plays a central role in family cohesion and heritage preservation. Multi-generational gatherings almost always revolve around elaborate meals, where the quality of the food represents the care and prosperity of the family unit.

Rather than treating food as a utility, Asian consumers increasingly view dining as an investment in health, social bonds, and cultural identity. As a result, premium markets, organic ingredients, and high-end gastronomy continue to thrive, defying traditional economic models of saturation.`,
    img: IMAGES.chinese_dining_expenses
  }
];

export default function BlogPage({ onBack }: BlogPageProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Smooth scroll to top of page when blog post detail is opened or changed
  useEffect(() => {
    if (selectedPostId !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedPostId]);

  // If a post is selected, render the detail page
  if (selectedPostId !== null) {
    const postIndex = FIVE_BLOGS.findIndex((p) => p.id === selectedPostId);
    const post = FIVE_BLOGS[postIndex];

    if (post) {
      return (
        <div className="pt-32 pb-24 min-h-screen bg-[#faf8f6] select-text relative text-left">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setSelectedPostId(null)}
              className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Blogs
            </button>

            {/* Article container */}
            <article key={post.id} className="bg-white border border-neutral-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
              {/* Meta */}
              <div className="space-y-4 animate-slide-up-fade">
                <div className="flex flex-wrap gap-2 items-center text-xs text-on-surface-variant/70 font-semibold font-mono">
                  <span>{post.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span>By {post.author}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest font-mono">
                    {post.tag}
                  </span>
                </div>
                <h1 className="font-headline text-3xl md:text-5xl text-primary font-bold leading-tight">
                  {post.title}
                </h1>
              </div>

              {/* Cover Image */}
              <div className="w-full h-64 md:h-[450px] overflow-hidden rounded-2xl border border-neutral-100 shadow-inner animate-slide-up-fade delay-100">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover"
                  src={post.img}
                />
              </div>

              {/* Excerpt */}
              <div className="p-5 border-l-4 border-primary/20 bg-primary/5 rounded-r-2xl italic font-body text-base text-on-surface-variant/90 leading-relaxed animate-slide-up-fade delay-200">
                "{post.excerpt}"
              </div>

              {/* Content */}
              <div className="font-body text-base md:text-lg text-on-surface-variant/95 leading-relaxed whitespace-pre-line space-y-6 animate-slide-up-fade delay-300">
                {post.content}
              </div>

              {/* Navigation buttons */}
              <div className="border-t border-neutral-100 pt-8 mt-12 flex items-center justify-between gap-4 animate-slide-up-fade delay-400">
                {postIndex > 0 ? (
                  <button
                    onClick={() => setSelectedPostId(FIVE_BLOGS[postIndex - 1].id)}
                    className="font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Previous Post
                  </button>
                ) : (
                  <div />
                )}

                {postIndex < FIVE_BLOGS.length - 1 ? (
                  <button
                    onClick={() => setSelectedPostId(FIVE_BLOGS[postIndex + 1].id)}
                    className="font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    Next Post
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </article>
          </div>
        </div>
      );
    }
  }

  // List grid view
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#faf8f6] select-text relative text-left">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px] animate-fade-in">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Header Title */}
        <div className="max-w-xl mb-16">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-1">
            Community Newsroom
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Living Heritage Blog
          </h2>
          <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
            Read stories, historical essays, and development research written by our directors, traditional artists, and volunteers.
          </p>
        </div>

        {/* Blog layout grid - exactly 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIVE_BLOGS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-primary/25 hover:shadow-xl cursor-pointer transform hover:-translate-y-1.5"
            >
              <div>
                <div className="h-48 w-full overflow-hidden relative border-b border-neutral-50">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover"
                    src={post.img}
                  />
                  <span className="absolute top-4 left-4 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md font-mono">
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex gap-2 items-center text-[11px] text-on-surface-variant/70 font-semibold font-mono">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-primary leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant/85 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs text-primary font-bold font-body inline-block uppercase tracking-wider">
                  Read Full Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
