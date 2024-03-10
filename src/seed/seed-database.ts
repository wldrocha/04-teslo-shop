import { initialData } from './seed'
import prisma from '../lib/prisma'

async function main() {
  //Delete previous data
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  const { categories, products, users } = initialData

  await prisma.user.createMany({ data: users })

  const categoriesData = categories.map((category) => ({ name: category }))
  await prisma.category.createMany({ data: categoriesData })
  const categoriesDb = await prisma.category.findMany()
  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

  products.forEach(async (product) => {
    const { type, images, title: name, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        name,
        categoryId: categoriesMap[type]
      }
    })

    // Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })
  console.log('Seeding database...')
}
;(() => {
  main()
})()
