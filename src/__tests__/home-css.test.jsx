import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import '../pages/home.css';

it('home hero has correct layout classes', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  const hero = document.querySelector('.hero');
  const grid = document.querySelector('.hero-grid');
  expect(hero).not.toBeNull();
  expect(grid).not.toBeNull();
  expect(getComputedStyle(grid).display).toBe('grid');
});
