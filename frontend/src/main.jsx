import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider }  from './Context/ContextUser';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider >
		<React.StrictMode >
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
		<ToastContainer position="bottom-right" autoClose={4000}/>
	</AuthProvider>
);
