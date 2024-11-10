import { Box, Button, Flex, FlexProps, FormControl, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { useDebounce } from 'use-debounce';
import f from '../component/function';
import Profile from "../component/profileCard";
import Sidebar, { sideButton } from "../component/sidebar";
import { api } from "../libs/api";
import { users } from "../libs/type";
import { Link } from "react-router-dom";

export default function search() {
    const [searchedUsers, setSearchedUsers] = useState<users[]>([]);
    const [prompt, setPrompt] = useState<string>('');
    const [fetchDebounce] = useDebounce(prompt, 300);
    const [isFollowed, setFollow] = useState<boolean[]>([]);

    useEffect(() => {
        fetchUsers(fetchDebounce);
    }, [fetchDebounce])

    async function fetchUsers(prompt : string){
        try {
            if(prompt === '') {
                return <></>
            }
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `${api}/search?search=${prompt}`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                 },
            })
            setSearchedUsers(response.data);
            setFollow(response.data.map((data : any) => {
                return data["isFollowed"];
            }))
        } catch(error) {
            return error;
        }
    }
    const color = {
        grey: '#909090',
        greyCard: '#262626'
    }
    
    const bgColor = '#1D1D1D'

    const followHandle = (index : number, con : boolean) => {
        const newFollowed = [...isFollowed];
        newFollowed[index] = con;
        setFollow(newFollowed);
    }

    const handleFollow = async (id : number, index : number) => {
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

const handleUnfollow = async (id : number, index : number) => {
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

    const searchBar =
    <FormControl isRequired mt={'2rem'}>
    <InputGroup>
        <InputLeftElement pointerEvents='none' mx={'0.33rem'}>
            <BsPerson fontSize={'1.25rem'} color={color.grey} />
        </InputLeftElement>
        <Input color={'white'} placeholder='Search Your Friend' borderRadius={'20px'} onInput={(e) => {setPrompt((e.target as HTMLInputElement).value);}}/>
    </InputGroup>
    </FormControl>

    // const searchDefault =
    // <Flex height={'720px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
    // <Heading as={'h3'} size={'md'} mb={'0.33rem'} color={'whitesmoke'} fontWeight={'medium'}>Write and Search Something</Heading>
    // <Text fontSize={'1rem'} color={color.grey} width={'50%'} textAlign={'center'}>Try searching for something else or check the spelling of what you typed.</Text>
    // </Flex>

    function searchNotFound (user : string) {
        return <Flex height={'720px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Heading as={'h3'} size={'md'} mb={'0.33rem'} color={'whitesmoke'} fontWeight={'medium'}>No results for “{user}”</Heading>
        <Text fontSize={'1rem'} color={color.grey} width={'50%'} textAlign={'center'}>Try searching for something else or check the spelling of what you typed.</Text>
        </Flex>
    }

    // const searchFound =
    // <Flex flexDirection={'column'} width={'100%'} pt={'1rem'} borderRadius={'14px'} mx={'auto'} mt={'2rem'}>
    //     <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
    //         <Flex>
    //             {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
    //             <Flex flexDirection={'column'} ms={'1rem'}>
    //             <Text color={'white'} fontWeight={'bold'}>Bagus Hendrawan</Text>
    //             <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>@bag-user</Text>
    //             <Text color={'white'} fontSize={'0.95rem'}>Not all who wander are lost</Text>
    //             </Flex>
    //         </Flex>
    //         <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
    //     </Flex>
    //     <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
    //         <Flex>
    //             {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
    //             <Flex flexDirection={'column'} ms={'1rem'}>
    //             <Text color={'white'} fontWeight={'bold'}>Bagus Hendrawan</Text>
    //             <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>@bag-user</Text>
    //             <Text color={'white'} fontSize={'0.95rem'}>Not all who wander are lost</Text>
    //             </Flex>
    //         </Flex>
    //         <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>
    //     </Flex>
    //     <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
    //         <Flex>
    //             {f.imageCircle('https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '40px')}
    //             <Flex flexDirection={'column'} ms={'1rem'}>
    //             <Text color={'white'} fontWeight={'bold'}>Bagus Hendrawan</Text>
    //             <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>@bag-user</Text>
    //             <Text color={'white'} fontSize={'0.95rem'}>Not all who wander are lost</Text>
    //             </Flex>
    //         </Flex>
    //         <Button justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
    //     </Flex>
    // </Flex>

interface SearchedCardsProps extends FlexProps {
    user: users;
    index : number;
  }
  
function SearchedUsers({ user, index }: SearchedCardsProps) {
    return (
        <Flex alignItems={'center'} justifyContent={'space-between'} mb={'1rem'}>
            <Flex>
                <Link to={"/otherprofile/" + user.id}>
                <Box>
                {f.imageCircle(user.photo_profile, '40px')}
                </Box>
                </Link>
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'} fontWeight={'bold'}>{user.full_name}</Text>
                <Text fontSize={'1rem'} color={color.grey} mb={'0.2rem'}>{user.username}</Text>
                <Text color={'white'} fontSize={'0.95rem'}>{user.bio}</Text>
                </Flex>
            </Flex>
            {!isFollowed[index] ? <Button onClick={() => handleFollow(user.id, index)} justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button> : <Button onClick={() => handleUnfollow(user.id, index)} justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>}
        </Flex>
    );
  }


    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.search)}
        <Flex flexDirection={'column'} width={'40%'}>
        {searchBar}
        <Flex flexDirection={'column'} width={'100%'} pt={'1rem'} borderRadius={'14px'} mx={'auto'} mt={'2rem'}>
        {searchedUsers?.length  ? searchedUsers.map((user, index) => <SearchedUsers user={user} key={index} index={index}/>) : searchNotFound(prompt)}
            </Flex>
        </Flex>
        <Profile />
        </Flex>
    )
}