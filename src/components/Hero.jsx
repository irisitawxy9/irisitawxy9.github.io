import React from 'react';

export default function Hero({ eyebrow, title, subtitle, cta }) {
  return (
    <section className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {eyebrow && <p className="uppercase tracking-wide text-sm opacity-70">{eyebrow}</p>}
        <h1 className="text-3xl font-bold mt-1">{title}</h1>
        {subtitle && <p className="mt-3 text-lg leading-relaxed">{subtitle}</p>}
        {cta}
      </div>
    </section>
  );
}
