import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import { Home } from '../src/pages/Home';
import { Admin } from '../src/pages/Admin';
import { Server } from '../src/pages/Server';
import { Kitcken } from '../src/pages/Kitcken';
import { UserProvider } from '../src/context/UserContext';
import { ProductProvider } from '../src/context/ProductContext';
import { Header } from '../src/components/Home/Header';
import { Footer } from '../src/components/Home/Footer';
import { MenuProvider } from '../src/context/MenuContext';
import { LoungeProvider } from '../src/context/LoungeContext';
import { OrderProvider } from '../src/context/OrderContext';
import { PrimeReactProvider } from 'primereact/api';
import PrivateRoute from './PrivateRoute';
import { ModalProvider } from '../src/context/ModalContext';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<PrimeReactProvider>
				<AuthProvider>
					<UserProvider>
						<ProductProvider>
							<MenuProvider>
								<LoungeProvider>
									<OrderProvider>
										<ModalProvider>
											<div className='bg-[#DBD7CF] min-h-screen'>
												<Header />
												<Routes>
													<Route
														path='/'
														element={<Home />}></Route>
													<Route
														path='/home'
														element={<Home />}></Route>
													<Route element={<PrivateRoute />}>
														<Route
															path='/admin'
															element={<Admin />}></Route>
														<Route
															path='/server'
															element={<Server />}></Route>
														<Route
															path='/kitchen'
															element={<Kitcken />}></Route>
													</Route>
												</Routes>
												<Footer />
											</div>
										</ModalProvider>
									</OrderProvider>
								</LoungeProvider>
							</MenuProvider>
						</ProductProvider>
					</UserProvider>
				</AuthProvider>
			</PrimeReactProvider>
		</BrowserRouter>
	);
};
