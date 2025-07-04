import express from 'express';
import chalk from 'chalk';

import "./bootstrap/app.js";
import webRoutes from "./routes/web.js";
import sequelize_relations from './config/sequelize_relations.js';

/** Iniciar roteador */
const app = express();

/** Inicializar rotas */
app.use("/", webRoutes);

sequelize_relations();

console.log(process.env.IS_CONTAINER);

/** Escolher as portas baseado se foi inicializado com ou sem nginx */
const webPort = process.env.PORT || 3000;
const nodePort = process.env.NODE_PORT || webPort;

app.listen(nodePort, () => {
    console.log(chalk.green(`Servidor: http://localhost:${webPort}`));
});
