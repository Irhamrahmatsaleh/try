import { passwordForm } from "@/libs/type";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../libs/api";
import { passwordSchema } from "../validators/password-form";

export const usePasswordForm = () => {
  const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },
      } = useForm<passwordForm>({
        mode: "onChange",
        resolver: zodResolver(passwordSchema)
      })

    const onSubmit: SubmitHandler<passwordForm> = async(data) => {
        try {
            const response = await Axios({
                method: "post",
                url: `${api}/request-password`,
                data: objectToFormData(data),
                headers: { "Content-Type": "multipart/form-data" },
                })
            // handle success
            console.log(response);
            toast({
              title: "Link sent to your email!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            } catch (error : any) {
            toast({
              title: error.response.data,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            }
    }

        function objectToFormData(obj: Record<string, any>): FormData{
            const formData = new FormData();
            for (const key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
          }

        return {
          register,
          handleSubmit,
          onSubmit,
          isSubmitting,
          errors
        }

}