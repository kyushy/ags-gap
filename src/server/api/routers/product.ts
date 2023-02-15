import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      select: {
        reference: true,
        name: true,
        buyingPrice: true,
        sellingPrice: true,
        quantity: true,
      },
    })
  }),

  getAllPaginated: protectedProcedure
    .input(z.object({ selectedPage: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        select: {
          reference: true,
          name: true,
          buyingPrice: true,
          sellingPrice: true,
          quantity: true,
        },
        take: 10,
        skip: (input.selectedPage * 10) - 10
      })
    })

});