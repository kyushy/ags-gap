import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany()
    return products.length > 50 ? products.slice(-50).reverse() : products.reverse()
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findFirst({
        where: { id: input.id }
      })
  }),

  getZeroQuantity: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.product.findMany({
        where: { quantity: 0 }
      })
  }),

  search: protectedProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: {
          OR: [
            { reference: { contains: input.searchInput, mode: 'insensitive' } },
            { refEq: { contains: input.searchInput, mode: 'insensitive' } }
          ]
        }
      })
  }),

  stockValue: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      select: {
        buyingPrice: true,
        quantity: true
      }
    })
    
    let totalValue = 0
    products.forEach((product) => {
      totalValue += product.buyingPrice * product.quantity
    })

    return totalValue
  }),
  
  create: protectedProcedure
    .input(z.object({
      reference: z.string(),
      name: z.string(),
      buyingPrice: z.number(),
      sellingPrice: z.number(),
      quantity: z.number(),
      refEq: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.create({
        data: { 
          reference: input.reference,
          name: input.name,
          buyingPrice: input.buyingPrice,
          sellingPrice: input.sellingPrice,
          quantity: input.quantity,
          refEq: input.refEq
         }
      })
  }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      reference: z.string(),
      name: z.string(),
      buyingPrice: z.number(),
      sellingPrice: z.number(),
      quantity: z.number(),
      refEq: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.update({
        where: { id: input.id },
        data: { 
          reference: input.reference,
          name: input.name,
          buyingPrice: input.buyingPrice,
          sellingPrice: input.sellingPrice,
          quantity: input.quantity,
          refEq: input.refEq
         }
      })
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.delete({
        where: { id: input.id }
      })
  })

});