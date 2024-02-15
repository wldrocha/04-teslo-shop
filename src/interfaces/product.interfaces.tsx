export interface Product {
  //   id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Sizes[]
  slug: string
  tags: string[]
  title: string
  type: Type
  gender: Category
}

export type Category = 'men' | 'women' | 'kid' | 'unisex'

type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'
