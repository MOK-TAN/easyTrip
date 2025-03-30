"use client";

import {useAuth} from '../../../../context/AuthContext';
import {useRouter} from 'next/navigation';



export default function Login() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-16 sm:py-24 lg:py-32">
      <div className="max-w-md w-full px-6 lg:px-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Log in to Your Account as Hotel owner</h2>
        <p className="mt-4 text-lg text-gray-600 text-center">Please enter your credentials to continue.</p>

        <form className="mt-8">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-2 block w-full py-3 px-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mt-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="mt-2 block w-full py-3 px-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mt-2 text-right">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}



// export default function LoginPage(){
//     const {user, login,logout} = useAuth();

//     const router = useRouter();

//     return (
//         <>
//         <h1>Login as hotel owner</h1>

//         {user === true ? "true" : "false"}

//         <button onClick={() =>  { login(); router.push('/hotelowner')}} >login as hotel owner </button>
//         <button onClick={() => logout() } >Logout as hotel owner</button>

//         </>
//     )
// }

// middle ware that runs before the process. 

// see matching paths 
// the matcher lets you specify which routes or pattern middleware should apply to, ensuring that it only runs when needed.

// the matcher
// configuration pattern in next js middleware that defines which rotues 

// "use client";

// import {useEffect,useRouter} from 'next/navigation';  
// import {useState} from 'react';

// export default function login(){

//     const [loading,setLoading] =useState(false);
//     const router = useRouter();

//     const handleLogin = () => {
//         setLoading(true);
//         document.cookie = "ok=moktan";
//         router.push("/hotelowner/dashboard");
//     }



//     return (
//         <div style={{textAlign : "center", marginTop : "50px"   }} > 
//             <h1>Login page</h1>
//             <button onClick={handleLogin} disabled ={loading}  >
//                 {loading ? "Loggin in..." :"Login" }
//             </button>
//         </div>
//     )
// }