import type { IncomingHttpHeaders } from 'node:http'
import { ORPCError, os } from '@orpc/server'
import * as z from 'zod'
import { protectedProcedure } from '../utils/procedures';

const name = protectedProcedure
  .input(z.object({
    name: z.string()
  }))
  .handler(({input})=>{
    return {name: input.name}
  })


export const postRouter = {
  name,
};

