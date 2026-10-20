import React from 'react';
import { BlogPost } from '../types';
import { ResponsiveImage } from './ResponsiveImage';
import { BLOG_POSTS, COMPANY_INFO } from '../data/siteData';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Tag,
  Share2,
  Phone,
  ShieldCheck,
  Send
} from 'lucide-react';

interface BlogDetailPageProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onNavigatePost: (postId: string) => void;
  onOpenQuote: () => void;
  onSuccessToast: (msg: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  onBackToBlog,
  onNavigatePost,
  onOpenQuote,
  onSuccessToast,
}) => {
  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
  const prevPost =
    currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : BLOG_POSTS[BLOG_POSTS.length - 1];
  const nextPost =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : BLOG_POSTS[0];

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-[#171A1D] via-[#202326] to-[#171A1D] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <button
                onClick={onBackToBlog}
                className="hover:text-[#F36B21] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Articles
              </button>
              <span>/</span>
              <span className="text-[#F36B21] font-semibold">{post.category}</span>
            </div>

            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#F36B21] text-white shadow">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 mt-4 pt-4 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F36B21]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F36B21]" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="text-slate-400">Published by ApexGutters Field Specialists</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED IMAGE */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[380px] sm:h-[480px]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. ARTICLE CONTENT */}
      <article className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Takeaways Callout Box */}
          <div className="p-6 bg-orange-50/80 border border-orange-200 rounded-2xl mb-10 space-y-3">
            <h2 className="font-extrabold text-orange-950 text-xs uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F36B21]" />
              Key Expert Takeaways
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F36B21] flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Paragraphs */}
          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            {post.content.map((p, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Consultation Callout */}
          <div className="mt-12 p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
                Professional Gutter Inspection
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Concerned about your home’s roofline or drainage?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Our technicians provide free on-site digital slope audits and written proposals.
              </p>
            </div>
            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Get Quote
            </button>
          </div>

          {/* Previous / Next Article Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigatePost(prevPost.id)}
              className="p-4 rounded-xl border border-slate-200 hover:border-[#F36B21] transition-all text-left group cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Guide
              </span>
              <span className="text-xs font-bold text-slate-900 group-hover:text-[#F36B21] transition-colors line-clamp-1">
                {prevPost.title}
              </span>
            </button>

            <button
              onClick={() => onNavigatePost(nextPost.id)}
              className="p-4 rounded-xl border border-slate-200 hover:border-[#F36B21] transition-all text-right group cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-end gap-1 mb-1">
                Next Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs font-bold text-slate-900 group-hover:text-[#F36B21] transition-colors line-clamp-1">
                {nextPost.title}
              </span>
            </button>
          </div>
        </div>
      </article>

      {/* 4. RELATED ARTICLES */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Related Articles</h2>
            <button
              onClick={onBackToBlog}
              className="text-xs font-bold text-[#F36B21] hover:text-[#D95412] flex items-center gap-1 cursor-pointer"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="cards">
            {relatedPosts.map((related) => (
              <button
                type="button"
                key={related.id}
                onClick={() => onNavigatePost(related.id)}
                aria-label={`Read related article: ${related.title}`}
                className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer text-left group flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <ResponsiveImage
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">
                    {related.date}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#F36B21] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
