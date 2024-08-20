export interface QuestionModel {
    title: string;
    description?: string;
    required: boolean;
    options?: (string | number)[];
    type: "STRING" | "NUMBER";
    viewType: "SHORT" | "LONG" | "CHECKBOX" | "RADIO" | "DROPDOWN" | "TIME" | "DATE" | "LINEAR";
  }
  
  export interface FormModel {
    filename: string;
    title: string;
    description?: string;
    questions: QuestionModel[];
  }
  