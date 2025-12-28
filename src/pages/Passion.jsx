import React from 'react';
import './passion.css';

export default function Passion() {
  const sections = [
    { h: 'Travel — Fudan University, China', p: 'Exchange program highlights.' },
    { h: 'Travel — Strasbourg, France', p: 'Study abroad snapshots.' },
    { h: 'Camera', p: 'Capture feelings that last forever.' },
    { h: 'Nature', p: 'Embrace the beauty of nature from land to sea.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">my motivations</h1>
      <p className="opacity-80">Do what excites you, and the rest will follow.</p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {sections.map(s => (
          <article key={s.h} className="border rounded-lg p-4">
            <h3 className="font-semibold">{s.h}</h3>
            <p className="opacity-80">{s.p}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
