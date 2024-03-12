'use server'
import prisma from '@/lib/prisma'

import { Address } from '@/interfaces'
import { tree } from 'next/dist/build/templates/app-page'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceUserAddress(address, userId)
    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error setting user address'
    }
  }
}

const createOrReplaceUserAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      zip: address.zip,
      city: address.city,
      phone: address.phone
    }
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }
    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })
    return updatedAddress
  } catch (error) {
    throw new Error('Error creating or replacing user address')
  }
}
