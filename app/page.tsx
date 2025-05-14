"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import heroData from "../public/data/heroData.json";
import News from './news/page';


export default function Home() {

  return (
    <main>
          <Hero />
          <Services />
          <About />
          <Contact />
    </main>
  );
}