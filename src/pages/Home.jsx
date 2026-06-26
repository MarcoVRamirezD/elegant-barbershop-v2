import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Barbers from '../components/Barbers';
import Gallery from '../components/Gallery';
import Booking from '../components/Booking';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <Gallery />
      <Barbers />
      <Booking />
    </div>
  );
}
