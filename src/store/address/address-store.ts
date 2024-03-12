import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface address {
  name: string
  lastName: string
  address: string
  address2: string
  zip: string
  city: string
  country: string
  phone: string
}

interface State {
  address: address
  setAddress: (address: address) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        name: '',
        lastName: '',
        address: '',
        address2: '',
        zip: '',
        city: '',
        country: '',
        phone: ''
      },
      setAddress: (address: address) => set({ address })
    }),
    {
      name: 'address-storage'
    }
  )
)
