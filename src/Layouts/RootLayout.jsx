import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '../Components/Static/ScrollToTop';

const RootLayout = () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <main className="w-full flex-1">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      <div>
        <ScrollToTop></ScrollToTop>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </div>
  );
};

export default RootLayout;
