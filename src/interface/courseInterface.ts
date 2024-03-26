export interface CourseEditCreate{
    title: string;
    subtitle: string;
    language:string;
    preRequisites: string;
    learningObjectives: string[];
    category: number;
    description: any;
    complexityLevel: any;
}