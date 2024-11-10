import { Box, Button, Divider, Flex, FormControl, FormHelperText, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, Textarea } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useEditProfileForm } from "../features/hooks/submitEditProfile";
import { api } from "../libs/api";
import { editProfileForm } from "../libs/type";
import { fetchProfile } from "./profileCard";

export default function profileUser(){
    const { data: profileData  } = useQuery<editProfileForm>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        });

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const fileInputRef = useRef<File | null>(null) ;
    const [photoPreview, setPhotoPreview] = useState<string | undefined>(profileData?.photo_profile);
    const changePhoto = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log(file);
        if(file){
            setPhotoPreview(URL.createObjectURL(file));
            fileInputRef.current = file;
            console.log(photoPreview);
        }
    }
    const { handleSubmit, onSubmit, register, errors, isSubmitting } = useEditProfileForm();

    useEffect(() => {
        async function fetchProfile(){
            try {
                const token = localStorage.getItem('token');
                const response = await Axios({
                    method: "get",
                    url: `${api}/user`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                     },
                })
            setPhotoPreview(response.data['photo_profile'])
            } catch(error){
                console.log(error)
            }
        }
        fetchProfile();
    },[])

    return (
        <Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} pt={'1rem'} mt={'2rem'} mx={'auto'}>
        <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>My Profile</Heading>
            <Box width={'90%'} marginX={'auto'} height={'42%'}>
                <Image src={profileData?.photo_profile} width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
                <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={profileData?.photo_profile} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${'circle.greyCard'}`}/>
                
                <Button onClick={onOpen} colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'27rem'} borderRadius={'14px'}>Edit Profile</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent bgColor={'circle.greyCard'} maxWidth={'720px'} borderRadius={'12px'} px={'1.5rem'} py={'1rem'} mt={'2rem'}>
                    <ModalHeader color={'white'}>Edit Profile</ModalHeader>
                    <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                    <ModalBody>
                    <Flex flexDirection={'column'}>
                        <Box width={'100%'} marginX={'auto'} height={'60%'} mb={'0.5rem'}>
                        <Image src={photoPreview && photoPreview} width={'720px'} height={'120px'} objectFit={'cover'} borderRadius={'12px'}/>
                        <Box sx={{
                        '.container': {
                            position: 'relative',
                            width: '72px',
                            height: '72px',
                            top: '-2rem',
                            left: '1rem',
                            zIndex:'4',
                        },
                        '.image': {
                            width: '100%',
                            height: '100%',
                            objectFit:'cover',
                            border: `4px solid #262626`,
                            borderRadius:'50%'
                        },
                            '.overlay': {
                            position: 'absolute',
                            top: '1',
                            bottom: '0',
                            left: '1',
                            right: '0',
                            height: '90%',
                            width: '90%',
                            opacity: '0',
                            transition: '.3s ease',
                            backgroundColor: 'rgba(255, 255, 255, 0.33)',
                            borderRadius:'50%'
                            },
                        '.container:hover .overlay': {
                            opacity: '1',
                        },

                        '.icon': {
                        color: 'green',
                        fontSize: '2rem',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        msTransform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        },
                        '.icon-image:hover': {
                            color: 'rgb(124, 195, 124)'
                        } 
                        }}>
                            <Box className="container">
                            <Image src={photoPreview && photoPreview} alt="Avatar" className="image"/>
                            <Input
                                type="file"
                                id="photo-input"
                                opacity="0"
                                position="absolute"
                                left="0"
                                top="0"
                                height="100%"
                                width="100%"
                                aria-hidden="true"
                                {...register('photo_profile')}
                                
                                onChange={changePhoto}
                            />
                            <Box className="overlay">
                            <IconButton
                                as="label"
                                htmlFor="photo-input"
                                colorScheme="white"
                                aria-label="Add Picture"
                                size="sm"
                                variant="ghost"
                                fontSize="1.33rem"
                                icon={<BsImage className="icon-image"/>}
                                marginEnd="0.5rem"
                                cursor="pointer"
                                className="icon"
                            />
                            </Box>
                            </Box>
                        </Box>                        
                            <Text color={"error.primary"}>{errors.photo_profile && errors.photo_profile.message}</Text>
                        </Box>
                        <FormControl display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'start'} marginBottom={'0.33rem'} color={'white'}>
                            <Box mb={'1rem'} width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'circle.grey'} ms={'1rem'}>Name</FormHelperText>
                            <Input border={'none'} type='text' placeholder="John Doe" {...register("full_name", {required: true})} isRequired defaultValue={profileData?.full_name}/>
                            </Box>
                            <Box mb={'1rem'} width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'circle.grey'} ms={'1rem'}>Username</FormHelperText>
                            <Input border={'none'} type='text' placeholder="@john_doe" {...register("username", {required: true})} isRequired defaultValue={profileData?.username}/>
                            </Box>
                            <Box width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'circle.grey'} ms={'1rem'}>Bio</FormHelperText>
                            <Textarea width={'100%'} minHeight={'80px'} border={'none'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'} {...register("bio")} defaultValue={profileData?.bio}></Textarea>
                            </Box>
                        </FormControl>
                    </Flex>
                    </ModalBody>
                    <ModalFooter>
                    {/* <Box position="relative" display="inline-block">
                            <Input
                                type="file"
                                id="photo-input"
                                opacity="0"
                                position="absolute"
                                left="0"
                                top="0"
                                height="100%"
                                width="100%"
                                aria-hidden="true"
                                {...register('photo_profile')}
                                
                                onChange={changePhoto}
                            />
                            <IconButton
                                as="label"
                                htmlFor="photo-input"
                                colorScheme="green"
                                aria-label="Add Picture"
                                size="sm"
                                variant="ghost"
                                fontSize="1.33rem"
                                icon={<BsImage />}
                                marginEnd="0.5rem"
                                cursor="pointer"
                            />
                            </Box> */}
                    <Button isDisabled={!!(errors.full_name?.message || errors.username?.message || errors.photo_profile?.message || isSubmitting)} colorScheme="green" size={'md'} type="submit" borderRadius={'20px'} width={'72px'}>{isSubmitting ? <Spinner/> : "Save"}</Button>
                    </ModalFooter>
                    </ModalContent>
                    </form>
                </Modal>
            </Box>
            <Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
                <Heading as={'h3'} size={'md'} color={'whitesmoke'}>{profileData?.full_name}</Heading>
                <Text fontSize={'1rem'} color={'circle.grey'}>{profileData?.username}</Text>
                <Text color={'white'}>{profileData?.bio}</Text>
            </Flex>
            <Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
                <Text fontWeight={'bold'}>{profileData?.follower}</Text>
                <Text me={'0.33rem'} color={'circle.grey'}>Following</Text>
                <Text fontWeight={'bold'}>{profileData?.following}</Text>
                <Text color={'circle.grey'}>Followers</Text>
            </Flex>
        <Divider orientation='horizontal' borderColor={'rgb(110, 110, 110, 0.333)'} mt={'1rem'}/>
        </Flex>
    )
}