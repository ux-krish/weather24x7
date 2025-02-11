import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../common/Layout'
import Carousel from '../common/Carousel'

const UiProduct = [
  {
    id: 1,
    title : "Weather",
    description: "Check your weather forecast",
    classes: "bg-gradient-to-br from-green-400 to-blue-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
    btnClasses : "bg-teal-600",
    imgUrl : `${process.env.PUBLIC_URL}/rainy-3.svg`,
    link : "/weather"
  },
  // {
  //   id: 2,
  //   title : "Optimizer",
  //   description: "Optimize your images",
  //   classes: "bg-gradient-to-br from-yellow-400 to-green-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
  //   btnClasses : "bg-lime-500",
  //   imgUrl : "https://img.freepik.com/free-vector/neon-home-screen-template-smartphone_23-2148736061.jpg?t=st=1710361102~exp=1710364702~hmac=c68c8a13eab86a3cf31b2cfa961683d9d6901676948c95c394d92f57e1bebd65&w=1380",
  //   link : "/optimizer"
  // },
  // {
  //   id: 3,
  //   title : "Product Name 3",
  //   description: "Description of Product 3",
  //   classes : "bg-gradient-to-br from-blue-400 to-purple-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
  //   btnClasses : "bg-purple-400",
  //   imgUrl: "https://img.freepik.com/free-photo/pink-headphones-wireless-digital-device_53876-96804.jpg?w=1380&t=st=1710416451~exp=1710417051~hmac=aa08c4d4ead6b3bdbeec912e882f8a65f40185153fa6dd83bbc3d382e8b9e2e2",
  //   link : "/"
  // },
  // {
  //   id: 4,
  //   title : "Product Name 4",
  //   description: "Description of Product 4",
  //   classes: "bg-gradient-to-br from-rose-400 to-yellow-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
  //   btnClasses : "bg-orange-400",
  //   imgUrl: "https://img.freepik.com/free-photo/cloud-technology-with-futuristic-hologram-smartwatch_53876-124625.jpg?t=st=1710417013~exp=1710420613~hmac=a534cada8674fdf57b240d95ec83191e46ec3dff66dc88f48b863d3ff36ccc57&w=1380",
  //   link : "/"
  // }
];



const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Layout>
      <div className='flex flex-wrap w-full items-stretch justify-between gap-3'>
        <div className='flex max-w-xl mx-auto w-full min-h-[300px]'>
          <Carousel />
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-100">Web Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 max-w-xl mx-auto w-full">
          {UiProduct.map(item => {
            return (
              <div key={item.id} className={`${item.classes} border-2 border-white flex items-center p-4 rounded-lg shadow-md transition duration-300 ease-in-out`}>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-slate-50">{item.title}</h3>
                  <p className="text-slate-100 text-[13px] leading-[1.3]">{item.description}</p>
                  {/* Use Link for navigation */}
                  <Link to={item.link} className={`${item.btnClasses} flex w-24 justify-center mt-4 text-[12px] uppercase text-slate-200 hover:text-slate-50 font-semibold py-2 px-4 border border-slate-200 rounded-full transition duration-300 ease-in-out`}>Open</Link>
                </div>
                <div className="w-24 h-full bg-slate-200 rounded-md ml-4 overflow-hidden flex items-center justify-center">
                  <img src={item.imgUrl} className='object-contain h-full' alt="" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Home