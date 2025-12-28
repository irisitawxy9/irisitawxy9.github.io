import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../components/forms/ContactForm.jsx';

describe('ContactForm', () => {
  it('submits and shows success', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Iris' } });
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'iris@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your message'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('Thank you! Your submission has been received!')).toBeInTheDocument();
    });
  });
});
