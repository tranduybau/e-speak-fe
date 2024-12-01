import authApiRequest from "@/apiRequests/auth";
import { useMutation } from "@tanstack/react-query";
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.cLogin,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.cRegister,
  });
};
