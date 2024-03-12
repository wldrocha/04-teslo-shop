import { Address } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  address: Address
  setAddress: (address: State['address']) => void
  deleteAddress: () => void
}

const emptyAddress: Address = {
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  zip: '',
  city: '',
  country: '',
  phone: ''
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: emptyAddress,
      setAddress: (address) => set({ address }),
      deleteAddress: () => set({ address: emptyAddress })
    }),
    {
      name: 'address-storage'
    }
  )
)
