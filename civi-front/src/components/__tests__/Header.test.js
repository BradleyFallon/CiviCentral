import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders header with logo, navigation, and search bar', () => {
  render(<Header />);
  
  const logo = screen.getByText(/CiviCentral/i);
  expect(logo).toBeInTheDocument();

  const searchBar = screen.getByPlaceholderText(/Search/i);
  expect(searchBar).toBeInTheDocument();

  const navItems = ['Discussions', 'Issues', 'Expert Analysis'];
  navItems.forEach((item) => {
    const navItem = screen.getByText(new RegExp(item, 'i'));
    expect(navItem).toBeInTheDocument();
  });
});