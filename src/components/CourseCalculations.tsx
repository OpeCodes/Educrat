import { FaStar } from "react-icons/fa";
import { ModuleInterface, ReviewInterface } from "../interface/courseInterface";
//function to calculate the totalduration lectures
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
  //// Function to calculate the average stars and round up to whole number
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

//function to calculate the totalReviewstart
export function getTotalStarsSum(data: ReviewInterface[]) {
  const allStars = data.map((review: any) => review.stars);
  const totalStarsSum = allStars.reduce(
    (sum: number, stars: number) => sum + stars,
    0
  );

  return totalStarsSum;
}
//function to generatereviews
export function generateStarIcons(averageRating: any, maxRating: number = 5): JSX.Element[] {
  const starIcons: JSX.Element[] = [];
  for (let i = 1; i <= maxRating; i++) {
    const color = i <= averageRating ? "#FFD700" : "#EAEAEA";
    starIcons.push(
      <FaStar
        key={i}
        color={color}
      />
    );
  }

  return starIcons;
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