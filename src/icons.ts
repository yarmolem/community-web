import { lazy } from 'react'

export const icons = {
  google: lazy(() => import('./assets/icons/google.svg')),
  'arrow-up': lazy(() => import('./assets/icons/arrow-up.svg')),
  'calculator-solid': lazy(() => import('./assets/icons/calculator-solid.svg')),
  'calendar-solid': lazy(() => import('./assets/icons/calendar-solid.svg')),
  'check-solid': lazy(() => import('./assets/icons/check-solid.svg')),
  'chevron-down-solid': lazy(
    () => import('./assets/icons/chevron-down-solid.svg')
  ),
  'circle-check-solid': lazy(
    () => import('./assets/icons/circle-check-solid.svg')
  ),
  'circle-exclamation-solid': lazy(
    () => import('./assets/icons/circle-exclamation-solid.svg')
  ),
  'circle-info-solid': lazy(
    () => import('./assets/icons/circle-info-solid.svg')
  ),
  'credit-card-solid': lazy(
    () => import('./assets/icons/credit-card-solid.svg')
  ),
  'face-smile-regular': lazy(
    () => import('./assets/icons/face-smile-regular.svg')
  ),
  'gear-solid': lazy(() => import('./assets/icons/gear-solid.svg')),
  'moon-solid': lazy(() => import('./assets/icons/moon-solid.svg')),
  'search-solid': lazy(() => import('./assets/icons/search-solid.svg')),
  'sun-solid': lazy(() => import('./assets/icons/sun-solid.svg')),
  'user-solid': lazy(() => import('./assets/icons/user-solid.svg')),
  'xmark-solid': lazy(() => import('./assets/icons/xmark-solid.svg')),
  'logo-horizontal': lazy(() => import('./assets/icons/logo-horizontal.svg'))
}
