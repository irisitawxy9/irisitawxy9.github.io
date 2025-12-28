import React from 'react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

describe('App routing', () => {
  it('renders navbar links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('My Story')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Branding')).toBeInTheDocument();
  });

  it('navigates to /my-story and shows heading', () => {
    render(
      <MemoryRouter initialEntries={['/my-story']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('my story')).toBeInTheDocument();
  });

  it('navigates to /work and shows Projects & Case Studies', () => {
    render(
      <MemoryRouter initialEntries={['/work']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Projects & Case Studies')).toBeInTheDocument();
  });
});
