import { Static, Type } from '@sinclair/typebox'
export const cartCreateRequestSchema = Type.Object({
  productId: Type.Integer(),
  customerId: Type.Integer(),
  quantity: Type.Integer(),
})

export type CartCreateRequestInput = Static<typeof cartCreateRequestSchema>

export const cartEditRequestSchema = Type.Object({
  id: Type.Integer(),
  quantity: Type.Integer(),
});

export type CartEditRequestInput = Static<typeof cartEditRequestSchema>
