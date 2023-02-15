import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany()
  }),

  get: protectedProcedure
    .input(z.object({ customerId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.customer.findFirst({
        where: { id: input.customerId }
      })
  }),

  search: protectedProcedure
    .input(z.object({ searchInput: z.string().optional() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.customer.findMany({
        where: {
          OR: [
            { lastname: { contains: input.searchInput } },
            { phoneNumber: { contains: input.searchInput } }
          ]
        }
      })
    }),

  create: protectedProcedure
    .input(z.object({
      lastName: z.string(),
      firstName: z.string(),
      phoneNumber: z.string(),
      imats: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.customer.create({
        data: {
          lastname: input.lastName,
          firstname: input.firstName,
          phoneNumber: input.phoneNumber,
          imats: input.imats
        }
      })
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      lastName: z.string(),
      firstName: z.string(),
      phoneNumber: z.string(),
      imats: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.customer.update({
        where: {
          id: input.id
        },
        data: {
          lastname: input.lastName,
          firstname: input.firstName,
          phoneNumber: input.phoneNumber,
          imats: input.imats
        }
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.customer.delete({
        where: {
          id: input.id
        }
      })
    }),

});