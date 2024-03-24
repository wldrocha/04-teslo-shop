import { v2 as cloudinary } from 'cloudinary'

const cloudinarySingleton = () => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? '')
  return cloudinary
}

declare global {
  var cloudinary: undefined | ReturnType<typeof cloudinarySingleton>
}

const cloudinery = globalThis.cloudinary ?? cloudinarySingleton()

export default cloudinery
