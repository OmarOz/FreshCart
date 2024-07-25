import React, { useEffect, useState } from 'react';
import Style from './About.module.css';
import {Helmet} from "react-helmet";

export default function About() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <Helmet>
        <title>About</title>
        <meta name="description" content="welcome to about page" />
    </Helmet>
  <div className="bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-4">About FreshCart</h1>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Welcome to FreshCart – Your Ultimate Online Grocery Store!</strong>
        </p>
        <p className="text-lg text-gray-700 mb-6">
          At FreshCart, we believe that grocery shopping should be easy, convenient, and enjoyable. That's why we've created an online platform that brings fresh, high-quality groceries right to your doorstep.
        </p>
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is simple: to provide you with the freshest produce, pantry essentials, and everyday items, all while ensuring an exceptional shopping experience. We are committed to offering a wide range of products at competitive prices, backed by excellent customer service.
        </p>
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Why Choose FreshCart?</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li><strong>Quality You Can Trust</strong>: We source our products from trusted suppliers to ensure you receive only the best.</li>
          <li><strong>Convenience at Your Fingertips</strong>: Shop anytime, anywhere from our user-friendly app.</li>
          <li><strong>Fast and Reliable Delivery</strong>: Enjoy swift delivery services that bring your groceries straight to your door.</li>
          <li><strong>Sustainable Choices</strong>: We are dedicated to offering eco-friendly options to support a sustainable lifestyle.</li>
          <li><strong>Exceptional Customer Service</strong>: Our support team is always ready to assist you with any queries or concerns.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Products</h2>
        <p className="text-lg text-gray-700 mb-6">
          At FreshCart, you'll find everything you need, including:
        </p>
        <ul className="list-disc list-inside text-lg text-green-800 mb-6">
          <li>Fresh Fruits and Vegetables</li>
          <li>Dairy and Eggs</li>
          <li>Meat and Seafood</li>
          <li>Bakery and Pastry Items</li>
          <li>Pantry Staples</li>
          <li>Snacks and Beverages</li>
          <li>Household Essentials</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to You</h2>
        <p className="text-lg text-gray-700 mb-6">
          We are passionate about making grocery shopping a breeze. Whether you’re stocking up for the week or just need a few items, FreshCart is here to make your life easier. We are continuously improving our services to better meet your needs and exceed your expectations.
        </p>
        <p className="text-lg text-gray-700">
          Thank you for choosing FreshCart. Happy shopping!
        </p>
      </div>
    </div>
  </>
}
