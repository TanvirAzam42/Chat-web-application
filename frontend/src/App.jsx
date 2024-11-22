import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Discuss from './pages/Discuss';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/NavBar';

import './styles/scrollbar.css';
import Create from './pages/Create';

const theme = createTheme({
    shape: { borderRadius: 8 },

    palette: {
        mode: 'light',
    },
});
function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/discuss" element={<Discuss />}></Route>
                    <Route path="/create" element={<Create />}></Route>
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
