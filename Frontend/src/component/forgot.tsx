import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Text } from "@chakra-ui/react";

export default function forgot()
{
    const color = {
        grey: '#909090',
        greyCard: '#262626'
    }

    const forgot = 
    <Flex flexDirection={'column'} bgColor={color.greyCard} maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'2rem'}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Forgot Password</Text>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Email address</FormLabel>
            <Input type='email' placeholder="example@example.com" isRequired/>
            </Box>

            <Button colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'}>Send Instruction</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Already have account?</Text>
            <Link color={'teal'}>Login</Link>
            </HStack>

        </FormControl>
    </Flex>

    const resetPassword =
    <Flex flexDirection={'column'} bgColor={color.greyCard} maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'2rem'}>
    <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
    <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Reset Password</Text>
    <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box my={'1rem'} width={'100%'}>
        <FormLabel color={'white'}>New Password</FormLabel>
        <Input type='password' isRequired/>
        </Box>
        <Box mb={'1rem'} width={'100%'}>
        <FormLabel color={'white'}>Confirm New Password</FormLabel>
        <Input type='password' isRequired/>
        </Box>
        <Button colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'}>Create New Password</Button>
    </FormControl>
    </Flex>

    return (
        <>
        {forgot}
        {resetPassword}
        </>
    )
}