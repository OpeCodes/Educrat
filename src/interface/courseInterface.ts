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


export interface ReviewInterface {
    stars: number;
    content: string;
    courseId: string;
    id: string;
    title: string;
    updatedAt: string | number;
  }
interface ContentInterface {
  body: string;
  duration: number;
  lectureId: string;
}
export interface LectureInterface {
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
  lectures: LectureInterface[];
}

export interface CourseInterface {
  id: number;
  complexityLevel: string;
  title: string;
  userId: UserInterface;
  review: ReviewInterface[];
  slug: string;
  modules: ModuleInterface[];
  thumbnail: string;
  description: string;
  language: string;
  learningObjectives: string[];
  preRequisites: string;
  promotionalVideo: string;
}
