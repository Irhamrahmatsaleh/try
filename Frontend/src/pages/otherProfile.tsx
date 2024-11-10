import { Flex } from "@chakra-ui/react";
import OtherThreadsProfile from '../component/otherProfileThreads';
import OtherProfile from '../component/otherProfileUser';
import Profile from "../component/profileCard";
import Sidebar, { sideButton } from "../component/sidebar";

export default function otherProfile()
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
        <OtherProfile/>
        <OtherThreadsProfile />
        </Flex>
        </Flex>
        <Profile />
        </Flex>
    )
}