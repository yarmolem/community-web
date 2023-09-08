import { createBrowserRouter } from 'react-router-dom'

import HomeLayout from '@/components/layout/home-layout'
import SignInPage from '@/pages/auth/sign-in/sign-in.page'
import SignUpPage from '@/pages/auth/sign-up/sign-up.page'
import WelcomePage from '@/pages/home/welcome/welcome.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      },
      {
        path: '/dashboard',
        element: <div>Dashboard</div>
      }
    ]
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path: '/auth/sign-up',
    element: <SignUpPage />
  }
])

export { router }
