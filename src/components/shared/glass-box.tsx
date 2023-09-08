import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean
}

const GlassBox = ({ asChild, className, ...props }: Props) => {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn(
        'bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20',
        className
      )}
      {...props}
    />
  )
}

export default GlassBox
