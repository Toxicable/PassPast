export interface Course {
  $key: string;
  name: string;
  code: string;
  createdAt: string;
  createdBy: string;
}

export interface CourseForm {
  name: string;
  code: string;
}
