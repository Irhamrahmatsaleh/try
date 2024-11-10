import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Spinner, Text } from "@chakra-ui/react";
import { usePasswordForm } from "../features/hooks/authPassword";

export default function forgotPassword()
{
    const { handleSubmit, onSubmit, register, errors, isSubmitting } = usePasswordForm();
   
    return (
        <Box width={"100%"} height={"733px"} bg="circle.greyBg" position={"absolute"}>
        <Flex flexDirection={'column'} bg="circle.greyCard" maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={"auto"}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Forgot Password</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Account Email address</FormLabel>
            <Input type='email' placeholder="example@example.com" {...register("email", {required: true})}/>
            <Text color={"error.primary"}>{errors.email?.message}</Text>
            </Box>
            <Button isDisabled={!!(errors.email?.message || isSubmitting)} colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">{isSubmitting ? <Spinner/> : "Send Email"}</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Already Remembered?</Text>
            <Link href="/login" color={'teal'}>Login</Link>
            </HStack>
        </FormControl>
        </form>
        </Flex>
        </Box>
    )
}