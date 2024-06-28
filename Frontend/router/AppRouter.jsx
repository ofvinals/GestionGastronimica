import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import { Home } from '../src/pages/Home';
import { Admin } from '../src/pages/Admin';
import { Server } from '../src/pages/Server';
import { Kitcken } from '../src/pages/Kitcken';
import { UserProvider } from '../src/context/UserContext';
import { ProductProvider } from '../src/context/ProductContext';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { MenuProvider } from '../src/context/MenuContext';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<ProductProvider>
						<MenuProvider>
							<Header />
							<Routes>
								<Route path='/' element={<Home />}></Route>
								<Route path='/admin' element={<Admin />}></Route>
								<Route path='/server' element={<Server />}></Route>
								<Route path='/kitchen' element={<Kitcken />}></Route>
							</Routes>
							<Footer />
						</MenuProvider>
					</ProductProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
