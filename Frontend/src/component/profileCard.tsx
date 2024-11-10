import { Box, Button, Link as ChakraLink, Flex, FormControl, FormHelperText, HStack, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, Textarea } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsFacebook, BsGithub, BsImage, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEditProfileForm } from "../features/hooks/submitEditProfile";
import { api } from "../libs/api";
import { editProfileForm, users } from "../libs/type";
import f from './function';

const color = {
    grey: '#909090',
    greyCard: '#262626'
}

export async function setFollow(id: number) {
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/follow${id}`,
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
            },
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function fetchProfile() {
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
        return response.data;
    } catch (error) {
        return error;
    }
}

export default function Profile() {
    const { data: profileData } = useQuery<editProfileForm>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
    });
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const fileInputRef = useRef<File | null>(null);
    const [getSuggested, setSuggested] = useState<users[]>([]);
    const [isFollowed, setFollow] = useState<boolean[]>([]);
    const [photoPreview, setPhotoPreview] = useState<string | undefined>(profileData?.photo_profile);

    const followHandle = (index: number, con: boolean) => {
        const newFollowed = [...isFollowed];
        newFollowed[index] = con;
        setFollow(newFollowed);
    }

    const handleFollow = async (id: number, index: number) => {
        followHandle(index, true);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/follow${id}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Error follow the user', error);
            followHandle(index, false);
        }
    };

    const handleUnfollow = async (id: number, index: number) => {
        followHandle(index, false);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/unfollow${id}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Error unfollow the user', error);
            followHandle(index, true);
        }
    };

    const changePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log(file);
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
            fileInputRef.current = file;
            console.log(photoPreview);
        }
    }

    // const clearFileInput = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current = null;
    //         setPhotoPreview(profileData?.photo_profile)
    //         console.log('File input cleared');
    //         }
    // };

    useEffect(() => {
        async function fetchProfile() {
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
                console.log(response.data['photo_profile'])
                setPhotoPreview(response.data['photo_profile'])
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile();
    }, [])

    const { handleSubmit, onSubmit, register, errors, isSubmitting } = useEditProfileForm();

    const profile =
        <Flex flexDirection={'column'} bgColor={color.greyCard} alignItems={'start'} width={'90%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} py={'1rem'}>
            <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>My Profile</Heading>
            <Box width={'90%'} marginX={'auto'} height={'42%'} mb={'1rem'}>
                <Image src={profileData?.photo_profile} width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'} />
                <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={profileData?.photo_profile} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${color.greyCard}`} />

                <Button onClick={onOpen} colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'16rem'} borderRadius={'14px'}>Edit Profile</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalContent bgColor={color.greyCard} maxWidth={'720px'} borderRadius={'12px'} px={'1.5rem'} py={'1rem'} mt={'2rem'}>
                            <ModalHeader color={'white'}>Edit Profile</ModalHeader>
                            <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                            <ModalBody>
                                <Flex flexDirection={'column'}>
                                    <Box width={'100%'} marginX={'auto'} height={'60%'} mb={'0.5rem'}>
                                        <Image src={photoPreview && photoPreview} width={'720px'} height={'120px'} objectFit={'cover'} borderRadius={'12px'} />
                                        <Box sx={{
                                            '.container': {
                                                position: 'relative',
                                                width: '72px',
                                                height: '72px',
                                                top: '-2rem',
                                                left: '1rem',
                                                zIndex: '4',
                                            },
                                            '.image': {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                border: `4px solid #262626`,
                                                borderRadius: '50%'
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
                                                borderRadius: '50%'
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
                                                <Image src={photoPreview && photoPreview} alt="Avatar" className="image" />
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
                                                        icon={<BsImage className="icon-image" />}
                                                        marginEnd="0.5rem"
                                                        cursor="pointer"
                                                        className="icon"
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* <Button borderRadius={'50%'} _hover={{bgImage: `url(${photoPreview})`, bgColor: "white" }} width={'72px'} height={'72px'} bgSize={'cover'} bgPosition={'center'} bgImage={photoPreview && photoPreview} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${color.greyCard}`}><BsImage opacity={0} className=".image-icon"></BsImage></Button>  */}
                                        <Text color={"error.primary"}>{errors.photo_profile && errors.photo_profile.message}</Text>
                                    </Box>
                                    <FormControl display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'start'} marginBottom={'0.33rem'} color={'white'}>
                                        <Box mb={'1rem'} width={'100%'} border={`1px solid ${color.grey}`} p={'0.33rem'} borderRadius={'12px'}>
                                            <FormHelperText fontSize={'0.75rem'} color={color.grey} ms={'1rem'}>Name</FormHelperText>
                                            <Input border={'none'} type='text' placeholder="John Doe" {...register("full_name", { required: true })} isRequired defaultValue={profileData?.full_name} />
                                        </Box>
                                        <Box mb={'1rem'} width={'100%'} border={`1px solid ${color.grey}`} p={'0.33rem'} borderRadius={'12px'}>
                                            <FormHelperText fontSize={'0.75rem'} color={color.grey} ms={'1rem'}>Username</FormHelperText>
                                            <Input border={'none'} type='text' placeholder="@john_doe" {...register("username", { required: true })} defaultValue={profileData?.username} isRequired />
                                        </Box>
                                        <Box width={'100%'} border={`1px solid ${color.grey}`} p={'0.33rem'} borderRadius={'12px'}>
                                            <FormHelperText fontSize={'0.75rem'} color={color.grey} ms={'1rem'}>Bio</FormHelperText>
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
                                <Button isDisabled={!!(errors.full_name?.message || errors.username?.message || errors.photo_profile?.message || isSubmitting)} colorScheme="green" size={'md'} type="submit" borderRadius={'20px'} width={'72px'}>{isSubmitting ? <Spinner /> : "Save"}</Button>

                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>
            </Box>
            <Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
                <Heading as={'h3'} size={'md'} color={'whitesmoke'}>{profileData?.full_name}</Heading>
                <Text fontSize={'1rem'} color={color.grey}>{profileData?.username}</Text>
                <Text color={'white'}>{profileData?.bio}</Text>
            </Flex>
            <Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
                <Text fontWeight={'bold'}>{profileData?.follower}</Text>
                <Text me={'0.33rem'} color={color.grey}>Following</Text>
                <Text fontWeight={'bold'}>{profileData?.following}</Text>
                <Text color={color.grey}>Followers</Text>
            </Flex>
        </Flex>


    useEffect(() => {
        async function fetchSuggested() {
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `${api}/suggested`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            })
            setSuggested(response.data);
            setFollow(response.data.map((data: any) => {
                return data["isFollowed"];
            }))
        }
        fetchSuggested();
    }, [])

    const suggestedData = getSuggested.map((item, index) => {
        return (
            <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'} key={index}>
                <Flex>
                    <Link to={"/otherprofile/" + item.id}><Box >
                        {f.imageCircle(item && item.photo_profile, '40px')}
                    </Box>
                    </Link>
                    <Flex flexDirection={'column'} ms={'1rem'}>
                        <Text color={'white'}>{item && item.full_name}</Text>
                        <Text fontSize={'1rem'} color='circle.grey'>{item && item.username}</Text>
                    </Flex>
                </Flex>
                {!isFollowed[index] ? <Button onClick={() => handleFollow(item.id, index)} justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'} borderRadius={'14px'}>Follow</Button> : <Button onClick={() => handleUnfollow(item.id, index)} justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'} borderRadius={'14px'}>Following</Button>}
            </Flex>
        )
    })

    const suggested =
        <Flex flexDirection={'column'} bgColor={color.greyCard} width={'90%'} pt={'1rem'} borderRadius={'14px'}>
            <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>Suggested For You</Heading>
            <Flex flexDirection={'column'} marginStart={'1.33rem'} mt={'1rem'}>
                {suggestedData}
            </Flex>
        </Flex>

    const watermark =
        <Flex flexDirection={'column'} bgColor={color.greyCard} width={'90%'} py={'1rem'} borderRadius={'14px'}>
            <Flex ms={'1.33rem'} alignItems={'center'} mb={'0.2rem'}>
                <Flex alignItems={'center'} me={'0.3rem'}>
                    <Text fontSize={'0.9rem'} color={'white'} me={'0.2rem'}>Developed By</Text>
                    <Text fontSize={'0.9rem'} color={'white'} fontWeight={'bold'} me={'0.3rem'}>Irham Rahmat S</Text>
                    <Text fontSize={'0.9rem'} color={color.grey}>•</Text>
                </Flex>
                <Flex gap={'0.5rem'}>
                    <ChakraLink _hover={{ color: "whitesmoke" }} href="https://github.com/bagushendrawan" fontSize={'0.9rem'} color={color.grey}><BsGithub></BsGithub></ChakraLink>
                    <ChakraLink _hover={{ color: "whitesmoke" }} href="https://www.linkedin.com/in/bagus-hendrawan/" fontSize={'0.9rem'} color={color.grey}><BsLinkedin></BsLinkedin></ChakraLink>
                    <ChakraLink _hover={{ color: "whitesmoke" }} href="https://web.facebook.com/profile.php?id=100011604010888" fontSize={'0.9rem'} color={color.grey}><BsFacebook></BsFacebook></ChakraLink>
                    <ChakraLink _hover={{ color: "whitesmoke" }} href="https://www.instagram.com/bag_user/" fontSize={'0.9rem'} color={color.grey}><BsInstagram></BsInstagram></ChakraLink>
                </Flex>
            </Flex>
            <Flex ms={'1.33rem'} alignItems={'center'}>
                <HStack>
                    <Text fontSize={'0.7rem'} color={color.grey}>Powered by </Text>
                    <Image src="/Red.svg"></Image>
                    <Text fontSize={'0.7rem'} color={color.grey}>DumbWays Indonesia • </Text>
                </HStack>
                <ChakraLink fontSize={'0.7rem'} color={color.grey} href="https://dumbways.id/">#1 Coding Bootcamp</ChakraLink>
            </Flex>
        </Flex>

    return (
        <Flex flexDirection={'column'} gap={'1rem'} alignItems={'center'} width={'30%'} borderStart={'1px solid rgb(110, 110, 110, 0.333)'} marginStart={'2rem'} marginTop={'2rem'}>
            {profile}
            {suggested}
            {watermark}
        </Flex>
    )
}
