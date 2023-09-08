import {
  Suspense,
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef
} from 'react'
import { icons } from '@/icons'

interface Props {
  name: IconName
  className?: string
}

export type IconName = keyof typeof icons

const Icon = forwardRef<
  ElementRef<'svg'>,
  ComponentPropsWithoutRef<'svg'> & Props
>(({ name, className }, ref) => {
  const RawIcon = icons[name]

  return (
    <Suspense fallback={<div />}>
      <RawIcon ref={ref} className={className} />
    </Suspense>
  )
})

export default Icon
