import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load the Button component
const Button = lazy(() => import("app1/Button").catch(() => ({ default: () => <div>Error loading button</div> })));

export default function Home() {
   return (
      <div className="home-container">
         <h1>You got the travel plans, we got the travel vans.</h1>
         <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
         <Link to="vans">Find your van</Link>
         {/* <ErrorBoundary> */}
            <Suspense fallback={<div>Loading...</div>}>
               <Button>Button from Project App1</Button>
            </Suspense>
         {/* </ErrorBoundary> */}
      </div>
   );
}
