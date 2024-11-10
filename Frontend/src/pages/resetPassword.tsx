import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Spinner, Text } from "@chakra-ui/react";
import { useResetForm } from "../features/hooks/authReset";

export default function resetPassword()
{
    const { handleSubmit, watch, onSubmit, register, errors, isSubmitting } = useResetForm();
    const watchFields = watch();
    return (
        <Box width={"100%"} height={"733px"} bg="circle.greyBg" position={"absolute"}>
        <Flex flexDirection={'column'} bg="circle.greyCard" maxWidth={'720px'} borderRadius={'12px'} px={'2rem'} py={'1.5rem'} mt={'6rem'} mx={"auto"}>
        <Heading as={'h2'} size={'xl'} marginBottom={'0.33rem'} color={'lime'}>Circle</Heading>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} color={'white'}>Reset Your Password</Text>

        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} color={'white'}>
            <Box my={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>New Password</FormLabel>
            <Input type='password' {...register("password")}/>
            <Text color={"error.primary"}>{errors.password && errors.password.message}</Text>
            </Box>
            <Box mb={'1rem'} width={'100%'}>
            <FormLabel color={'white'}>Confirm Password</FormLabel>
            <Input type='password' isRequired {...register("c_password", {required: true, validate: (value) => value === watchFields.password || 'Password does not match' })}/>
            <Text color={"error.primary"}>{errors.c_password?.message}</Text>
            </Box>
            <Button isDisabled={!!(errors.c_password?.message || isSubmitting)} colorScheme='green' variant='solid' width={'100%'} borderRadius={'20px'} marginTop={'1rem'} type="submit">{isSubmitting ? <Spinner/> : "Change Password"}</Button>
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