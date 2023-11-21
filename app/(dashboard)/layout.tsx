import React from 'react'
import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'
import Link from 'next/link'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='h-full'>
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 transition-all">
          <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] transition-all h-full">
          {/* <div className="p-6 w-full"> */}
          {children}
          {/* </div> */}
        </main>
      </div>
      <footer className="mt-auto">
        <nav className="bg-sky-200 p-4 sticky top-0 drop-shadow-xl z-10 print:hidden">
          <div className=" mx-auto flex justify-between flex-col sm:flex-row">
            <h3 className="text-smalltext-center sm:text-left flex justify-between place-content-center mx-auto mb2 md:mb-0">
              <Link href="/" className="no-underline hover:text-black/70">
                &copy;2023 Joseph Opio. All rights reserved. &nbsp;
              </Link>
              <Link href="/privacy-policy" className="no-underline hover:black/70">
                {'Privacy Policy'}
              </Link>
            </h3>
            <hr className="my-2 border-slate-700" />

          </div>
        </nav>
      </footer>
    </>
  )
}

export default DashboardLayout