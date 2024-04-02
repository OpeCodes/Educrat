import {  useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
export const useGetStudentSingleCourse = (slug: any) => {
    const {
      data: getStudentSingleCourse,
      isPending,
      isError,
      refetch,
    } = useQuery({
      queryKey: ["singleCourse", slug],
      queryFn: async ({ queryKey }) => {
        const [, slug] = queryKey; // Destructure the queryKey to get the 'id'
        const { data } = await customFetch.get(`/course/slug/${slug}`);
        return data;
      },
    });
  
    return { getStudentSingleCourse, isPending, isError, refetch };
  };