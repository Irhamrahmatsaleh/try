import { resetForm } from "@/libs/type";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../libs/api";
import { resetSchema } from "../validators/reset-form";

export const useResetForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {tokenReset} = useParams();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors,isSubmitting },
      } = useForm<resetForm>({
        mode: "all",
        resolver: zodResolver(resetSchema)
      })

    
    const onSubmit: SubmitHandler<resetForm> = async(data) => {
      try {
        console.log(tokenReset);
        const formData = new FormData();
        formData.append('password',data.password);
        const response = await Axios({
            method: "post",
            url: `${api}/reset-password/${tokenReset}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            })
        // handle success
        console.log(response);
        navigate('/login');
        toast({
          title: "Password updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        } catch (error) {
        // handle error
        console.log(error);
        toast({
          title: "Password change failed, please try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        }
    }

        // function objectToFormData(obj: Record<string, any>): FormData{
        //     const formData = new FormData();
        //     for (const key in obj) {
        //         formData.append(key, obj[key]);
        //     }
        //     return formData;
        //   }

        return {
          register,
          watch,
          handleSubmit,
          onSubmit,
          errors,
          isSubmitting
        }

}