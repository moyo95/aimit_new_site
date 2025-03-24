"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Heros from './components/Heros';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import heroData from "../public/data/heroData.json";
import React from "react";
import SpreadsheetData from "./components/SpreadsheetData";


export default function Home() {
  return (
    <main>
      
      <Hero/>
      {/* <SpreadsheetData /> */}
      <Services />
      <About/>
      <Contact />
      
    </main>
  );
}