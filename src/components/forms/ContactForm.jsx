import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 500));
    setStatus('success');
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 max-w-xl">
      <input required name="name" placeholder="Your name" className="border p-2 rounded" />
      <input required type="email" name="email" placeholder="Your email" className="border p-2 rounded" />
      <textarea required name="message" placeholder="Your message" className="border p-2 rounded min-h-28"></textarea>
      <button disabled={status==='submitting'} className="border px-4 py-2 rounded w-fit">
        {status==='submitting' ? 'Sending…' : 'Send'}
      </button>
      {status==='success' && (
        <p className="text-green-600">Thank you! Your submission has been received!</p>
      )}
    </form>
  );
}
