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

});