import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios, { AxiosError } from 'axios';
import { useForm } from "react-hook-form";
import { api } from "../../libs/api";
import { thread, threadsForm } from "../../libs/type";
import { createThreadSchema } from "../validators/threads";
import { fetchThreads } from "../../component/threads";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";


export const useThreadsPostForm = () => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting, isSubmitSuccessful},
        resetField,
        unregister,
        reset,
        getValues
      } = useForm<threadsForm>({
        mode: "onSubmit",
        resolver: zodResolver(createThreadSchema),
        });

    const {refetch } = useQuery<thread[]>({
        queryKey: ["threads"],
        queryFn: fetchThreads,
        });

        useEffect(() => {
            if(isSubmitSuccessful){
                refetch();
                toast({
                    title: "Thread submitted!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                reset();
            }
           
          }, [isSubmitSuccessful])


    const { mutateAsync } = useMutation<
    thread,
    AxiosError,
    threadsForm
    >({
        mutationFn: async(data: { content: any; image: any; }) => {

            const formData =  new FormData();
            formData.append('content', data.content);
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
                } else {
                formData.append('image', 'none');
                }
            
            const token = localStorage.getItem('token');
            return await Axios({
            method: "post",
            url: `${api}/threadPost`,
            data: formData,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
                },
            })
        },
    });
    

        return {
          register,
          unregister,
          handleSubmit,
          mutateAsync,
          isSubmitting,
          isSubmitSuccessful,
          errors,
          reset,
          resetField,
          getValues
        }

}