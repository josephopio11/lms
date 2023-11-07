import React from 'react'
import Logo from './logo'
import SidebarRoutes from './sidebar-routes'

const Sidebar = () => {
  return (
    <div className='h-full broder-r flex flex-col overflow-y-auto bg-zinc-50 shadow-sm dark:bg-zinc-700'>
      <div className="p-6 dark:bg-yellow-50">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar