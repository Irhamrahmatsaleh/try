import { Flex } from "@chakra-ui/react";
import Profile from "../component/profileCard";
import ThreadsProfile from '../component/profileThreads';
import Sidebar, { sideButton } from "../component/sidebar";
import ProfileUser from '../component/profileUser'

export default function profile()
{
    const bgColor = '#1D1D1D'
    return (
        <Flex justifyContent={'start'} bg={bgColor} maxHeight={'733px'}>
        {Sidebar(sideButton.profile)}
        <Flex flexDirection={'column'} width={'40%'}>
        <Flex flexDirection={'column'} justifyContent={'start'} height={'720px'} overflowY="scroll" overflowX="hidden" css={{
                        '::-webkit-scrollbar': {
                        display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                    }}>
        <ProfileUser/>
        <ThreadsProfile />
        </Flex>
        </Flex>
        <Profile />
        </Flex>
    )
}