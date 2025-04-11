import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  border-radius: 30px; /* Rounder corners */
  padding: 0.75rem 2rem; /* Larger padding for more visual appeal */
  margin: 0.5rem 1rem;
  width: auto; /* Let the button size adjust to content */
  background: linear-gradient(45deg, #ff6b6b, #f06595); /* Gradient background */
  color: white;
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Sleek font */
  font-weight: bold;
  border: none; /* No border for a cleaner look */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Soft shadow */
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth transition for hover effect */
  
  &:hover {
    background: linear-gradient(45deg, #f06595, #ff6b6b); /* Inverted gradient on hover */
    transform: scale(1.05); /* Slightly enlarge the button on hover */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
  }

  &:active {
    transform: scale(0.98); /* Slight shrink on click for feedback */
  }
`;

export default Button;
