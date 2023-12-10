import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar';
import {
	HomePage,
	LoginPage,
	RegisterPage,
	FormPage
} from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { UserProfile } from "../pages/Profile";
import { EvaluateResult } from "../pages/evaluateResult";

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="profile/:id" element={<UserProfile />} />
					<Route path="evaluate-result" element={<EvaluateResult />} />

					<Route
						path="form"
						element={
							<PrivateRoute>
								<FormPage />
							</PrivateRoute>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};
