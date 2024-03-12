import { Address } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  address: Address
  setAddress: (address: State['address']) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        zip: '',
        city: '',
        country: '',
        phone: ''
      },
      setAddress: (address) => set({ address })
    }),
    {
      name: 'address-storage'
    }
  )
)
