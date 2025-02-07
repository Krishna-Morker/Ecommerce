"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEdgeStore } from '../../../lib/edgestore';
import Loader from '../Loader';


const CoursesPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElCategories, setAnchorElCategories] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [login,setlogin]=useState(false);
    const [user,setuser]=useState(false);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(true);
  const [loginmodal,setloginmodal]=useState(false);


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
        if(response.data.sta==1){
              setlogin(true);
              setuser(response.data.user);
            console.log(user)
        }
     //  console.log(login)
  
    } catch (error) {
      console.log(error);
    }

    }
    fetchData();
  },[]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/getpro`,{user}, {withCredentials: true});
              setCategory(response.data)
            ////  console.log(response.dat)
              setLoading(false)
     //  console.log(login)
  
    } catch (error) {
      console.log(error);
    }

    }
   if(user) fetchData();
  },[user]);

  const handleDeleteCourse = async (categ) => {
    try {
       
        const response = await axios.post(`/api/deletefromcart`, { id: categ._id, userid:user._id });
        setCategory(category.filter((elem)=>elem._id!==categ._id))
        toast.success(response.data);
    } catch (error) {
        console.log("Error in Deleting Category");
    }
  };
  
  if (loading) return <Loader />;

  return (
    <>
     <>
            <nav className="w-full py-6 z-20 px-6 flex items-center justify-between shadow-lg bg-[#171a1f] text-white">
                {/* Logo */}
                <h1 className="text-xl md:text-2xl font-extrabold">Simply crochett</h1>
              
        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md">
            Home
          </Link>
          <Link href="/components/categories" className="hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md">
            Categories
          </Link>

          {login === false ? (
            <Link href="/components/sign-in" className="px-3 py-2 hover:bg-gray-700 flex items-center rounded-md">
              <CgProfile className="mr-2" /> Profile
            </Link>
          ) : (
            <button onClick={logout} className="px-3 py-2 hover:bg-gray-700 flex items-center rounded-md">
              <CgProfile className="mr-2" /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#171a1f] text-white absolute top-16 left-0 right-0 shadow-lg z-50">
            <Link href="/" className="block px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition">
              Home
            </Link>
           
            <Link href="/components/categories" className="block px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition">
              Categories
            </Link>
           
            {login === false ? (
              <Link href="/components/sign-in" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                <CgProfile className="mr-2" /> Profile
              </Link>
            ) : (
              <button onClick={logout} className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                <CgProfile className="mr-2" /> Logout
              </button>
            )}
          </div>
        )}

       
      </nav>

    </>
    <ToastContainer />
    <div className="p-8 z-0 min-h-screen" style={{ backgroundColor: '#242527' }}>
      <h1 className="text-5xl font-bold text-center mb-8 text-white-800">Cart</h1>
      {category.length === 0 ? (
        <h1 className='text-3xl font-bold text-center mb-9 text-white-800'>No Products Added :)</h1>
      ) : (
        <div className="grid gap-10 z-0 sm:grid-cols-2 lg:grid-cols-4">
          {category.map((cate) => (
            <div
              key={cate._id}
              className="p-8 w-100 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col"
              style={{ backgroundColor: '#31363f' }}>
             {user?.admin &&  <button
                onClick={() => handleDeleteCourse(cate)}
                className="absolute top-2 right-2 bg-red-500 text-white-950 py-1 px-2 rounded-md hover:bg-red-600 transition duration-150"
              >
                Delete
              </button>}
              <div className="w-full h-40 mb-2">
                <img
                  src={cate.pictureurl} 
                  alt={cate.CategoryName} 
                 
                  className="w-full h-40 rounded-md"
                />
              </div>
              <h2 className="text-3xl font-extrabold text-center text-white-950 ">{cate.CategoryName}</h2>
              <div className="text-center flex-grow">
                <p className="text-1xl font-normal text-white-900 leading-relaxed italic p-4">
                  {cate.Description || "No description provided for this course."}
                </p>
              </div>
              <button
                onClick={() => router.push(`/components/product/${cate._id}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150"
              >
                Visit Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default CoursesPage;
