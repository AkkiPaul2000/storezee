import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div
                style={{
                    backgroundColor: 'red',
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <Navbar />
                Here is my page
            </div>
        </>
    );
}

export default App;
