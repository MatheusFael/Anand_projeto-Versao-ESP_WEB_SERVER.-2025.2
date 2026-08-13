import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { realtimeDb } from '../firebaseConfig';
const MAX_HISTORY_POINTS = 120;
export const useTelemetry = () => {
    const [telemetry, setTelemetry] = useState({
        angulo: null,
        maxAng: null,
        fluidez: null,
        estado: null,
        media3: null,
        confianca: null,
        picoVel: null,
        totalReps: null,
        updatedAt: null,
    });
    const [history, setHistory] = useState([]);
    const upsertTelemetry = (patch) => {
        setTelemetry((prev) => {
            const next = {
                ...prev,
                ...patch,
                updatedAt: Date.now(),
            };
            setHistory((prevHistory) => {
                const point = {
                    ts: next.updatedAt ?? Date.now(),
                    angulo: next.angulo,
                    maxAng: next.maxAng,
                    fluidez: next.fluidez,
                    estado: next.estado,
                    media3: next.media3,
                    confianca: next.confianca,
                    picoVel: next.picoVel,
                    totalReps: next.totalReps,
                };
                const merged = [...prevHistory, point];
                return merged.length > MAX_HISTORY_POINTS
                    ? merged.slice(merged.length - MAX_HISTORY_POINTS)
                    : merged;
            });
            return next;
        });
    };
    useEffect(() => {
        const realtimeRef = ref(realtimeDb, 'realtime');
        const realtimeAngleLegacyRef = ref(realtimeDb, 'realtime/angulo');
        const sessaoRef = ref(realtimeDb, 'sessao/ultima_rep');
        const goniometroLegacyRef = ref(realtimeDb, 'goniometro');
        const unsubscribeRealtime = onValue(realtimeRef, (snapshot) => {
            if (!snapshot.exists())
                return;
            const data = snapshot.val();
            upsertTelemetry({
                angulo: data?.ANG ?? data?.angulo ?? null,
                estado: data?.ESTADO ?? data?.estado ?? null,
            });
        });
        const unsubscribeRealtimeLegacy = onValue(realtimeAngleLegacyRef, (snapshot) => {
            if (!snapshot.exists())
                return;
            upsertTelemetry({ angulo: Number(snapshot.val()) });
        });
        const unsubscribeSessao = onValue(sessaoRef, (snapshot) => {
            if (!snapshot.exists()) {
                upsertTelemetry({
                    maxAng: null,
                    fluidez: null,
                    media3: null,
                    confianca: null,
                    picoVel: null,
                    totalReps: null,
                });
                return;
            }
            const data = snapshot.val();
            upsertTelemetry({
                maxAng: data?.max_ang ?? data?.angulo_max ?? null,
                fluidez: data?.fluidez ?? null,
                media3: data?.media_3_reps ?? data?.media3 ?? null,
                confianca: data?.confianca ?? null,
                picoVel: data?.pico_vel ?? null,
                totalReps: data?.total_reps ?? null,
            });
        });
        const unsubscribeGoniometroLegacy = onValue(goniometroLegacyRef, (snapshot) => {
            if (!snapshot.exists())
                return;
            const data = snapshot.val();
            upsertTelemetry({
                maxAng: data?.angulo_max ?? null,
                fluidez: data?.fluidez ?? null,
            });
        });
        return () => {
            unsubscribeRealtime();
            unsubscribeRealtimeLegacy();
            unsubscribeSessao();
            unsubscribeGoniometroLegacy();
        };
    }, []);
    return { telemetry, history };
};
