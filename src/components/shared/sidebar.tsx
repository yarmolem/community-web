import { NavLink } from 'react-router-dom'
import {
  LogIn,
  Download,
  HomeIcon,
  UserPlus,
  LayoutDashboard,
  X
} from 'lucide-react'

import Logo from './logo'
import { cn } from '@/lib/utils'

import { type ReactNode } from 'react'
import { IconButton } from '../ui/icon-button'

interface SidebarLinkProps {
  to?: string
  label?: string
  icon?: ReactNode
  onClick?: () => void
}

const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
  const defaultClass =
    'flex items-center gap-3 py-2 px-4 transition-colors duration-300 hover:text-foreground hover:bg-muted rounded-md'

  if (!props.to) {
    return (
      <button
        onClick={props.onClick}
        className={cn(defaultClass, 'text-muted-foreground')}
      >
        {props.icon}
        {props.label}
      </button>
    )
  }

  return (
    <NavLink
      to={props.to}
      onClick={props.onClick}
      className={({ isActive }) => {
        return cn(defaultClass, {
          'text-foreground bg-muted': isActive,
          'text-muted-foreground bg-transparent': !isActive
        })
      }}
    >
      {props.icon}
      <span>{props.label}</span>
    </NavLink>
  )
}

type SidebarProps = {
  className?: string
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <aside
      className={cn(
        'dark flex flex-col flex-1 dark bg-background p-4 relative',
        props.className
      )}
    >
      {props.onClose && (
        <IconButton
          size="sm"
          variant="ghost"
          onClick={props.onClose}
          icon={<X color="white" />}
        />
      )}

      <div className="py-8 text-white flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col gap-y-2">
        <SidebarLink to="/" label="Inicio" icon={<HomeIcon size={16} />} />
        <SidebarLink
          to="/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard size={16} />}
        />
      </nav>

      <div className="mt-auto flex flex-col gap-y-2 pb-8">
        <SidebarLink label="Inicia sesíon" icon={<LogIn size={16} />} />
        <SidebarLink label="Registrate" icon={<UserPlus size={16} />} />
        <SidebarLink label="Descarga app" icon={<Download size={16} />} />
      </div>
    </aside>
  )
}

export default Sidebar
