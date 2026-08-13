import { jsx as _jsx } from "react/jsx-runtime";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
const AppContent = () => {
    const { firebaseUser, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }, children: _jsx("div", { style: { color: 'var(--text-secondary)', fontSize: '18px' }, children: "Carregando..." }) }));
    }
    return firebaseUser ? _jsx(Home, {}) : _jsx(Login, {});
};
const App = () => {
    return (_jsx(AuthProvider, { children: _jsx(AppContent, {}) }));
};
export default App;
