
import { Box, Link as ChakraLink, Flex, HStack, IconButton, LinkBox, LinkOverlay, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react';
import Axios from 'axios';
import { useEffect, useState } from "react";
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import { BsArrowLeft, BsDot, BsHeart, BsHeartFill, BsThreeDots, BsTrash } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReplieChildrenform } from '../features/hooks/authRepliesChildrenForm';
import { useRepliesParentform } from '../features/hooks/authRepliesParent';
import { api } from "../libs/api";
import f from './function';
import Profile from "./profileCard";
import { deleteReply } from "./replies";
import { RepliesFormChild } from "./repliesFormChild";
import Sidebar, { sideButton } from "./sidebar";


export async function fetchRepliesParent(id : string | undefined){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/singlereplies${id}`,
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

export async function fetchRepliesChildren(id : string | undefined){
    try {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/childrenreplies${id}`,
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


export default function RepliesChildren(){
    const toast = useToast();
    const navigate = useNavigate();
    const {id} = useParams();
    const [likedStates, setLikedStates] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean[]>([]);
    const {repliesChildren, refetchChildrenReplies} = useReplieChildrenform();
    const {repliesParent, refetchParent} = useRepliesParentform();


    const handleLikeThreads = async (id : number | undefined) => {
        setLikedStates(true);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/lreplies${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            setLikedStates(false);
        }
        refetchParent();
        };

    const handleUnlikeThreads = async (id : number | undefined) => {
            setLikedStates(false);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/ulreplies${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            setLikedStates(true);
        }
        refetchParent();
        };

    useEffect(() => {
        async function fetchThreadsEffect(){
            try {
                const token = localStorage.getItem('token');
                const response = await Axios({
                    method: "get",
                    url: `${api}/singlereplies${id}`,
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                        },
                })
                setLikedStates(response.data['isLiked']);
            } catch(error){
                return error;
            }
        }
        fetchThreadsEffect();
    }, [likedStates]);

    const handleLike = async (id : number, index : number) => {
        likeHandle(index, true);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/lreplies${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Error liking the item', error);
            likeHandle(index, false);
        }
        refetchChildrenReplies();
        };

    const handleUnlike = async (id : number, index : number) => {
        likeHandle(index, false);
        try {
            const token = localStorage.getItem('token');
            await Axios({
                method: "get",
                url: `${api}/ulreplies${id}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error('Error unliking the item', error);
            likeHandle(index, true);
        }
        refetchChildrenReplies();
        };

    const handleDelete = async (idThread : number) => {
        try {
            await deleteReply(idThread);
            toast({
                title: "Delete reply success!",
                status: "success",
                duration: 3000,
                isClosable: true,
                });
        } catch (error) {
            console.error('Delete reply the item', error);
            toast({
                title: "Delete reply failed!",
                status: "error",
                duration: 3000,
                isClosable: true,
                });
        }
        refetchChildrenReplies();
        refetchParent();
        };

        useEffect(() => {
            async function fetchRepliesList(){
                try {
                    const token = localStorage.getItem('token');
                    const response= await Axios({
                        method: "get",
                        url: `${api}/childrenreplies${id}`,
                        headers: { 
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${token}`
                         },
                    })
                    setIsLiked(response.data.map((data : any) => {
                        return data["isLiked"];
                    }))
                } catch(error){
                    return error;
                }
            }
            fetchRepliesList();
        }, [repliesChildren])

        // useEffect(() => {
        //    const response = refetchChildrenReplies();
        //     // setIsLiked(response.data.map((data : any) => {
        //     //     return data["isLiked"];
        //     // }))
        //     console.log("REFECCTH", response)
        // }, [repliesChildren])
    
        const likeHandle = (index : number, con : boolean) => {
            const newLiked = [...isLiked];
            newLiked[index] = con;
            setIsLiked(newLiked);
        }

        let linkParent = "#";
        if(repliesParent?.isUser) {
            linkParent = "/profile"
        } else {
           linkParent = "/otherprofile/" + repliesParent?.users.id
        }

    const replied =
            <Flex alignItems={'start'} color={'white'} borderBottom={'1px solid rgb(110, 110, 110, 0.333)'} marginTop={'1rem'}>
            <Link to={linkParent}>
            <Box className="picture" >
            {f.imageCircle(repliesParent ? repliesParent?.users.photo_profile : "null", '32px')}
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
                    {repliesParent?.users.full_name ? repliesParent?.users.full_name : 'null'}
                    </Text>
                    <Text>
                    {repliesParent?.users.username ? repliesParent?.users.username : 'null'}
                    </Text>
                </Flex>
                <Box marginBottom={'0.5rem'}>
                    <Text marginBottom={'0.33rem'}>
                    {repliesParent?.content}
                    </Text>
                    {repliesParent?.image ? (f.imageMessage(repliesParent?.image)) : <></>}
                </Box>
                <HStack fontSize={'0.75rem'} color={'circle.grey'} mt={'0.33rem'} mb={'0.5rem'}>
                <Text>
                    { repliesParent && f.timeString(repliesParent.updated_at)}
                </Text>
                <BsDot></BsDot>
                <Text>
                    { repliesParent && f.dateString(repliesParent.updated_at)}
                </Text>
                </HStack>

                <Flex gap={'0.33rem'} marginBottom={'0.5rem'} alignItems={'center'}>
                {likedStates ? 
                    <ChakraLink onClick={() => handleUnlikeThreads(repliesParent?.id)}> <BsHeartFill /> </ChakraLink> : <ChakraLink onClick={() => handleLikeThreads(repliesParent?.id)}> <BsHeart /> </ChakraLink>}
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{repliesParent?.likesreplies.length}</Text>
                <LinkBox>
                <LinkOverlay href={`/replies/${id}`}><Box>{repliesParent?.isReplied ? <BiSolidMessage /> : <BiMessage />}</Box></LinkOverlay>
                </LinkBox>
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{repliesParent?.repliesCount} Replies</Text>
                </Flex>
            </Flex>
        </Flex>


    const repliedList = repliesChildren?.map((item, index) => {
        
        // const likeIcon = <Link onClick={() => {repliesLikeHandle(index);}}> {repliesLiked[index] ? <BsHeartFill/> : <BsHeart/>} </Link>
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

        let isAuthor = false;
        if(item.created_by === repliesParent?.created_by) isAuthor = true;
        return (
        <Flex alignItems={'start'} justifyContent={'space-between'} color={'white'} marginTop={'1rem'} key={index}>
            <Flex alignItems={'start'}>
                <Link to={linkProfile}>
            <Box as='a' href={linkProfile} className="picture" >
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
                    {f.dateDifferences(item.updated_at)}
                    </Text>
                    <Text fontWeight={'bold'}>
                        {item.isUser && " - You"} {isAuthor && " - Author"}
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
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.likesCount}</Text>
                <LinkBox>
                <Link to={`/replies/${item.id}`}><Box>{item.isReplied ? <BiSolidMessage /> : <BiMessage />}</Box></Link>
                </LinkBox>
                <Text marginEnd={'0.5rem'} color={'rgb(160, 160, 160)'} fontSize={'small'}>{item.repliesCount} Replies</Text>
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
                        Delete Replies
                        </MenuItem>
                    </MenuList>
                </Menu>}
                </Box>
        </Flex>
        )
    })


    const bgColor = '#1D1D1D';
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.home)}
        <Flex flexDirection={'column'} width={'40%'}>
        <Flex flexDirection={'column'} justifyContent={'start'} height={'720px'} overflowY="scroll" overflowX="hidden" css={{
                        '::-webkit-scrollbar': {
                        display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                    }}>
            <HStack color={'white'} mt={'2rem'}>
            <IconButton as={ChakraLink} variant={"none"} colorScheme="teal" color={'white'} _hover={{color: "green", fontSize: "1.5rem"}} onClick={() => {navigate(-1)}} aria-label='Back Navigate' fontSize={'1.33rem'} icon={<BsArrowLeft />} />
                <Text fontSize={'1.33rem'}>Status Reply</Text>
            </HStack>
        {replied}
        <RepliesFormChild />
        {repliedList}
        </Flex>
        </Flex>
        <Profile />
        </Flex>
    )
}