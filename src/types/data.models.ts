export interface SciencesType {
  id: number;
  science_id: string;
  is_active: boolean;
  name: string;
  group: number[];
}

export interface IQuiz {
  id: number;
  question_id: string;
  title: string;
  is_active: boolean;
  science: SciencesType;
  answers: IAnswers[];
}
export interface IAnswers {
  id: number;
  answer_id: string;
  answer: string;
  is_active: boolean;
  question: number;
}
