import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// TODO >>>>>>>> Use's

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


// TODO >>>>>>>> Here all Routes

import authRoutes from './routes/auth.routes.js'
import reservaRoutes from './routes/reserva.routes.js'
import cajaRoutes from './routes/caja.routes.js'
import huespedRoutes from './routes/huesped.routes.js'
import habitacionRoutes from './routes/habitacion.routes.js'

// TODO >>>>>>>> Routes Use's

app.use('/api', authRoutes)
app.use('/api', reservaRoutes)
app.use('/api', cajaRoutes)
app.use('/api', huespedRoutes)
app.use('/api', habitacionRoutes)


export default app