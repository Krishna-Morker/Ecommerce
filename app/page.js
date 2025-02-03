"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronRight, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { toNamespacedPath } from "path";

const categories = [
  { name: "Birthday", color: "bg-pink-200 text-pink-700" },
  { name: "Anniversary", color: "bg-red-200 text-red-700" },
  { name: "Wedding", color: "bg-purple-200 text-purple-700" },
  { name: "Plants", color: "bg-green-200 text-green-700" },
  { name: "Cakes", color: "bg-yellow-200 text-yellow-700" },
  { name: "Flowers", color: "bg-blue-200 text-blue-700" },
  { name: "Chocolates", color: "bg-purple-200 text-gray-700" },
  { name: "Combos", color: "bg-orange-200 text-orange-700" }
];

const products = [
  { id: 1, name: "Chocolate Gift Box", price: "₹1200", image: "/box.jpeg" },
  { id: 2, name: "Rose Bouquet", price: "₹700", image: "/boq.jpeg" },
  { id: 3, name: "Special for Valentine", price: "₹900", image: "/hjk.jpeg" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login,setlogin]=useState(false);
  const router = useRouter();

  const logout = async() => {
    try{
      const res=await axios.get('/api/logout');
      if(res.data.status==true){
        setlogin(false);
        toast.success("Logout successful");
        router.push('/');
      }
    }catch(err){
      console.log(err)
    }
    
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/jwtverify`, {withCredentials: true});
    console.log(response.data.sta)
        if(response.data.sta==1){
              setlogin(true);
        }
        console.log(login)
  
    } catch (error) {
      console.log(error);
    }

    };

    
    fetchData();
  },[]);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full py-6 px-6 flex items-center justify-between shadow-lg bg-[#171a1f] text-white">
        <h1 className="text-xl md:text-2xl font-extrabold">Cheaper</h1>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/components/categories" className="hover:text-blue-400 transition">Categories</Link>
          <Link href="/cart" className="hover:text-blue-400 transition flex items-center">
            <FiShoppingCart className="mr-2" /> Cart
          </Link>
          {(login==false) ?
         ( <Link href="/components/sign-in" className="block py-3 px-6 hover:bg-gray-700 flex items-center">
            <CgProfile className="mr-2" /> Profile
          </Link>) : 
         ( <button onClick={logout} className="block py-3 px-6 hover:bg-gray-700 flex items-center">
            <CgProfile className="mr-2" /> Logout
          </button>)
          }       
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>
       {/* Mobile Menu */}
       {menuOpen && (
        <div className="md:hidden bg-[#171a1f] text-white absolute top-16 left-0 right-0 shadow-lg">
          <Link href="/components/categories" className="block py-3 px-6 hover:bg-gray-700">Categories</Link>
          <Link href="/cart" className="block py-3 px-6 hover:bg-gray-700 flex items-center">
            <FiShoppingCart className="mr-2" /> Cart
          </Link>
          {(login==false) ?
         ( <Link href="/components/sign-in" className="block py-3 px-6 hover:bg-gray-700 flex items-center">
            <CgProfile className="mr-2" /> Profile
          </Link>) : 
         (  <button onClick={logout} className="block py-3 px-6 hover:bg-gray-700 flex items-center">
         <CgProfile className="mr-2" /> Logout
       </button>)
          }    
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-cover bg-center h-[500px] flex flex-col items-center justify-center text-white text-center px-6" style={{ backgroundImage: "url('/hj.jpg')" }}>
        <h1 className="text-4xl md:text-5xl font-bold">Get Your Favorite Products at the Best Prices</h1>
        <p className="mt-3 text-lg">Shop now and enjoy amazing discounts on all categories</p>
        <Link href="/components/categories">
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition">Shop Now</button>
        </Link>
      </div>

      {/* Categories Section */}
      <section className="py-12 px-6 bg-gray-600 text-center">
        <h2 className="text-3xl text-gray-900 font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(({ name, color }) => (
            <Link key={name} href={`/components/categories`} className={`p-6 rounded-lg shadow-md hover:shadow-xl transition ${color}`}>
              <h3 className="text-xl font-semibold">{name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Best-Selling Products */}
      <section className="py-12 px-6 text-center bg-blue-400">
        <h2 className="text-3xl text-black font-bold mb-6">Best-Selling Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-90 rounded-md" />
              <h3 className="text-xl text-black font-semibold mt-4">{product.name}</h3>
              <p className="text-lg font-bold text-green-600">{product.price}</p>
             
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 px-6 text-gray-900 bg-gray-500 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm">
            <p className="italic">"Great products at amazing prices! Will shop again."</p>
            <span className="block font-semibold mt-4">- Rahul S.</span>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm">
            <p className="italic">"Loved the fast delivery and quality of the products!"</p>
            <span className="block font-semibold mt-4">- Priya M.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171a1f] text-white py-6 text-center">
        <p>&copy; 2025 Cheaper. All rights reserved.</p>
      </footer>
    </>
  );
}