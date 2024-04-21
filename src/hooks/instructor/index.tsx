import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";

export const useGetAllInstructorCourses = (id: any) => {
    const {
      data: getLectureModuleCourse,
      isPending,
      isSuccess,
    } = useQuery({
      queryKey: ["getAllInstructorCourses", id],
      queryFn: async ({ queryKey }) => {
        const [, id] = queryKey; // Destructure the queryKey to get the 'id'
        const { data } = await customFetch.get(`course/instructor/${id}`);
        return data;
      },    
    });  
    return {
      getLectureModuleCourse,
      isPending,
      isSuccess,
    };
  };