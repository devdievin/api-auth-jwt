import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './data-source'
import { routes } from './routes'
import { errorMidddleware } from './middlewares/error'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(express.json())

    app.use(routes)

    app.use(errorMidddleware)
    return app.listen(process.env.PORT, () => console.log("Api running"))
})