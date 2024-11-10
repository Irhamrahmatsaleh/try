import { Box, Button, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../libs/api";
import { editProfileForm } from "../libs/type";
import { useEffect, useState } from "react";

export async function fetchOtherProfile(id : string | undefined){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/user${id}`,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
             },
        })
    return response.data;
    } catch(error){
        return error;
    }
}

export default function otherProfileUser(){
    const {id} = useParams();
    const [followed, setFollowed] = useState<boolean>(false);
    const { data: otherProfile  } = useQuery<editProfileForm>({
        queryKey: ["otherProfile"],
        queryFn: () => fetchOtherProfile(id),
        });
    
    const otherID : any = otherProfile?.id ? otherProfile.id : "null";

    useEffect (() => {
        async function fetchSuggested(){
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `${api}/user${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                 },
            })
            setFollowed(response.data["isFollowed"])
        }
        fetchSuggested();
    },[])

    const handleFollow = async (id : number) => {
        setFollowed(true);
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
            setFollowed(false);
        }
        };

    const handleUnfollow = async (id : number) => {
        setFollowed(false);
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
            setFollowed(true);
        }
        };

    return (
        <Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} height={'45%'} pt={'1rem'} mt={'2rem'} mx={'auto'}>
        <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>{otherProfile?.full_name}</Heading>
            <Box width={'90%'} marginX={'auto'} height={'42%'}>
                <Image src={otherProfile?.photo_profile} width={'720px'} height={'80px'} objectFit={'cover'} borderRadius={'12px'}/>
                <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={otherProfile?.photo_profile} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${'circle.greyCard'}`}/>
                <Flex justifyContent={'end'} zIndex={4} position={'relative'} top={'-2rem'}>
                {!followed ? <Button onClick={() => handleFollow(otherID)} alignSelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button> : <Button onClick={() => handleUnfollow(otherID)} alignSelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>}
                </Flex>
            </Box>
            <Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
                <Heading as={'h3'} size={'md'} color={'whitesmoke'}>{otherProfile?.full_name}</Heading>
                <Text fontSize={'1rem'} color={'circle.grey'}>{otherProfile?.username}</Text>
                <Text color={'white'}>{otherProfile?.bio}</Text>
            </Flex>
            <Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
                <Text fontWeight={'bold'}>{otherProfile?.follower}</Text>
                <Text me={'0.33rem'} color={'circle.grey'}>Following</Text>
                <Text fontWeight={'bold'}>{otherProfile?.following}</Text>
                <Text color={'circle.grey'}>Followers</Text>
            </Flex>
        <Divider orientation='horizontal' borderColor={'rgb(110, 110, 110, 0.333)'} mt={'1rem'}/>
        </Flex>
    )
}