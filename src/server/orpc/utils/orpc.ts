import { router } from '@/server/orpc'
import { createORPCClient, onError } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { RouterClient } from '@orpc/server'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

declare global {
  var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
  headers: () => ({
    authorization: 'Bearer token',
  }),
  // fetch: <-- provide fetch polyfill fetch if needed
  interceptors: [
    onError((error) => {
      console.error(error)
    })
  ],
})

// Create a client for your router
export const orpc: RouterClient<typeof router> = createORPCClient(link)
// Or, create a client using a contract


export const client = createTanstackQueryUtils(orpc)