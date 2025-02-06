import React from 'react'
import PageLayout from './components/Hero'
import ImageGallery from './components/Brand'
import Products from './components/Products'
import Category from './components/Category' // Ensure this path is correct or update it to the correct path


const page = () => {
  return (
    <div>
      <PageLayout/>
      <ImageGallery/>
      <Products/>
      <Category/>
     
    </div>
  )
}

export default page
