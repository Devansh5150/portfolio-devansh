import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://devansh-datta.vercel.app';
const DEFAULT_DESCRIPTION =
  'Portfolio of Devansh Datta — AI/ML engineer, full-stack developer, published author, and startup founder.';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * useSEO — dynamically updates <head> meta tags for each page/route.
 * Falls back gracefully when values are omitted.
 */
export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes('Devansh Datta')
      ? title
      : `${title} | Devansh Datta`;

    // ── document.title ──────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Helper: upsert <meta> tag ───────────────────────────────────────────
    const setMeta = (selector: string, content: string, attr = 'content') => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('[', '').replace(']', '').split('=');
        el.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    // ── Helper: upsert <link> tag ───────────────────────────────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // ── Primary ─────────────────────────────────────────────────────────────
    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);
    setMeta(
      'meta[name="robots"]',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    );

    // ── Canonical ───────────────────────────────────────────────────────────
    setLink('canonical', canonical ?? BASE_URL + window.location.pathname);

    // ── Open Graph ──────────────────────────────────────────────────────────
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:url"]', canonical ?? BASE_URL + window.location.pathname);
    setMeta('meta[property="og:image"]', ogImage);

    // ── Twitter Card ────────────────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);
  }, [title, description, keywords, canonical, ogType, ogImage, noindex]);
}
