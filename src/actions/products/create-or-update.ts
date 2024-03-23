'use server'

import { Gender } from '@prisma/client'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const productParsed = productSchema.safeParse(data)
  if (!productParsed.success) {
    return {
      ok: false
    }
  }

  //   productParsed.data
  console.log(`🚀 ~ createOrUpdateProduct ~ productParsed.data:`, productParsed.data)

  return {
    ok: true
  }
}
