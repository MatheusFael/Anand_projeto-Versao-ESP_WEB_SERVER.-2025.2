import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import styles from './Login.module.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            setError(err.message || 'Erro ao fazer login');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: styles.container, children: _jsxs("div", { className: styles.card, children: [_jsx("h1", { className: styles.title, children: "Anand" }), _jsx("p", { className: styles.subtitle, children: "Goni\u00F4metro Digital" }), _jsxs("form", { onSubmit: handleLogin, className: styles.form, children: [_jsxs("div", { className: styles.inputGroup, children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "seu@email.com", required: true })] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx("label", { htmlFor: "password", children: "Senha" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "*****", required: true })] }), error && _jsx("div", { className: styles.error, children: error }), _jsx("button", { type: "submit", disabled: loading, className: styles.button, children: loading ? 'Entrando...' : 'Entrar' })] })] }) }));
};
export default Login;
