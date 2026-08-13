import { LogOut, Wifi } from 'lucide-react'
import React, { useMemo } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { useTelemetry } from '../hooks/useTelemetry'
import styles from './Home.module.css'

const CHART_SERIES = [
  { key: 'angulo', label: 'ANG', color: '#23d6b0' },
  { key: 'maxAng', label: 'MAXANG', color: '#ff9f43' },
  { key: 'fluidez', label: 'FLUIDEZ', color: '#f6d55c' },
  { key: 'confianca', label: 'CONFIANCA', color: '#c792ea' },
  { key: 'picoVel', label: 'PICO_VEL', color: '#29b6f6' },
  { key: 'media3', label: 'MEDIA_3REPS', color: '#9ccc65' },
]

const Home: React.FC = () => {
  const { profile, logout } = useAuth()
  const { telemetry, history } = useTelemetry()

  const chartData = useMemo(
    () =>
      history.slice(-80).map((point, idx) => ({
        idx,
        ts: point.ts,
        angulo: point.angulo ?? 0,
        maxAng: point.maxAng ?? 0,
        fluidez: point.fluidez ?? 0,
        confianca: point.confianca ?? 0,
        picoVel: point.picoVel ?? 0,
        media3: point.media3 ?? 0,
      })),
    [history]
  )

  const formatTime = () => {
    if (!telemetry.updatedAt) return '--:--:--'
    return new Date(telemetry.updatedAt).toLocaleTimeString('pt-BR')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{profile?.name || 'Paciente'}</h1>
          <p className={styles.subtitle}>Dados em tempo real da ESP32</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.badge}>
              <Wifi size={16} />
            <span>Conectado</span>
          </div>
          <button onClick={logout} className={styles.logoutBtn} title="Sair">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Dados do Goniometro</h2>
            <span className={styles.badge2}>Tempo real</span>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>angulo</span>
              <span className={styles.metricValue}>
                {telemetry.angulo !== null ? `${telemetry.angulo.toFixed(1)}°` : '--'}
              </span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>angulo_max</span>
              <span className={styles.metricValue}>
                {telemetry.maxAng !== null ? `${telemetry.maxAng.toFixed(1)}°` : '--'}
              </span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>fluidez</span>
              <span className={styles.metricValue}>
                {telemetry.fluidez !== null ? `${telemetry.fluidez.toFixed(1)} / 100` : '--'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Gráfico da Sessão</h2>
            <span className={styles.badge2}>normalizado por série</span>
          </div>

          <div className={styles.chartWrapper}>
            {chartData.length > 1 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0e4a41" />
                  <XAxis dataKey="idx" stroke="#8db6ae" />
                  <YAxis stroke="#8db6ae" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#072923',
                      border: '1px solid #1e584f',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#eef4ff' }}
                  />
                  <Legend />
                  {CHART_SERIES.map((series) => (
                    <Line
                      key={series.key}
                      type="monotone"
                      dataKey={series.key as any}
                      stroke={series.color}
                      dot={false}
                      isAnimationActive={false}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8db6ae' }}>
                Aguardando pontos do Firebase para construir o gráfico...
              </div>
            )}
          </div>

          <div className={styles.extraMetrics}>
            <span>estado: {telemetry.estado ?? '--'}</span>
            <span>media_3_reps: {telemetry.media3 !== null ? telemetry.media3.toFixed(1) : '--'}</span>
            <span>confianca: {telemetry.confianca !== null ? telemetry.confianca.toFixed(1) : '--'}</span>
            <span>pico_vel: {telemetry.picoVel !== null ? telemetry.picoVel.toFixed(1) : '--'}</span>
            <span>total_reps: {telemetry.totalReps ?? '--'}</span>
          </div>
        </div>

        <p className={styles.footer}>Última leitura: {formatTime()}</p>
      </main>
    </div>
  )
}

export default Home
