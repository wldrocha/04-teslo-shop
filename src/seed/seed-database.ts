import { initialData } from './seed'
import prisma from '../lib/prisma'

async function main() {
  //Delete previous data
  await Promise.all([prisma.productImage.deleteMany(), prisma.product.deleteMany(), prisma.category.deleteMany()])

  const { categories, products } = initialData

  const categoriesData = categories.map((category) => ({ name: category }))
  await prisma.category.createMany({ data: categoriesData })
  console.log('Seeding database...')
}
;(() => {
  main()
})()
