import express from 'express'
import morgan from 'morgan';
import signale from 'signale';
import cors from 'cors'

import { userRoutes } from './presentacion/routes/userRoute';
import { denunciasRoutes } from './presentacion/routes/denunciaRoute';
import { empresaRoutes } from './presentacion/routes/empresaRoute';
import { psicologaRoutes } from './presentacion/routes/psicologaRoute';
import { mensajeRoute } from './presentacion/routes/mensajeRoute';
const app = express()

//Middleware para uso del payload
app.use(express.json()) 
//Middleware para tener un log personalizado
app.use(morgan('dev'))
//Middleware para el uso de cors
app.use(cors())

//Recurso users
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/denuncias",denunciasRoutes);
app.use("/api/v1/estadisticas",denunciasRoutes);
app.use('/api/v1/empresas', empresaRoutes)
app.use('/api/v1/psicologa', psicologaRoutes);
app.use('/api/v1/mensaje', mensajeRoute);

app.listen(3000, ()=> {   
    signale.success('Server open in port 3000');
})