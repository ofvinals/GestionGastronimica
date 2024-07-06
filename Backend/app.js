const express = require('express');
const connectDB = require('./db/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes.js');
const productsRoutes = require('./routes/products.routes.js');
const suppliersRoutes = require('./routes/suppliers.routes.js');
const loungesRoutes = require('./routes/lounges.routes.js');
const menusRoutes = require('./routes/menus.routes.js');
const ordersRoutes = require('./routes/orders.routes.js');

require('dotenv').config();

const app = express();

app.use(cookieParser());

// Configurar CORS
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			// 'https://proyecto-estudio-mongo.vercel.app',
			// 'https://proyecto-estudio-mongo.onrender.com',
		],
		credentials: true,
		optionsSuccessStatus: 200,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// No necesitas configurar manualmente las cabeceras CORS aquí
// app.use((req, res, next) => {
//   res.setHeader(
//     'Access-Control-Allow-Origin',
//     'https://proyecto-estudio-mongo.vercel.app'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', suppliersRoutes);
app.use('/api', loungesRoutes);
app.use('/api', menusRoutes);
app.use('/api', ordersRoutes);

async function main() {
	try {
		await connectDB();
		console.log(`Escuchando en el puerto:`, process.env.PORT);
		app.listen(process.env.PORT);
	} catch (error) {
		console.error(error);
	}
}

main();
