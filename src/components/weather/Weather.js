import React, { useEffect } from 'react'
import Layout from '../common/Layout'
import WeatherCard from './WeatherCard'



const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Layout>
      <WeatherCard />
    </Layout>
  )
}

export default Gallery