import { Portal } from '@radix-ui/react-portal'

import Sidebar from './sidebar'
import { cn } from '@/lib/utils'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const SidebarMobile = (props: Props) => {
  return (
    <Portal
      container={document.getElementById('portal') as HTMLElement}
      className={cn(
        'fixed inset-0 z-20 h-screen w-screen',
        props.isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      <div
        className={cn(
          'sm:hidden relative w-full h-full transition-transform duration-300 bg-black bg-opacity-50  z-30',
          props.isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />

      <Sidebar
        onClose={props.onClose}
        className={cn(
          'h-full w-60 absolute top-0 left-0 bottom-0 transition-transform duration-300 z-40',
          props.isOpen ? 'translate-x-0' : '-translate-x-[100%]'
        )}
      />
    </Portal>
  )
}

export default SidebarMobile
