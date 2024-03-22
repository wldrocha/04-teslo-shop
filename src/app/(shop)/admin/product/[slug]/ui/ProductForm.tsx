'use client'

import { Category, Product, ProductImage } from '@/interfaces'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

interface Props {
  product: Product
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface FormInputs {
  name: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string // camisa, playera, manga corta
  gender: 'men' | 'women' | 'kid' | 'unisex'
  categoryId: string

  // Todo: images
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid }
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? []
      // todoo: images
    }
  })

  const onSubmit = async (data: FormInputs) => {
    console.log(`🚀 ~ onSubmit ~ data:`, data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'>
      {/* Textos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Title</span>
          <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('name', { required: true })} />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('slug', { required: true })} />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Description</span>
          <textarea
            rows={5}
            className='p-2 border rounded-md bg-gray-200'
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('tags', { required: true })} />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <select className='p-2 border rounded-md bg-gray-200' {...register('gender', { required: true })}>
            <option value=''>[select]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Categories</span>
          <select className='p-2 border rounded-md bg-gray-200' {...register('categoryId', { required: true })}>
            <option value=''>[select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full'>Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Sizes</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div key={size} className='flex  items-center justify-center w-10 h-10 mr-2 border rounded-md'>
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col mb-2'>
            <span>Photos</span>
            <input
              type='file'
              multiple
              className='p-2 border rounded-md bg-gray-200'
              // {...register('')}
              accept='image/png, image/jpeg'
            />
          </div>

        
        </div>
      </div>
    </form>
  )
}
