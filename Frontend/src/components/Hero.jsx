import React from 'react'

function Hero() {
  return (
    <section 
      className='min-h-[calc(100vh-60px)] max-h-screen md:max-h-full md:min-h-[calc(100vh-160px)]  bg-gray-100 flex items-center bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: 'url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)'
      }}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-10 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          
          {/* Left Content */}
          <div className='space-y-6 my-10 '>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight'>
              Best Collection For
              <br />
              <span className='text-gray-700'>Home Decoration</span>
            </h1>
            
            <p className='text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque 
              exercitationem labore vel, dolore quidem asperiores, laudantium temporibus soluta optio consequatur 
              aliquam deserunt officia. Dolorum saepe nulla provident.
            </p>
            
            <button className='bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer'>
              Shop Now
            </button>
          </div>

          

        </div>
      </div>
    </section>
  )
}


export default Hero
