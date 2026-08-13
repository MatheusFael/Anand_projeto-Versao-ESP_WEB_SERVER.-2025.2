import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogOut, WiFi } from 'lucide-react';
import { useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useTelemetry } from '../hooks/useTelemetry';
import styles from './Home.module.css';
const CHART_SERIES = [
    { key: 'angulo', label: 'ANG', color: '#23d6b0' },
    { key: 'maxAng', label: 'MAXANG', color: '#ff9f43' },
    { key: 'fluidez', label: 'FLUIDEZ', color: '#f6d55c' },
    { key: 'confianca', label: 'CONFIANCA', color: '#c792ea' },
    { key: 'picoVel', label: 'PICO_VEL', color: '#29b6f6' },
    { key: 'media3', label: 'MEDIA_3REPS', color: '#9ccc65' },
];
const Home = () => {
    const { profile, logout } = useAuth();
    const { telemetry, history } = useTelemetry();
    const chartData = useMemo(() => history.slice(-80).map((point, idx) => ({
        idx,
        ts: point.ts,
        angulo: point.angulo ?? 0,
        maxAng: point.maxAng ?? 0,
        fluidez: point.fluidez ?? 0,
        confianca: point.confianca ?? 0,
        picoVel: point.picoVel ?? 0,
        media3: point.media3 ?? 0,
    })), [history]);
    const formatTime = () => {
        if (!telemetry.updatedAt)
            return '--:--:--';
        return new Date(telemetry.updatedAt).toLocaleTimeString('pt-BR');
    };
    return (_jsxs("div", { className: styles.container, children: [_jsxs("header", { className: styles.header, children: [_jsxs("div", { children: [_jsx("h1", { className: styles.title, children: profile?.name || 'Paciente' }), _jsx("p", { className: styles.subtitle, children: "Dados em tempo real da ESP32" })] }), _jsxs("div", { className: styles.headerActions, children: [_jsxs("div", { className: styles.badge, children: [_jsx(WiFi, { size: 16 }), _jsx("span", { children: "Conectado" })] }), _jsx("button", { onClick: logout, className: styles.logoutBtn, title: "Sair", children: _jsx(LogOut, { size: 18 }) })] })] }), _jsxs("main", { className: styles.content, children: [_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx("h2", { children: "Dados do Goniometro" }), _jsx("span", { className: styles.badge2, children: "Tempo real" })] }), _jsxs("div", { className: styles.metricsGrid, children: [_jsxs("div", { className: styles.metric, children: [_jsx("span", { className: styles.metricLabel, children: "angulo" }), _jsx("span", { className: styles.metricValue, children: telemetry.angulo !== null ? `${telemetry.angulo.toFixed(1)}°` : '--' })] }), _jsxs("div", { className: styles.metric, children: [_jsx("span", { className: styles.metricLabel, children: "angulo_max" }), _jsx("span", { className: styles.metricValue, children: telemetry.maxAng !== null ? `${telemetry.maxAng.toFixed(1)}°` : '--' })] }), _jsxs("div", { className: styles.metric, children: [_jsx("span", { className: styles.metricLabel, children: "fluidez" }), _jsx("span", { className: styles.metricValue, children: telemetry.fluidez !== null ? `${telemetry.fluidez.toFixed(1)} / 100` : '--' })] })] })] }), _jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx("h2", { children: "Gr\u00E1fico da Sess\u00E3o" }), _jsx("span", { className: styles.badge2, children: "normalizado por s\u00E9rie" })] }), _jsx("div", { className: styles.chartWrapper, children: chartData.length > 1 ? (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#0e4a41" }), _jsx(XAxis, { dataKey: "idx", stroke: "#8db6ae" }), _jsx(YAxis, { stroke: "#8db6ae" }), _jsx(Tooltip, { contentStyle: {
                                                    backgroundColor: '#072923',
                                                    border: '1px solid #1e584f',
                                                    borderRadius: '8px',
                                                }, labelStyle: { color: '#eef4ff' } }), _jsx(Legend, {}), CHART_SERIES.map((series) => (_jsx(Line, { type: "monotone", dataKey: series.key, stroke: series.color, dot: false, isAnimationActive: false, strokeWidth: 2 }, series.key)))] }) })) : (_jsx("div", { style: { textAlign: 'center', padding: '60px 20px', color: '#8db6ae' }, children: "Aguardando pontos do Firebase para construir o gr\u00E1fico..." })) }), _jsxs("div", { className: styles.extraMetrics, children: [_jsxs("span", { children: ["estado: ", telemetry.estado ?? '--'] }), _jsxs("span", { children: ["media_3_reps: ", telemetry.media3 !== null ? telemetry.media3.toFixed(1) : '--'] }), _jsxs("span", { children: ["confianca: ", telemetry.confianca !== null ? telemetry.confianca.toFixed(1) : '--'] }), _jsxs("span", { children: ["pico_vel: ", telemetry.picoVel !== null ? telemetry.picoVel.toFixed(1) : '--'] }), _jsxs("span", { children: ["total_reps: ", telemetry.totalReps ?? '--'] })] })] }), _jsxs("p", { className: styles.footer, children: ["\u00DAltima leitura: ", formatTime()] })] })] }));
};
export default Home;
