import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div>

<div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>

    </div>
  )
}

export default Layout