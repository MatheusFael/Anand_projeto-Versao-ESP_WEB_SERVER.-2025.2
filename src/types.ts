export type UserType = 'profissional' | 'paciente'

export type UserProfile = {
  uid: string
  name: string
  email: string
  type: UserType
  assignedProfessionalId?: string
}

export type ViewedPatient = {
  uid: string
  name: string
  email: string
  type: 'paciente'
  assignedProfessionalId?: string
}

export type TelemetryData = {
  angulo: number | null
  maxAng: number | null
  fluidez: number | null
  estado: number | null
  media3: number | null
  confianca: number | null
  picoVel: number | null
  totalReps: number | null
  updatedAt: number | null
}

export type TelemetryPoint = {
  ts: number
  angulo: number | null
  maxAng: number | null
  fluidez: number | null
  estado: number | null
  media3: number | null
  confianca: number | null
  picoVel: number | null
  totalReps: number | null
}

export type MetricKey = 'angulo' | 'estado' | 'maxAng' | 'fluidez' | 'media3' | 'confianca' | 'picoVel' | 'totalReps'
