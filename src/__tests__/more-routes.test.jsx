import React from 'react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

const cases = [
  { path: '/', text: 'Quick peek — Previous Projects' },
  { path: '/branding', text: 'Branding' },
  { path: '/website', text: 'Website' },
  { path: '/email-marketing', text: 'Email Marketing' },
  { path: '/social-media', text: 'Social Media' },
  { path: '/graphic-design', text: 'Graphic Design' },
  { path: '/passion', text: 'my motivations' }
];

describe('Route render coverage', () => {
  for (const c of cases) {
    it(`renders ${c.path}`, () => {
      render(
        <MemoryRouter initialEntries={[c.path]}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(c.text)).toBeInTheDocument();
    });
  }
});
