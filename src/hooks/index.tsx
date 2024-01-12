import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";

export const useGetUser = () => {
  const {  data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  return {  data };
};
