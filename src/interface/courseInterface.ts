import { UserInterface } from "./UserInterface";
export interface CourseEditCreate {
  title: string;
  subtitle: string;
  language: string;
  preRequisites: string;
  learningObjectives: string[];
  category: number;
  description: any;
  complexityLevel: any;
}
export interface CurriculumInterface {
  title?: string;
  body?: string;
  url?: string;
  learningObjective?: string;
  description?: string;
  duration?: string;
}
interface ContentInterface {
  body: string;
  duration: number;
  lectureId: string;
}
export interface Lecture {
  id: number;
  contentPreviewable: boolean;
  createdAt: string;
  moduleId: number;
  resources: string[];
  title: string;
  updatedAt: string;
  content: ContentInterface;
}

export interface ModuleInterface {
  title: string;
  courseId: string;
  id: number;
  learningObjective: string;
  lectures: Lecture[];
}

export interface CourseInterface {
  id: number;
  complexityLevel: string;
  title: string;
  userId: UserInterface;
  review: (string | number)[];
  slug: string;
  modules: ModuleInterface[];
  thumbnail: string;
}
