import { Outlet } from 'react-router-dom'

import Navbar from '../shared/navbar'
import Sidebar from '../shared/sidebar'

import useToggle from '@/hooks/use-toggle'
import SidebarMobile from '../shared/sidebar-mobile'

const HomeLayout = () => {
  const toggle = useToggle()
  // name category price ,click

  return (
    <main className="w-full h-screen grid grid-cols-1 grid-rows-[minmax(0px,_65px)_minmax(0px,_1fr)] sm:grid-rows-1 sm:grid-cols-[minmax(0px,_218px)_minmax(0px,_1fr)]">
      <Navbar className="sm:hidden sticky top-0" onOpen={toggle.onOpen} />
      <Sidebar className="hidden sm:flex" />

      <SidebarMobile isOpen={toggle.isOpen} onClose={toggle.onClose} />

      <div className="flex-1 w-full relative">
        <Outlet />
      </div>
    </main>
  )
}

export default HomeLayout
