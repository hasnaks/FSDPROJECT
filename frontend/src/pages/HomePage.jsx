import React from 'react'
import Hero from '../components/Hero'
import PetCategories from '../components/PetCategories'
import FeaturedPets from '../components/FeaturedPets'
import AdoptionSteps from '../components/AdoptionSteps'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      
      <Hero />
      <PetCategories />
      <FeaturedPets />
      <AdoptionSteps />
      <Footer />
    </>
  )
}

export default HomePage
