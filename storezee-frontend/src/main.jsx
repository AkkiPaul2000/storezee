// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import App from './App';
import store from './store'; // Import Redux store
import './index.css'; // Import CSS

// Vite creates the entry point here in index.html where <div id="root"></div> is placed.
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Wrap the app in the Redux provider to make the store available throughout the app */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
