import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

const Login_Modal = ({ loginModal, setLoginModal }) => {
  const router = useRouter();


  return (
    <Modal
      centered
      open={loginModal}
      onOk={() => setLoginModal(false)}
      onCancel={() => setLoginModal(false)}
      footer={null}
      style={{ textAlign: "center" }}
    >
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 text-lg font-bold text-blue-500 bg-white border border-blue-500 rounded-md transition-all hover:text-black"
          onClick={() => router.push("/components/sign-in")}
        >
          Log In
        </button>
        <button
          className="px-4 py-2 text-lg font-bold text-white bg-blue-500 border border-blue-500 rounded-md transition-all hover:bg-blue-600"
          onClick={() => router.push("/components/sign-up")}
        >
          Sign Up
        </button>
      </div>
      <p className="mt-2 text-sm text-black">Log in to save product in cart</p>
    </Modal>
  );
};

export default Login_Modal;
