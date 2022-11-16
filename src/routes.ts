import { authMiddleware } from './middlewares/authMiddleware';
import { UserController } from './controllers/UserController';
import { Router } from 'express'

const routes = Router();

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware)

routes.get('/profile', new UserController().getProfile)

export { routes }