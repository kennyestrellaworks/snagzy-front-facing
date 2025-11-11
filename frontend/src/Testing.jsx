import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-24 px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        Welcome to Our Website
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8">
        We build modern and responsive web experiences that delight users and
        grow your business.
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition">
          Get Started
        </button>
        <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
