import { registerForm } from "@/libs/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../validators/register-form";
import { api } from "../../libs/api";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<registerForm>({
      mode: "onChange",
      resolver: zodResolver(registerSchema)
    })

  const onSubmit: SubmitHandler<registerForm> = async(data) => {
      try {
        const formData = new FormData();
        formData.append('full_name', data.full_name);
        formData.append('email', data.email);
        formData.append('password', data.password);
          const response = await Axios({
              method: "post",
              url: `${api}/register`,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
              })
          if(response.status === 201)
            {
                toast({
                    title: "Register success!, Please check your email to verify",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                navigate("/");
            }
          } catch (error : any) {
            toast({
              title: error.response.data,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          console.log(error);
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
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful
      }

}