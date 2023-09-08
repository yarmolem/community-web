import { create } from 'zustand'

import type { User } from '@/interface/user'

interface AuthStore {
  isAuth: boolean
  isLoading: boolean
  user: User | null
  logoutAction: () => void
  loginAction: (user: User) => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: {
    id: 1,
    name: 'John Doe',
    email: 'jhon@dev.com'
  },
  isAuth: true,
  isLoading: false,
  logoutAction: () => set({ isAuth: false, user: null }),
  loginAction: (user: User) => set({ isAuth: true, user })
}))
