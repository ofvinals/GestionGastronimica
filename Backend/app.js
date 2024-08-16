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
const purchaseRoutes = require('./routes/purchase.routes.js');

require('dotenv').config();

const app = express();

app.use(cookieParser());

app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'http://localhost:5174',
			'https://restoflow.vercel.app',
		],
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', suppliersRoutes);
app.use('/api', loungesRoutes);
app.use('/api', menusRoutes);
app.use('/api', ordersRoutes);
app.use('/api', purchaseRoutes);

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
