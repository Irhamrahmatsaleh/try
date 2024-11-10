import { Flex } from "@chakra-ui/react";
import Profile from "../component/profileCard";
import Sidebar, { sideButton } from "../component/sidebar";
import Threads from "../component/threads";

export default function home ()
{
    const bgColor = '#1D1D1D'
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.home)}
        <Flex flexDirection={'column'} width={'40%'}>
        <Threads />
        </Flex>
        <Profile />
        </Flex>
    )
}