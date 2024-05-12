import {  useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";

export const useGetAllInstructorCourses = (id: any) => {
    const {
      data: getLectureModuleCourse,
      isPending,
      isSuccess,
    } = useQuery({
      queryKey: ["getAllInstructorCourses", id],
      queryFn: async ({ queryKey }) => {
        const [, id] = queryKey; 
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

export const useGetAllBanks = (search: string) => { 
  const { data: getAllBanks,isPending } = useQuery({
    queryKey: ["getAllBanks", { search }], 
    queryFn: async () => {
      const { data } = await customFetch.get("/payment/withdrawal/bank", { params: { search } }); 
      return data;
    },
  });
  return { getAllBanks,isPending };
}



export const useValidateAccountInfo = (bankCode: string, accountNumber: string) => {
  const { data: validateAccountInfo,isPending } = useQuery({
    queryKey: ["validateAccountInfo", { bankCode, accountNumber }],
    queryFn: async () => {
      const { data } = await customFetch.get("/payment/withdrawal/resolve-account", { params: { bank_code: bankCode, account_number: accountNumber } });
      return data;
    },
  });
  return { validateAccountInfo, isPending};
};


export const useGetUserWallet = () => {
  const {
    data: getUserWallet,
    isPending,
  } = useQuery({
    queryKey: ["getUserWallet"],
    queryFn: async () => {
      const { data } = await customFetch.get(`payment/wallet`);
      return data;
    },    
  });  
  return {
    getUserWallet,
    isPending,
  };
};



export const useGetUserWalletLogs = (id: any) => {
  const {
    data: getUserWalletLogs,
    isPending,
  } = useQuery({
    queryKey: ["getUserWalletLogs", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; 
      const { data } = await customFetch.get(`payment/wallet/${id}/logs`);
      return data;
    },    
  });  
  return {
    getUserWalletLogs,
    isPending,
  };
};