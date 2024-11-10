import { thread } from "@/libs/type";
import { Box, Link as ChakraLink, Flex, Heading, IconButton, Image, LinkBox, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import { BsHeart, BsHeartFill, BsThreeDots, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { api } from "../libs/api";
import f from './function';
import { ThreadsUpload } from "./threadsform";

export async function fetchThreads(){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/thread`,
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

export async function fetchUserThreads(id : number){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/threadProfile${id}`,
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

export async function deleteThread(id : number){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "delete",
            url: `${api}/thread${id}`,
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

export async function setLike(id : number){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/like${id}`,
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

export default function Threads(){
    const toast = useToast();
    const { data: threads, refetch } = useQuery<thread[]>({
        queryKey: ["threads"],
        queryFn: fetchThreads
        });

    const [isLiked, setIsLiked] = useState<boolean[]>([]);
    const handleLike = async (id : number, index : number) => {
            likeHandle(index, true);
            try {
                const token = localStorage.getItem('token');
                await Axios({
                    method: "get",
                    url: `${api}/like${id}`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    },
                });
            } catch (error) {
                console.error('Error liking the item', error);
                likeHandle(index, false);
            }
            refetch();
            };

    const handleUnlike = async (id : number, index : number) => {
        likeHandle(index, false);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/unlike${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Error unliking the item', error);
            likeHandle(index, true);
        }
        refetch();
        };

    const handleDelete = async (idThread : number) => {
        try {
            await deleteThread(idThread);
            toast({
                title: "Delete thread success!",
                status: "success",
                duration: 3000,
                isClosable: true,
                });
        } catch (error) {
            console.error('Error unliking the item', error);
            toast({
                title: "Delete thread failed!",
                status: "error",
                duration: 3000,
                isClosable: true,
                });
        }
        refetch();
        };
    

    useEffect(() => {
        async function fetchThreads(){
            try {
                const token = localStorage.getItem('token');
                const response= await Axios({
                    method: "get",
                    url: `${api}/thread`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                     },
                })
                setIsLiked(response.data.map((data : any) => {
                    return data["isliked"];
                }))
            } catch(error){
                return error;
            }
        }
        fetchThreads();
    }, [threads])

    const likeHandle = (index : number, con : boolean) => {
        const newLiked = [...isLiked];
        newLiked[index] = con;
        setIsLiked(newLiked);
    }

    const tabThreads = threads?.map((item, index) => {
            if(item.users == null)
                {
                    return;
                }
            let linkProfile : string = "";
            if(item.isUser) {
                linkProfile = "/profile"
            } else {
                linkProfile = "/otherprofile/" + item.users.id
            }
            return (
            <Flex alignItems={'start'} color={'white'} justifyContent={'space-between'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'} key={index}>
                <Flex alignItems={'start'}>
                <Link to={linkProfile}><Box  className="picture" >
                {f.imageCircle(item.users.photo_profile, '32px')}
                </Box>
                </Link>
                <Flex marginX={'1rem'} flexDirection={'column'} justifyContent={'start'} marginBottom={'0.5rem'}>
                    <Flex
                    fontSize={'small'}
                    color={'rgb(199, 199, 199)'}
                    marginEnd={'0.5rem'}
                    marginBottom={'0.33rem'}
                    gap={'0.33rem'} >
                        <Text fontWeight={'bold'} color={'white'}>
                        {item.users.full_name && item.users.full_name}
                        </Text>
                        <Text>
                        {item.users.username && item.users.username}
                        </Text>
                        <Text>
                        {f.dateDifferences(item.update_at)}
                        </Text>
                        <Text fontWeight={'bold'}>
                        {item.isUser && " - You"}
                        </Text>
                    </Flex>

                    <Box marginBottom={'0.5rem'}>
                        <Text marginBottom={'0.33rem'}>
                        {item.content}
                        </Text>
                        {item.image ? (f.imageMessage(item.image)) : <></>}
                    </Box>

                    <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                    {isLiked[index] ? 
                    <ChakraLink onClick={() => handleUnlike(item.id, index)}> <BsHeartFill /> </ChakraLink> : <ChakraLink onClick={() => handleLike(item.id, index)}> <BsHeart /> </ChakraLink>}
                    <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.likes.length}</Text>
                    <LinkBox>
                    <Link to={`/threads/${item.id}`}><Box>{item.isReplied ? <BiSolidMessage /> : <BiMessage />}</Box></Link>
                    </LinkBox>
                    <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.number_of_replies} Replies</Text>
                    </Flex>
                </Flex>
                </Flex>
                <Box>
                {item.isUser && 
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<BsThreeDots />}
                        colorScheme="black"
                        variant=''
                    />
                    <MenuList color={'black'}>
                        <MenuItem onClick={() => handleDelete(item.id)} icon={<BsTrash />}>
                        Delete Threads
                        </MenuItem>
                    </MenuList>
                </Menu>}
                </Box>
            </Flex>
            )
        })

    const tabImage = threads?.map((item, index) => {
        return (
            <Image src={item.image} my={'0.33rem'} height={'auto'} key={index}/>
        )
    })
    
    return(
        <Box>
        <Heading as={'h3'} fontSize={'1.5rem'} mt={'2rem'} mb={'1rem'} color={'whitesmoke'}>Home</Heading>
        <Tabs isFitted colorScheme="green">
                <TabList mb='1rem' color={'white'}>
                    <Tab>Threads</Tab>
                    <Tab>Media</Tab>
                </TabList>
                <ThreadsUpload />
                <Flex flexDirection={'column'} justifyContent={'start'} height={'480px'} overflowY="scroll" overflowX="hidden" css={{
                        '::-webkit-scrollbar': {
                        display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                    }}>
                <TabPanels>
                    <TabPanel>
                    {tabThreads}
                    </TabPanel>
                    <TabPanel>
                    {tabImage}
                    </TabPanel>
                </TabPanels>
                </Flex>
                </Tabs>
        </Box>
    )
}