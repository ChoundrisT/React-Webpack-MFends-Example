import React, { Suspense, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Button = lazy(() => import("app1/Button").catch(() => ({ default: () => <div>Error loading button</div> })));

export default function Home() {
   const navigate = useNavigate(); 

   const handleButtonClick = () => {
      navigate("/vans"); 
   };

   return (
      <div className="home-container">
         <h1>You got the travel plans, we got the travel vans.</h1>
         <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
         <Link to="vans">Find your van</Link>
         {/* <ErrorBoundary> */}
            <Suspense fallback={<div>Loading...</div>}>
               <Button onClick={handleButtonClick}>Button from Project App1, also going to /vans</Button>
            </Suspense>
         {/* </ErrorBoundary> */}
      </div>
   );
}
