// import React from "react";
// import { Link } from "react-router-dom";
// // import logo from '../assets/Logo.svg';
// import {toast} from 'react-hot-toast';
// import { useAuth0 } from "@auth0/auth0-react";


// const Navbar = (props) => {

//     let isLoggedIn=props.isLoggedIn;
//     let setIsLoggedIn=props.setIsLoggedIn;
    
//      const { logout ,loginWithRedirect, isAuthenticated,user } = useAuth0();


//     return (
//         <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
//             {/* <Link to="">
//               <img src={image.png} alt="Logo" width={160} height={32} loading="lazy"/>
//             </Link> */}

//             <nav>
//                 <h1 className="text-richblack-100 font-bold text-lg">SortVision.com</h1>
              
//                 <li>{isAuthenticated && <p> {user.name} </p>}</li>
//                 {
//                     isAuthenticated?<li>
//                     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> Log Out</button>
//                    </li>:  <li>
//                     <button onClick={() => loginWithRedirect()}>Log In</button>;
//                   </li>
//                 }
               
//             </nav>

//             {/* Login-SignUp-LogOut-Dashboard */}

//             <div className="flex items-center gap-x-4">
//                 { !isLoggedIn && 
//                     <Link to="/login">
//                      <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//                         Login
//                      </button>
//                     </Link>
//                 }

//                 { !isLoggedIn &&
//                     <Link to="/signup">
//                      <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//                         Sign Up
//                      </button>
//                     </Link>
//                 }

//                 { isLoggedIn &&
//                     <Link to="/">
//                      <button onClick={() =>{
//                         setIsLoggedIn(false);
//                         toast.success("Logged Out");
//                      }} className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//                         Log Out
//                      </button>
//                     </Link>
//                 }

//                 {  isLoggedIn &&
//                     <Link to="/dashboard">
//                      <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//                         Dashboard
//                      </button>
//                     </Link>
//                 }

//             </div>
//         </div>
//     )
// }
// export default Navbar;





import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <h1 className="text-richblack-100 font-bold text-lg">SortVision.com</h1>

      <div className="flex items-center gap-x-4">
        {isAuthenticated && <p>{user.name}</p>}

        {!isAuthenticated && (
          <button
            onClick={() =>
              loginWithRedirect({
                appState: { returnTo: "/dashboard" },
              })
            }
            className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
          >
            Login
          </button>
        )}

        {isAuthenticated && (
          <>
            <Link to="/dashboard">
              <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                Dashboard
              </button>
            </Link>

            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
