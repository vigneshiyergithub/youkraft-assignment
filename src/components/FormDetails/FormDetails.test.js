import { render, screen } from '@testing-library/react';
import FormDetails from './FormDetails';

test('can render a form', () => {
  render(<FormDetails />);
  const formElement = screen.getByTestId('input-form')
  expect(formElement).toBeInTheDocument();
});

test('form has Name, Age, Email, Phone Number', () => {
  render(<FormDetails />);
  const elements = ['Name', 'Age', 'Email', 'Phone Number'];
  elements.forEach(el => {
    const formInputEl = screen.getByLabelText(el);
    expect(formInputEl).toBeInTheDocument();
  })
});

test('form has submit button', () => {
  render(<FormDetails />);
  const submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
});

test('form has a reset button', () => {
  render(<FormDetails />);
  const resetButton = screen.getByText('Reset');
  expect(resetButton).toBeInTheDocument();
})
