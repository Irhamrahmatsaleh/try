import { Flex } from "@chakra-ui/react";
import FollowComponent from "../component/followingTab";
import ProfileCard from "../component/profileCard";
import Sidebar, { sideButton } from "../component/sidebar";

export default function followTab()
{
    return (

        <Flex justifyContent={'start'} bg='circle.followBg' maxHeight={'733px'}>
        {Sidebar(sideButton.follow)}
        <Flex flexDirection={'column'} width={'40%'}>
        <FollowComponent />
        </Flex>
        <ProfileCard />
        </Flex>
        
    )
}