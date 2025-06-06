// import "./App.css";
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import {Route, Routes} from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import { useState } from "react";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return(


//     <div className="w-screen h-screen bg-richblack-900 flex flex-col">
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

//       <Routes>
//           <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}/>
//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
//           <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
//           <Route path="/dashboard" element={
//             <PrivateRoute>
//               <Dashboard isLoggedIn={isLoggedIn}/>
//             </PrivateRoute>}
//           />
//       </Routes>
//     </div>
//   )
// }

// export default App;





// import "./App.css";
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";

// function App() {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const navigate = useNavigate();

//   // Auto-redirect to /dashboard after successful login
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   if (isLoading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

  // return (
  //   <div className="w-screen h-screen bg-richblack-900 flex flex-col">
  //     <Navbar />

  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route
  //         path="/dashboard"
  //         element={
  //           <ProtectedRoute>
  //             <Dashboard />
  //           </ProtectedRoute>
  //         }
  //       />
//       </Routes>
//     </div>
//   );
// }

// export default App;





// import "./App.css";
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useRef } from "react";

// function App() {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const hasRedirected = useRef(false); // prevent repeated redirects

//   useEffect(() => {
//     if (!isLoading && isAuthenticated && location.pathname === "/" && !hasRedirected.current) {
//       hasRedirected.current = true; // set flag
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, isLoading, location, navigate]);

//   if (isLoading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   return (
//     <div className="w-screen h-screen bg-richblack-900 flex flex-col">
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;







import "./App.css";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Auto-redirect to /dashboard after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;






