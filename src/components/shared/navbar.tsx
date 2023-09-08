import { SidebarIcon, UserIcon } from 'lucide-react'

import Logo from './logo'
import { cn } from '@/lib/utils'
import { IconButton } from '../ui/icon-button'

type Props = {
  className?: string
  onOpen?: () => void
}

const Navbar = (props: Props) => {
  return (
    <header
      className={cn(
        'dark w-full h-[65px] flex items-center px-8 bg-background text-foreground',
        props.className
      )}
    >
      <nav className="flex items-center justify-between w-full">
        <IconButton
          variant="ghost"
          icon={<SidebarIcon />}
          onClick={props.onOpen}
        />
        <Logo />
        <IconButton variant="ghost" icon={<UserIcon />} />
      </nav>
    </header>
  )
}

export default Navbar
