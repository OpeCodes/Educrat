import {  useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
export const useGetAllCourse = () => {
    const { data, isPending, isError } = useQuery({
      queryKey: ["allStudentCourse"],
      queryFn: async () => {
        const { data } = await customFetch.get("/course");
        return data;
      },
    });
    return { data, isPending, isError };
  };