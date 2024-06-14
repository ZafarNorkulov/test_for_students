export interface IAllowSciences {
  id: number;
  exam_id: string;
  user: number;
  science: IScience;
  group: number;
  is_active: boolean;
  is_exam: boolean;
}
export interface IScience {
  id: number;
  science_id: string;
  is_active: boolean;
  name: string;
}

export interface IQuiz {
  id: number;
  question_id: string;
  title: string;
  is_active: boolean;
  science: IScience;
  answers: IAnswers[];
}
export interface IAnswers {
  id: number;
  answer_id: string;
  answer: string;
  is_active: boolean;
  question: number;
}
