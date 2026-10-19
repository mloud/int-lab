export interface ProcessIntroWorksheetAnswers {
  [key: string]: string;
}

export interface ProcessIntroCheckedItems {
  [key: string]: boolean;
}

export interface ProcessIntroStorageState {
  studentName: string;
  answers: ProcessIntroWorksheetAnswers;
  checkedItems: ProcessIntroCheckedItems;
}
