"use client";
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { FiChevronRight, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from "axios";
import Loader from '../../Loader';

const AssignmentsPage = ({ params }) => {

  const router = useRouter();

  const [load, setLoad] = useState(true);
  const [productid, setproductid] = useState(null);
  const [product, setproduct] = useState(null);
  const { id } = use(params);
  const [menuOpen, setMenuOpen] = useState(false);
  const [num,setnum]=useState(false);
  const [login,setlogin]=useState(false);

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

  const fetchCategory = async () => {
    try {
       // console.log(id);
        setproductid(id);
      const response = await axios.post(`/api/getproductbyid`, { id: id });
      setproduct(response.data);
    // console.log(response.data);
     
      setLoad(false);
     
    } catch (error) {
      console.log("Error fetching Products", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategory(); 
    }
  }, [id]); 



  if(load){
    return <Loader/>  
  }

  return (
    <>
    <nav className="w-full py-6 px-6 flex items-center justify-between shadow-lg text-white bg-[#171a1f]">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-extrabold">Cheaper</h1>
        
        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="bg-transparent text-white rounded-md hover:bg-white hover:text-blue-600 transition duration-300">
                Home
            </Link>
            <Link href="/components/categories" className="block px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">
                Categories
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
        
        {/* Mobile Menu */}
        {menuOpen && (
            <div className="absolute top-16 left-0 w-full bg-[#171a1f] text-white flex flex-col space-y-4 p-4 shadow-md md:hidden">
                <Link href="/" className="block px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">
                Home
                </Link>
                <Link href="/components/categories" className="block px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition duration-300">
                Categories
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
        )}
    </nav>

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.ProductName}</h1>
        
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.pictureurl} 
            alt={product.ProductName} 
            className="w-90 h-80 object-cover rounded-lg shadow-md" 
          />
        </div>

        {/* Product Details */}
        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-700">Price: <span className="text-green-600">₹{product.price}</span></p>
          
          <p className="mt-4 whitespace-pre-line text-gray-600 text-lg">
            {product.Description}
          </p>

      <button 
        onClick={() => setnum(!num)} 
        className="bg-blue-600 mt-6 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Contact us for best price
      </button>
      {num && <p className="mt-4 text-2xl font-semibold text-gray-800">99999999</p>}
 
        </div>
      </div>
    </div>
    </>
  );
};

export default AssignmentsPage;
