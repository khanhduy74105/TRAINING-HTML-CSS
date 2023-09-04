import { Application, Router } from 'express'
import usersRoute from './users.route'
import productsRoute from './products.route'
import cartProductsRoute from './cartProducts.route'
const apiRouter = Router()

const Route = (app: Application) => {
    app.use('/api', apiRouter)
    apiRouter.use('/users', usersRoute)
    apiRouter.use('/products', productsRoute)
    apiRouter.use('/cart-products', cartProductsRoute)

}

export default Route