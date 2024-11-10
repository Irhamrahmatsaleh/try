import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Spinner, Text } from "@chakra-ui/react";
import { useLoginForm } from "../features/hooks/authLogin";

export default function login()
{
    const { handleSubmit, onSubmit, register, errors, isSubmitting } = useLoginForm();
    return (
        <Box width={"100%"} height={"733px"} bgColor="circle.greyBg" position={"absolute"}>
        <Flex flexDirection={'column'} maxWidth={'720px'} bg="circle.greyCard" borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={'auto'}>
            <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
            <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Login to circle</Text>

            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
                <Box my={'1rem'} width={'100%'}>
                <FormLabel color={'white'}>Email address</FormLabel>
                <Input type='email' placeholder="example@example.com" isRequired {...register("email", {required: true})}/>
                <Text color={"error.primary"}>{errors.email?.message}</Text>
                </Box>
                <Box mb={'1rem'} width={'100%'}>
                <FormLabel color={'white'}>Password</FormLabel>
                <Input type='password' isRequired {...register("password", {required: true})}/>
                <Text color={"error.primary"}>{errors.password?.message}</Text>
                </Box>
                <Link href="/forgot-password" color={'white'} alignSelf={'end'}>Forgot Password?</Link>
                <Button isDisabled={!!(errors.email?.message || errors.password?.message || isSubmitting)} colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">{isSubmitting ? <Spinner/> : "Login"}</Button>
                <HStack alignSelf={'start'} mt={'0.5rem'}>
                <Text color={'white'} me={'0.33rem'}>Don't have an account yet?</Text>
                <Link href="/register"  color={'teal'}>Create Account</Link>
                </HStack>

            </FormControl>
            </form>
        </Flex>
        </Box>
    )
}