
import { Box, Button, Divider, Flex, FormControl, Heading, Icon, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Spinner, Text, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler } from 'react-hook-form';
import { IconType } from 'react-icons';
import { BsDoorOpen, BsHeart, BsHouseDoor, BsImage, BsPerson, BsSearch, BsXCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useThreadsPostForm } from '../features/hooks/authThreads';
import { editProfileForm, thread, threadsForm } from "../libs/type";
import f from './function';
import { fetchProfile } from "./profileCard";
import { fetchThreads } from "./threads";
import { api } from '../libs/api';

export enum sideButton {
    home,
    search,
    follow,
    profile
}


const color = {
  grey: '#909090',
  greyCard: '#262626'
}

export default function Sidebar(side : sideButton){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleSubmit, mutateAsync, register, errors, isSubmitting, resetField, getValues, unregister } = useThreadsPostForm();    
    const textareaRef = useRef<string>() ;
    const fileInputRef = useRef<File | null>(null) ;
    const [imagePreview, setImagePreview] = useState<string>("");
    const [textValue, setTextValue] = useState<string>();
    function buttonSide (iconButton: IconType, desc : string, link : string, bold? : string | '300')
    {
      return <Link to={link}><Button color={'white'} fontSize={'1.2rem'} _hover={{fontWeight: 'Bold'}} leftIcon={<Icon as={iconButton} />}  colorScheme='white' fontWeight={bold} variant='ghost' width={'75%'} justifyContent={'start'}>{desc}</Button></Link>
    }

    const buttonHome = () => {
        if(side === sideButton.home)
            {
              return buttonSide(BsHouseDoor, 'Home', '/', 'bold')
            } else{
              return  buttonSide(BsHouseDoor, 'Home', '/')
            }
    }

    const buttonProfile = () => {
        if(side === sideButton.profile)
            {
              return  buttonSide(BsPerson, 'Profile', '/profile', 'bold')
            } else{
              return  buttonSide(BsPerson, 'Profile', '/profile')
            }
    }

    const buttonSearch = () => {
        if(side === sideButton.search)
            {
              return  buttonSide(BsSearch, 'Search', '/search', 'bold')
            } else{
              return  buttonSide(BsSearch, 'Search', '/search')
            }
    }

    const buttonFollow = () => {
        if(side === sideButton.follow)
            {
              return  buttonSide(BsHeart, 'Follow', '/follow', 'bold')
            } else{
              return  buttonSide(BsHeart, 'Follow', '/follow')
            }
    }

    const {refetch } = useQuery<thread[]>({
        queryKey: ["threads"],
        queryFn: fetchThreads,
        });
    
    const onSubmit: SubmitHandler<threadsForm> = async (data : { content: any; image: any ; }) => {
        if(!imagePreview || imagePreview === '') data.image = null;
        textareaRef.current = "";
        await mutateAsync(data);
        setTextValue('')
        unregister('image'); 
        setImagePreview('');
        refetch();

    }

    const changeImage = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if(file){
            setImagePreview(URL.createObjectURL(file));
            fileInputRef.current = file;
        }
    }
    
    const { data: profileData  } = useQuery<editProfileForm>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        });

    const [prompt, setPrompt] = useState<string>('');
    const [suggestion, setSuggestion] = useState<string>('');
    const [fetchDebounce] = useDebounce(prompt, 1000);

    useEffect(() => {
        fetchSuggestion(fetchDebounce);
    }, [fetchDebounce])

    async function fetchSuggestion(prompt : string){
        try {
            if(prompt === '') {
                return <></>
            }
            const response = await Axios({
                method: "post",
                url: `https://api.mistral.ai/v1/chat/completions`,
                data: {
                    "model": "mistral-small-latest",
                    "messages": [
                            {
                            "role": "user",
                            "content": `${prompt}. finish my previous sentence based on random related topic of your pick answer it directly single sentence. dont need to answer the sentence, just finish it directly without conjunction`
                            }
                            ]
                },
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${import.meta.env.VITE_AI_KEY}`
                  },
            })
            setSuggestion(response.data.choices[0].message.content)
        } catch(error) {
            return error;
        }
      }
    
    return(
        <Flex flexDirection={'column'} margin={'1.33rem 2rem'} width={'25%'} borderEnd={'1px solid rgb(110, 110, 110, 0.333)'} justifyContent={'start'}>
            <Flex flexDirection={'column'}>
            <Heading as='a' href={api + "/api-docs"} size={'2xl'} _hover={{color : "whitesmoke", cursor: "pointer"}} marginBottom={'2rem'} color={'lime'}>Circle</Heading>
            
            {buttonHome()}
            {buttonFollow()}
            {buttonSearch()}
            {buttonProfile()}

            <Button onClick={onOpen} colorScheme='green' variant='solid' width={'90%'} borderRadius={'20px'} marginTop={'1rem'}>Create Post</Button>

            
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent bgColor={color.greyCard} maxWidth={'640px'} borderRadius={'12px'} mt={'2rem'} pt={'1.5rem'} pb={'0.33rem'} px={'0.33rem'} top={'2rem'} right={'1.5rem'}>
                <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                <ModalBody>
                <Flex flexDirection={'column'}>
                    <FormControl display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'start'} marginBottom={'1rem'}>
                        <Flex gap={'1rem'} alignItems={'start'} mb={'1rem'}>
                        {f.imageCircle(profileData?.photo_profile ? profileData.photo_profile : 'null', '40px')}
                        
                        <Tooltip label={suggestion} aria-label='A tooltip'>
                        <Textarea placeholder="What is Happening..." width={'420px'} minHeight={'60px'} border={'none'} color={'rgba(255, 255, 255, 0.496)'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'} {...register("content")} value={textValue} onClick={() => {
                        if(!getValues('image'))  resetField('image')}} onInput={(e) => {setPrompt((e.target as HTMLInputElement).value);}}></Textarea>
                        </Tooltip>                        
                        </Flex>
                        <Divider orientation='horizontal' color={'rgb(110, 110, 110, 0.333)'}/>
                    </FormControl>
                </Flex>
                </ModalBody>
                <ModalFooter pt={'0'}>
                <Flex width={'100%'} justifyContent={'space-between'}>
                <Box position="relative" display="inline-block">
                    <Input
                        type="file"
                        id="createPost-input"
                        opacity="0"
                        position="absolute"
                        left="0"
                        top="0"
                        height="100%"
                        width="100%"
                        aria-hidden="true"
                        {...register('image')}
                        onChange={changeImage}
                        ///useref errorr
                    />
                    <IconButton
                        as="label"
                        htmlFor="createPost-input"
                        colorScheme="green"
                        aria-label="Add Picture"
                        size="sm"
                        variant="ghost"
                        fontSize="1.33rem"
                        icon={<BsImage />}
                        marginEnd="0.5rem"
                        cursor="pointer"
                    />
                    </Box>

                {imagePreview && 
                <Box position="relative" display="inline-block">
                    <Image src={imagePreview} height="200px" />
                    <IconButton
                    position="absolute"
                    top="15%"
                    right="3%"
                    transform="translate(-50%, -50%)"
                    icon={<BsXCircle />}
                    color={'white'}
                    fontSize={'1.33rem'}
                    size={'sm'}
                    isRound={true}
                    colorScheme="red"
                    variant={'solid'}
                    aria-label="close"
                    onClick={() => {unregister('image'); setImagePreview('')}}
                    >
                    </IconButton>
                    </Box>}
                    
                <Button isDisabled={!!(errors.image?.message || isSubmitting)} colorScheme="green" size={'sm'} type="submit" borderRadius={'20px'} width={'72px'}>{isSubmitting ? <Spinner/> : "Post"}</Button>
                </Flex>
                <Text color={"error.primary"}>{errors.image && errors.image.message}</Text>
                </ModalFooter>
                </ModalContent>
                </form>
            </Modal>
            
            </Flex>
            <Flex mt={'22rem'}>
            {buttonSide(BsDoorOpen, 'Log Out', '/login')}
            </Flex>
        </Flex>
    )
}