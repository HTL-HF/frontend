export interface AnswerModal {
  questionId: string;
  answer: string | number | string[];
}
export interface ResponseModal {
  submittedAt: number;
  answers: AnswerModal[];
}
