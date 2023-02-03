import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clientRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.client.findMany({
      select: {
        id: true,
        lastname: true,
        firstname: true,
        phoneNumber: true,
        imats: true,
      },
    })
  }),

  get: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.client.findFirst({
        select: {
          id: true,
          lastname: true,
          firstname: true,
          phoneNumber: true,
          imats: true,
        },
        where: { id: input.clientId }
      })
  }),

  search: protectedProcedure
    .input(z.object({ searchInput: z.string().optional() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.client.findMany({
        select: {
          id: true,
          lastname: true,
          firstname: true,
          phoneNumber: true,
          imats: true,
        },
        where: {
          OR: [
            { lastname: { contains: input.searchInput } },
            { phoneNumber: { contains: input.searchInput } }
          ]
        }
      })
    })

});