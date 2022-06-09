import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsContextProvider } from './hooks/useSettingsContext';
// import Example from './Example';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SettingsContextProvider>
			{/* <Example /> */}
			<App />
		</SettingsContextProvider>
	</React.StrictMode>
);
