const variant = ["flat", "text", "elevated", "tonal", "outlined", "plain", undefined] as const

export type Variant = typeof variant[number]

export type ButtonProps = {
  variant: Variant,
  icon: string | undefined,
  size: string | undefined,
  color: string | undefined
}
