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
export interface CurriculumInterface {
    title?: string;
    body?: string;
    url?: string;
    learningObjective?: string;
    description?: string;
    duration?: string;
}
