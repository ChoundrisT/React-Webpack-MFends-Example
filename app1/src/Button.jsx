import React,{useState} from 'react'
import styled from 'styled-components';

// const Button = styled.button`
//   display: inline-block;
//   border-radius: 30px; /* Rounder corners */
//   padding: 0.75rem 2rem; /* Larger padding for more visual appeal */
//   margin: 0.5rem 1rem;
//   width: auto; /* Let the button size adjust to content */
//   background: linear-gradient(45deg, #ff6b6b, #f06595); /* Gradient background */
//   color: white;
//   font-size: 1.2rem;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Sleek font */
//   font-weight: bold;
//   border: none; /* No border for a cleaner look */
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Soft shadow */
//   cursor: pointer;
//   transition: all 0.3s ease-in-out; /* Smooth transition for hover effect */
  
//   &:hover {
//     background: linear-gradient(45deg, #f06595, #ff6b6b); /* Inverted gradient on hover */
//     transform: scale(1.05); /* Slightly enlarge the button on hover */
//     box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
//   }

//   &:active {
//     transform: scale(0.98); /* Slight shrink on click for feedback */
//   }
// `;


// const AnimatedWrapper = styled.div`
//    margin-left: 0px;
//    transition: margin-left 3s ease;

//    &:hover {
//       margin-left: 100px;
//    }
// `;


const AnimatedWrapper = styled.div`
   margin-left: ${(props) => (props.$moved ? '600px' : '0px')};
   transition: margin-left 2s ease;
   display: inline-block;
`;

const Button = ({
   size = 24,
   color = "",
   className,
   ...props
}) => {
   const [moved, setMoved] = useState(false);

   const handleClick = () => {
      setMoved((prev) => !prev);
   };

   return (
      <AnimatedWrapper $moved={moved} className={className} onClick={handleClick}>
         <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            transform="scale(-1 1)"
            {...props}
         >
            <g />
            <path
               d="M4.1 17.9C4.5 19.1 5.6 20 7 20c1.3 0 2.4-.8 2.8-2h4.4c.4 1.2 1.5 2 2.8 2 1.4 0 2.5-.9 2.9-2.1 1.2-.4 2.1-1.5 2.1-2.9v-4c0-1.9-1.3-3.5-3.1-3.9.1-.2.1-.4.1-.6C19 5.1 17.9 4 16.5 4h-7C8.1 4 7 5.1 7 6.5c0 .2 0 .3.1.5h-.2c-1.5 0-2.8.8-3.5 2.1l-1 2c-.1.2-.1.3-.2.5-.1.3-.2.6-.2.9V15c0 1.4.9 2.5 2.1 2.9M7 18c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m10 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m3-7H10V9h8c1.1 0 2 .9 2 2M9.5 6h7c.3 0 .5.2.5.5s-.2.5-.5.5h-7c-.3 0-.5-.2-.5-.5s.2-.5.5-.5m-4.3 4.1c.3-.7 1-1.1 1.7-1.1H8v2H4.7zM4 13h16v2c0 .3-.1.5-.3.7-.1-.1-.1-.3-.2-.4s-.2-.2-.3-.4l-.1-.1-.3-.3s-.1 0-.1-.1c-.1-.1-.3-.2-.5-.2h-.1c-.1 0-.3-.1-.4-.1h-.1c-.2-.1-.4-.1-.6-.1s-.4 0-.6.1h-.2c-.1 0-.2.1-.4.1-.1 0-.1 0-.2.1s-.2.1-.3.2c0 0-.1 0-.1.1-.1.1-.3.2-.4.3l-.1.1-.3.3-.1.1c-.1.1-.1.2-.2.3 0 .1 0 .1-.1.2v.1H9.8v-.1c0-.1 0-.1-.1-.2s-.1-.2-.2-.3l-.1-.1-.3-.3-.1-.1c-.1-.1-.3-.2-.4-.3l-.1-.1c-.1-.1-.2-.1-.3-.2-.1 0-.1 0-.2-.1-.1 0-.2-.1-.4-.1h-.2c0-.1-.2-.1-.4-.1s-.4 0-.5.1h-.1c-.1 0-.3.1-.4.1h-.1c-.2.1-.3.2-.5.2 0 0-.1 0-.1.1l-.3.3-.1.1c-.1.1-.2.2-.3.4-.1.1-.2.2-.2.4-.3-.2-.4-.4-.4-.7z"
               fill={color}
            />
         </svg>
      </AnimatedWrapper>
   );
};

export default Button;

