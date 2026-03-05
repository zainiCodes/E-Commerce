import { postRouter } from "./router/post"
import { ProductRouter } from "./router/product"
export const router = { // all the routers you make will come here!
  post: postRouter,
  product: ProductRouter
}
