export interface ClimateData {
  year: number;
  trees: number; // in thousands
  temperature: number; // in Celsius
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
}

export type AppStep = 'intro' | 'activity' | 'results';
