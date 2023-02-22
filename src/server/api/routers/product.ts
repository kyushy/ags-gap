import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany()
  }),

  get: protectedProcedure
    .input(z.object({ reference: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findFirst({
        where: { reference: input.reference }
      })
  }),

  search: protectedProcedure
    .input(z.object({ searchInput: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: { reference: { contains: input.searchInput } }
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
      quantity: z.number()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.create({
        data: { 
          reference: input.reference,
          name: input.name,
          buyingPrice: input.buyingPrice,
          sellingPrice: input.sellingPrice,
          quantity: input.quantity
         }
      })
  }),

  update: protectedProcedure
    .input(z.object({
      reference: z.string(),
      name: z.string(),
      buyingPrice: z.number(),
      sellingPrice: z.number(),
      quantity: z.number()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.update({
        where: { reference: input.reference },
        data: { 
          reference: input.reference,
          name: input.name,
          buyingPrice: input.buyingPrice,
          sellingPrice: input.sellingPrice,
          quantity: input.quantity
         }
      })
  }),

  delete: protectedProcedure
    .input(z.object({ reference: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.delete({
        where: { reference: input.reference }
      })
    })

});