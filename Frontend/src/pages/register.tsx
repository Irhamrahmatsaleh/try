import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Spinner, Text } from "@chakra-ui/react";
import { useRegisterForm } from "../features/hooks/authRegister";

export default function register()
{
    const { handleSubmit, onSubmit, register, errors, isSubmitSuccessful, isSubmitting } = useRegisterForm();
   
    return (
        <Box width={"100%"} height={"733px"} bg="circle.greyBg" position={"absolute"}>
        <Flex flexDirection={'column'} bg="circle.greyCard" maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={"auto"}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Create account Circle</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Full Name</FormLabel>
            <Input type='text' placeholder="John Doe" isRequired {...register("full_name", {required: true})}/>
            <Text color={"error.primary"}>{errors.full_name?.message}</Text>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Email address</FormLabel>
            <Input type='email' placeholder="example@example.com" key={'email'} isRequired {...register("email", {required: true})}/>
            <Text color={"error.primary"}>{errors.email?.message}</Text>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input type='password' isRequired {...register("password", {required: true})}/>
            <Text color={"error.primary"}>{errors.password?.message}</Text>
            </Box>
            <Button isDisabled={!!(errors.email?.message || errors.password?.message || isSubmitting && !isSubmitSuccessful)} colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">{isSubmitting && !isSubmitSuccessful ? <Spinner/> : "Create Account"}</Button>
            <HStack alignSelf={'start'} mt={'0.5rem'}>
            <Text color={'white'} me={'0.33rem'}>Already have account?</Text>
            <Link href="/login" color={'teal'}>Login</Link>
            </HStack>
        </FormControl>
        </form>
        </Flex>
        </Box>
    )
}