import { editProfileForm, users } from "@/libs/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchProfile } from "../../component/profileCard";
import { api } from "../../libs/api";
import { profileSchema } from "../validators/profileSchema";
import { useToast } from "@chakra-ui/react";

export const useEditProfileForm = () => {
  const toast = useToast();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
      } = useForm<editProfileForm>({
        mode: "all",
        resolver: zodResolver(profileSchema)
      })

    const { refetch } = useQuery<editProfileForm>({
      queryKey: ["profile"],
      queryFn: fetchProfile,
      });

const { mutateAsync } = useMutation<
    users,
    AxiosError,
    editProfileForm
    >({
        mutationFn: async(data: editProfileForm) => {
          const formData =  new FormData();
          formData.append('full_name', data.full_name);
          formData.append('username', data.username);
          formData.append('bio', data.bio);
          if (data.photo_profile && data.photo_profile[0]) {
              formData.append('photo_profile', data.photo_profile[0]);
              }

          const token = localStorage.getItem('token');

          return await Axios({
              method: "patch",
              url: `${api}/user`,
              data: formData,
              headers: { "Content-Type": "multipart/form-data",'Authorization': `Bearer ${token}` },
              })
          },
    });

    const onSubmit: SubmitHandler<editProfileForm> = async(data) => {
        try {
            await mutateAsync(data);
            refetch();
            toast({
              title: "Edit Profile submitted!",
              status: "success",
              duration: 3000,
              isClosable: true,
          });
            } catch (error) {
            toast({
              title: "Edit Profile failed!",
              status: "error",
              duration: 3000,
              isClosable: true,
          });
            }
    }

        return {
          register,
          handleSubmit,
          onSubmit,
          reset,
          isSubmitting,
          isSubmitSuccessful,
          errors
        }

}