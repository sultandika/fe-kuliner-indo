import React from "react";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F5F5DC]/40 font-sans flex flex-col">
      <header
        className="w-full bg-cover bg-center py-24 sm:py-32 flex justify-center items-center relative"
        style={{ backgroundImage: "url('/forest.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative bg-[#F5F5DC]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 text-center max-w-4xl mx-4">
          <Link to="/">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-green-900 tracking-tight cursor-pointer">
              Nusa Rasa
            </h1>
          </Link>
          <p className="text-md sm:text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Jelajahi kekayaan rasa otentik dari berbagai penjuru Indonesia, dari
            sabang sampai merauke.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-8 py-12 flex-grow">
        <Outlet />
      </main>

      <footer className="text-center py-6 bg-[#F5F5DC]/60 mt-12">
        <p className="text-stone-600">
          © {new Date().getFullYear()} Kuliner Nusantara. Dibuat dengan ❤️ di
          Indonesia.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
