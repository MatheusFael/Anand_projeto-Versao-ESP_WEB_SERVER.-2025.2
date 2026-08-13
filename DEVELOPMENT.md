# Desenvolvimento

Este arquivo documenta a estrutura da versão web do projeto Anand.

## Estrutura de Pastas

```
anand-web/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx        # Context para autenticação global
│   ├── hooks/
│   │   └── useTelemetry.ts       # Hook para consumir dados do Firebase
│   ├── pages/
│   │   ├── Home.tsx              # Tela principal com gráfico
│   │   ├── Home.module.css       # Estilos da Home
│   │   ├── Login.tsx             # Tela de login
│   │   └── Login.module.css      # Estilos do Login
│   ├── App.tsx                   # Componente raiz
│   ├── firebaseConfig.ts         # Inicialização Firebase
│   ├── types.ts                  # Tipos TypeScript reutilizáveis
│   ├── index.css                 # Estilos globais
│   └── main.tsx                  # Entry point React
├── public/                        # Arquivos estáticos
├── index.html                    # HTML raiz
├── vite.config.ts                # Configuração Vite
├── tsconfig.json                 # Configuração TypeScript
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

## Tecnologias

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **Firebase SDK** - Autenticação e Realtime Database
- **Recharts** - Gráficos
- **Lucide React** - Ícones

## Fluxo de Dados

1. **Autenticação** (`AuthContext`)
   - Ouve mudanças de autenticação do Firebase
   - Carrega perfil do usuário do Firestore
   - Disponibiliza via `useAuth()` hook

2. **Telemetria** (`useTelemetry`)
   - Escuta múltiplos nós do Firebase Realtime DB em paralelo
   - Agrega dados em histórico com limite de 120 pontos
   - Atualiza estado local em tempo real

3. **UI** (`Home`)
   - Renderiza 3 métricas no topo (angulo, angulo_max, fluidez)
   - Exibe gráfico com 6 séries do histórico
   - Mostra timestamp da última leitura

## Padrões de Código

### Context API
```tsx
const { firebaseUser, profile } = useAuth()
```

### Custom Hook para Telemetria
```tsx
const { telemetry, history } = useTelemetry()
```

### CSS Modules
```tsx
import styles from './MyComponent.module.css'
<div className={styles.container}>
```

## Compatibilidade Firebase

A aplicação suporta ambas as estruturas de dados:

**Nova** (esp4.dados):
- `realtime/ANG` ou `realtime/angulo`
- `sessao/ultima_rep/max_ang`
- `sessao/ultima_rep/fluidez`
- etc.

**Legada** (fallback):
- `goniometro/angulo_max`
- `goniometro/fluidez`

## Como Adicionar Novas Funcionalidades

### 1. Novo Tipo de Dado
Atualize `src/types.ts`:
```tsx
export type MetricKey = '...' | 'meuNovoMetrickey'
```

### 2. Novo Campo Telemétrico
Atualize `src/hooks/useTelemetry.ts`:
```tsx
upsertTelemetry({
  ...
  meuNovoMetrickey: data?.meu_novo_metrickey ?? null,
})
```

### 3. Nova Série no Gráfico
Atualize `src/pages/Home.tsx`:
```tsx
const CHART_SERIES = [
  ...
  { key: 'meuNovoMetrickey', label: 'MEU_LABEL', color: '#colorCode' },
]
```

## Troubleshooting

### Gráfico em branco
- Verifique se o Firebase está conectado (badge "Conectado" deve estar verde)
- Verifique se dados estão chegando no Firebase Console
- Abra o DevTools (F12) e veja o console para erros

### Login não funciona
- Verifique se o usuário existe no Firebase Authentication
- Verifique a configuração MySQL do firebaseConfig.ts
- Verifique as regras de segurança do Firebase

### Estilos quebrados
- Limpe o cache: `npm run build` seguido de abertura da página
- Verifique se as variáveis CSS estão definidas no `index.css`
