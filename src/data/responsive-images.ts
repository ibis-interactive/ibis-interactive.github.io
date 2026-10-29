import imageVariants from './image-variants.json'

const variants: Record<string, (string | number)[][]> = imageVariants

export function imageSrcSet(path: string) {
  const key = path.startsWith(import.meta.env.BASE_URL) ? path.slice(import.meta.env.BASE_URL.length) : path
  return variants[key]?.map(([file, width]) => `${import.meta.env.BASE_URL}${file} ${width}w`).join(', ')
}
