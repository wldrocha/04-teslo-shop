'use client'

import { createOrUpdateProduct, deleteProductImage } from '@/actions'
import { ProductImage } from '@/components'
import { Category, Product, ProductImage as ProductImageInterface } from '@/interfaces'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface FormInputs {
  id?: string
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
  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      images: undefined
    }
  })

  const onSizeChanged = (size: string) => {
    const sizes = getValues('sizes')
    const newSizes = sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size]
    setValue('sizes', newSizes)
  }

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    const { images, ...productToSave } = data

    if (productToSave?.id) {
      formData.append('id', productToSave?.id ?? '')
    }
    formData.append('name', productToSave.name)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('gender', productToSave.gender)
    formData.append('categoryId', productToSave.categoryId)

    if (images !== undefined) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, product: updatedProduct } = await createOrUpdateProduct(formData)
    if (!ok) {
      return
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`)
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
        <div className='flex flex-col mb-2'>
          <span>In stock</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Sizes</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx('flex  items-center justify-center w-14 h-10 mr-2 border rounded-md transition-all', {
                  'bg-blue-500 text-white': watch('sizes').includes(size)
                })}
              >
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
              {...register('images')}
              accept='image/png, image/jpeg, image/avif'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ''}
                  width={300}
                  height={300}
                  className='rounded-t shadow-md '
                />
                <button
                  type='button'
                  className='btn-danger w-full rounded-b-xl'
                  onClick={() => deleteProductImage(image.id, image.url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
