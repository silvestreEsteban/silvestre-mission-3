import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AiTextChat from './AiTextChat';
import '@testing-library/jest-dom';


test('renders AI Mock Interviewer heading', () => {
    const headingElement = screen.getByText(/AI Mock Interviewer/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('updates job title input value', () => {
    render(<AiTextChat />);
    const inputElement = screen.getByLabelText(/Job Title:/i);
    fireEvent.change(inputElement, { target: { value: 'Junior Software Developer' } });
    expect(inputElement.value).toBe('Junior Software Developer');
  });

  test('updates conversation when message is submitted', async () => {
    render(<AiTextChat>);
    const inputElement = screen.getByLabelText(/Job Title:/i);
    fireEvent.change(inputElement, { target: { value: 'Junior Software Developer' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  
    const chatInputElement = screen.getByLabelText(/chat-box-input/i);
    fireEvent.change(chatInputElement, { target: { value: 'Hello' } });
    fireEvent.submit(screen.getByText(/Submit/i));
  
    const userMessage = await screen.findByText(/Hello/i);
    expect(userMessage).toBeInTheDocument();
  });