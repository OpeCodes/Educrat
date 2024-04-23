import { ModuleInterface, ReviewInterface } from "../interface/courseInterface";

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
  
  interface CalculateAverageStarsOptions {
    roundFunction?: (value: number) => number;
  }
 export function calculateAverageStars(reviews: ReviewInterface[], options?: CalculateAverageStarsOptions): number {
    if (!reviews || reviews.length === 0) {
      return 0; 
    }  
    let totalStars = 0;
    reviews.forEach((review) => {
      totalStars += review?.stars || 0;
    });  
    const totalReviews = reviews.length;  
    const averageStars = totalStars / totalReviews;  
    const roundFunction = options?.roundFunction || Math.ceil;  
    const roundedAverageStars = roundFunction(averageStars);  
    return roundedAverageStars;
  }


  // function calculateAverageStars(products: any) {
  //   let totalStars = 0;
  //   let totalReviews = 0;
  //   products.forEach(() => {
  //     reviews.forEach((review: ReviewInterface) => {
  //       totalStars += review?.stars || 0;
  //       totalReviews++;
  //     });
  //   });
  //   if (totalReviews === 0) {
  //     return 0;
  //   }
  //   const averageStars = totalStars / totalReviews;
  //   const roundedAverageStars = Math.ceil(averageStars);
  //   return roundedAverageStars;
  // }