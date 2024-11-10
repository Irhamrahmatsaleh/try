import { following } from "@/libs/type";
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { api } from "../libs/api";
import f from './function';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface FollowTabComponentProps {
    // Define any props if necessary
}

async function fetchFollowedUser(){
    const token = localStorage.getItem('token');
    const response = await Axios({
        method: "get",
        url: `${api}/following`,
        headers: { 
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
         },
    })
    return response.data;
}

const FollowTabComponent: React.FC<FollowTabComponentProps> = () => {
    const [isFollowed, setFollow] = useState<boolean[]>([]);

    const [followers, setFollowers] = useState<following[]>([]);
    const [followeds, setFolloweds] = useState<following[]>([]);

    const { refetch } = useQuery<following>({
        queryKey: ["following"],
        queryFn: fetchFollowedUser,
    });

    

    useEffect (() => {
        async function fetchFollower(){
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `${api}/follower`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                 },
            })
            setFollowers(response.data);
        }

        fetchFollower();


        async function fetchFollowed(){
            const token = localStorage.getItem('token');
            const response = await Axios({
                method: "get",
                url: `${api}/following`,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                 },
            })
            setFolloweds(response.data);
        }
        fetchFollowed();
    },[setFollowers, setFolloweds] )
    
    //turn this into an array
    async function fetchFollower(){
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/follower`,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
             },
        })
        setFollowers(response.data);
    }

    async function fetchFollowed(){
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: "get",
            url: `${api}/following`,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
             },
        })
        setFolloweds(response.data);
    }

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
            refetch();
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
        refetch();
        };

    const followerData =  followers.map((item,index) => {
            return (
                <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'} key={index}>
                <Flex>
                <Link to={"/otherprofile/" + item.follower.id}>
                <Box>
                {f.imageCircle(item && item.follower.photo_profile, '40px')}
                </Box>
                </Link>
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'}>{item && item.follower.full_name}</Text>
                <Text fontSize={'1rem'} color='color.grey'>{item && item.follower.username}</Text>
                </Flex>
            </Flex>
            <Button onClick={() => handleFollow(item.id, index)} justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'white'}  borderRadius={'14px'}>Follow</Button>
            </Flex>
            )
        })


    
    const followingData =  followeds.map((item,index) => {
            return (
                <Flex alignItems={'center'} justifyContent={'space-between'} width={'90%'} mb={'1rem'} key={index}>
                <Flex>
                <Link to={"/otherprofile/" + item.followed.id}>
                <Box>
                {f.imageCircle(item && item.followed.photo_profile, '40px')}
                </Box>
                </Link>
                <Flex flexDirection={'column'} ms={'1rem'}>
                <Text color={'white'}>{item && item.followed.full_name}</Text>
                <Text fontSize={'1rem'} color='color.grey'>{item && item.followed.username}</Text>
                </Flex>
                </Flex>
                <Button onClick={() => handleUnfollow(item.id, index)} justifySelf={'end'} colorScheme='gray' size={'sm'} variant='outline' color={'gray'} borderColor={'gray'}  borderRadius={'14px'}>Following</Button>
                </Flex>
            )
        })
    

    return (
        <Tabs isFitted color={'white'} mt={'2rem'} colorScheme="green">
            <TabList>
                <Tab onClick={fetchFollower}>Followers</Tab>
                <Tab onClick={fetchFollowed}>Following</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                {followerData}
                </TabPanel>

                <TabPanel>
                {followingData}
                </TabPanel>

            </TabPanels>
        </Tabs>
    );
};

export default FollowTabComponent;