"use client";
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { useEdgeStore } from '../../../../lib/edgestore';
import { FiChevronRight, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import Page from '../Page';
import Loader from '../../Loader';
import Login_Modal from '../../loginmodal/page';

const AssignmentsPage = ({ params }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [product, setProduct] = useState([]);
  const [progress, setProgress] = useState({});
  const [cart, setCart] = useState([]);
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [loading, setLoading] = useState({});
  const [load, setLoad] = useState(true);
  const [categoryid, setCategoryid] = useState(null);
  const [file, setFile] = useState(null);
  const [stid, setstid] = useState(null);
  const { id } = use(params);
  const [login,setlogin]=useState(false);
  const [gh,setgh]=useState();
  const [user,setuser]=useState(false);
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [loginmodal,setloginmodal]=useState(false);

  const handleToggleDescription = (productId) => {
    if (expandedDescription === productId) {
      setExpandedDescription(null); // Collapse if already expanded
    } else {
      setExpandedDescription(productId); // Expand the clicked product description
    }
  };

  const [anchorElCategories, setAnchorElCategories] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);



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
   /// console.log(response.data.sta)
        if(response.data.sta==1){
              setlogin(true);
              setuser(response.data.user);
              setCart(response.data.user.cart);
        }
      ///  console.log(login)
  
    } catch (error) {
      console.log(error);
    }

    };

    
    fetchData();
  },[]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handle = () => {
      setAnchorElCategories(null);
      setIsModalOpen(true);
  };
  const showToast = (message) => {
      toast.success(message, {
          position: "top-right",
      });
      setIsModalOpen(false);
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.post(`/api/getproduct`, { id: categoryid });
      setProduct(response.data);
     // console.log(response.data);
     
      setLoad(false);
     
    } catch (error) {
      console.log("Error fetching Products", error);
    }
  };

  useEffect(() => {
    if (categoryid) {
      fetchCategory(); 
    }
  }, [categoryid]); 

  useEffect(() => {
    if (id) setCategoryid(id);
  }, [id]);

  const isOpen = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    fetchCategory();
  };

  const handleFileUpload = async (e, productid) => {
    e.preventDefault();
    if (!file) return;

    setLoading((prev) => ({ ...prev, [productid]: true }));

    try {
      let fileURL;
      if (file) {
        const uploadResponse = await edgestore.myProtectedFiles.upload({
          file,
          onProgressChange: (progressValue) => {
            setProgress((prev) => ({ ...prev, [assignmentId]: progressValue }));
          },
        });
        fileURL = uploadResponse.url;
      }

      const newFile = {
        id: assignmentId,
        fileName: file.name,
        fileURL,
        studentid: stid._id,
      };

      const ge = "addstu";
      await axios.post(`/api/assignment`, { ge, newFile });

      toast.success("Assignment submitted successfully!");
      // Fetch assignments again to reflect the latest state
      fetchAssignments();
    } catch (error) {
      console.log("Error uploading file:", error);
      toast.error("Failed to upload assignment.");
    } finally {
      setLoading((prev) => ({ ...prev, [assignmentId]: false }));
      setProgress((prev) => ({ ...prev, [assignmentId]: 0 }));
      setFile(null);
    }
  };
  const check = async(e) => {
    try{
      if(login==false){
      
        setloginmodal(true);
        //console.log(loginmodal,"kl")
      }else{
        await add(e);
      }
    }catch(err){
      console.log(err)
    }
  };
  const check1 = async(e) => {
    try{
      if(login==false){
      
        setloginmodal(true);
        //console.log(loginmodal,"kl")
      }else{
       router.push('/components/cart')
      }
    }catch(err){
      console.log(err)
    }
  };

  const add=async(id)=>{
      const response= await axios.post('/api/addtocart',{id:id,userid:user._id});
      setCart([...cart, id])
    ///  console.log(response.data)
      toast.success(response.data);
  }

  const handleDeleteProduct = async (categ) => {
    try {
        //console.log("Deleting Image from Edge Store:", categ.pictureurl);

        await edgestore.myProtectedFiles.delete({
            url: categ.pictureurl, // Use dynamic URL, not hardcoded one
        });

       /// console.log("Image deleted from Edge Store");

        // Delete category from the database after image deletion
        const response = await axios.post(`/api/deleteproduct`, { id: categ._id });
        setProduct(product.filter((elem)=>elem._id!==categ._id))
        toast.success(response.data);
    } catch (error) {
        console.log("Error in Deleting Category");
    }
  };
  
  if(load){
    return <Loader/>  
  }
  return (
    <>
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
          <Link href="/" className="hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md">
            Home
          </Link>
          <Link href="/components/categories" className="hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md">
            Categories
          </Link>
          <button onClick={check1} className="block py-3 px-4 flex items-center">
            <FiShoppingCart className="mr-2" /> Cart
          </button>

          {login === false ? (
            <Link href="/components/sign-in" className="px-3 py-2 hover:bg-gray-700 flex items-center rounded-md">
              <CgProfile className="mr-2" /> Profile
            </Link>
          ) : (
            <button onClick={logout} className="px-3 py-2 hover:bg-gray-700 flex items-center rounded-md">
              <CgProfile className="mr-2" /> Logout
            </button>
          )}

          {user?.admin && (
            <button
              onClick={handleMenuOpen}
              className="px-3 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-600 transition"
            >
              Add Products
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
            <button onClick={check1} className="block py-3 px-4 flex items-center">
            <FiShoppingCart className="mr-2" /> Cart
          </button>

            {user?.admin && (
              <button
                onClick={handleMenuOpen}
                className="w-full px-4 py-2 text-left rounded-md hover:bg-white hover:text-blue-600 transition"
              >
               Add Products
              </button>
            )}

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

        {/* Menu Dropdown (Add Categories) */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ zIndex: 10000 }} // Ensure it stays above other elements
        >
          <MenuItem onClick={() => setIsModalOpen(true)}>Add Product</MenuItem>
        </Menu>
      </nav>
    
    
    {isModalOpen && (
        <Page isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} gh={showToast} categoryid={categoryid} />
    )}
       {(loginmodal==true) && <Login_Modal loginModal={loginmodal} setLoginModal={setloginmodal} />}
    </>
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#242527' }}>
      <h1 className="text-5xl font-bold text-center mb-8 text-white-800">Product</h1>
      {product.length === 0 ? (
        <h1 className='text-3xl font-bold text-center mb-9 text-white-800'>No Product Available :)</h1>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {product.map((pro) => (
            <div
              key={pro._id}
              className="p-8 w-100 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col"
              style={{ backgroundColor: '#31363f' }}>
              {user?.admin && <button
                onClick={() => handleDeleteProduct(pro)}
                className="absolute top-2 right-2 bg-red-500 text-white-950 py-1 px-2 rounded-md hover:bg-red-600 transition duration-150"
              >
                Delete
              </button>}
              <div className="w-full h-40 mb-2">
                <img
                  src={pro.pictureurl} 
                  alt={pro.ProductName} 
                  className="w-full h-full rounded-md"
                />
              </div>
              <h2 className="text-3xl font-extrabold text-center text-white-950 ">{pro.ProductName}</h2>
              <h2 className="text-3xl font-extrabold text-center text-yellow-200 ">₹{pro.price}</h2><br/>
              <div className="text-center flex-grow">
  <p className="text-1xl font-normal text-white-900 leading-relaxed italic whitespace-normal">
    {expandedDescription === pro._id
      ? (pro.Description.length > 100 
          ? `${pro.Description?.substring(0, 100)}...` 
          : pro.Description)
      : `${pro.Description?.substring(0, 50)}...`}
  </p>
  <button
    onClick={() => handleToggleDescription(pro._id)}
    className="text-blue-500 mb-4"
  >
    {expandedDescription === pro._id ? 'Read Less' : 'Read More'}
  </button>
</div>
            <div className='flex gap-2'>
              <button
                onClick={() => router.push(`/components/product/${pro._id}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150"
              >
                View Product
              </button>
              <button
                onClick={() => check(pro._id)}
                className={`w-full py-2 rounded-md transition duration-150 ${
                      cart?.includes(pro._id)
                    ? "bg-gray-400 text-white cursor-not-allowed" // Disabled style if already added
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={cart.includes(pro._id)} // Disable if product is in cart
              >
                {cart?.includes(pro._id) ? "Already Added" : "Add to Cart"}
              </button>

              </div>
            </div>
            
          ))}
        </div>
      )}
    </div>
    <ToastContainer/>
    </>
  );
};

export default AssignmentsPage;
