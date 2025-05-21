import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'

const Home = () => {
  return (
    <div className='mt-10'>
      <Banner/>
      <Categories/>
      <BestSeller/>
    
      
    </div>
  )
}

export default Home
