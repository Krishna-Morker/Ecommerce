'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SignIn() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`/api/jwtverify`, {withCredentials: true});
       /// console.log(response.data.sta)
            if(response.data.sta==1){
                 router.push("/components/categories");
            }
      
        } catch (error) {
          console.log(error);
        }
    
        };
    
        
        fetchData();
      },[]);
    const validateForm = () => {
     ///   const { username, password } = values;
        if (email === "") {
          toast.error("Email and Password is required.");
          return false;
        } else if (password === "") {
          toast.error("Email and Password is required.");
          return false;
        }
        return true;
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
         
          const { data } = await axios.post('/api/sign-in', {
            email,
            password,
          },{withCredentials:true});
       ///   console.log(data)
          if (data.status == false) {
            toast.error(data.msg);
          }
          if (data.status === true) {
            toast.success("Sign in successful");
            router.push("/components/categories");
          }
        }
      };

    return (
        <>
            {/* Navbar */}
      <nav className="w-full py-4 px-6 flex items-center justify-between shadow-lg bg-[#171a1f] text-white">
        <h1 className="text-xl md:text-2xl font-extrabold">Simply crochett</h1>
        <div className="hidden md:flex items-center space-x-6">
        <Link href="/cart" className="hover:text-blue-400 transition flex items-center">
              Home
          </Link>
          <Link href="/components/categories" className="hover:text-blue-400 transition">Categories</Link>
         
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>
       {/* Mobile Menu */}
       {menuOpen && (
        <div className="md:hidden bg-[#171a1f] text-white absolute top-16 left-0 right-0 shadow-lg">
          <Link href="/" className="block py-3 px-6 hover:bg-gray-700 flex items-center">
             Home
          </Link>
          <Link href="/components/categories" className="block py-3 px-6 hover:bg-gray-700">Categories</Link>
        </div>
      )}
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded font-bold">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link href="/components/sign-up" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
    <ToastContainer />
        </>
    );
}