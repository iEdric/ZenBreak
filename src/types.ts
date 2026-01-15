
export enum AppState {
  HOME = 'HOME',
  SESSION = 'SESSION',
  FINISHED = 'FINISHED'
}

export enum RelaxMode {
  BREATHING = 'BREATHING',
  EYES = 'EYES',
  MEDITATION = 'MEDITATION'
}

export interface SessionConfig {
  durationMinutes: number;
  mode: RelaxMode;
}

export interface RelaxationAdvice {
  title: string;
  content: string;
  steps?: string[];
}
