import { ModuleInterface } from "../interface/courseInterface";

export const getTotalLecturesDuration = (modules: ModuleInterface[]): number => {
    let totalDuration = 0;  
    modules.forEach((module) => {
      if (module.lectures && Array.isArray(module.lectures)) {
        module.lectures.forEach((lecture) => {
          totalDuration += lecture?.content?.duration || 0;
        });
      }
    });
  
    return totalDuration;
  };