import { Box, Flex, FormControl, FormHelperText, Image, Input, Textarea } from "@chakra-ui/react";

const color = {
    grey: '#909090',
    greyCard: '#262626'
}

const editProfileCard =
<Flex flexDirection={'column'}>
    <Box width={'100%'} marginX={'auto'} height={'60%'} mb={'0.5rem'}>
    <Image src="https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={'720px'} height={'120px'} objectFit={'cover'} borderRadius={'12px'}/>
    <Image borderRadius={'50%'} width={'72px'} height={'72px'} objectFit={'cover'} src={'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid ${color.greyCard}`}/>
    </Box>
    <FormControl display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'start'} marginBottom={'0.33rem'} color={'white'}>
        <Box mb={'1rem'} width={'100%'} border={`1px solid ${color.grey}`} p={'0.33rem'} borderRadius={'12px'}>
        <FormHelperText fontSize={'0.75rem'} color={color.grey} ms={'1rem'}>Name</FormHelperText>
        <Input border={'none'} type='text' placeholder="John Doe" isRequired/>
        </Box>
        <Box mb={'1rem'} width={'100%'} border={`1px solid ${color.grey}`} p={'0.33rem'} borderRadius={'12px'}>
        <FormHelperText fontSize={'0.75rem'} color={color.grey} ms={'1rem'}>Username</FormHelperText>
        <Input border={'none'} type='text' placeholder="@john_doe" isRequired/>
        </Box>
        <Box width={'100%'} border={`1px solid ${color.grey}`} p={'0.33rem'} borderRadius={'12px'}>
        <FormHelperText fontSize={'0.75rem'} color={color.grey} ms={'1rem'}>Bio</FormHelperText>
        <Textarea width={'100%'} minHeight={'80px'} border={'none'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'}></Textarea>
        </Box>
    </FormControl>
</Flex>

function dateDifferences(timeStamp: Date) : string
{
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    const givenDate = new Date(timeStamp);
    const currentDate = new Date();
    //   console.log("Date ", currentDate);
    //   console.log("Given Date ", timeStamp);
    const differenceInMs = currentDate.getTime() - givenDate.getTime();

    const differenceInSec = Math.floor(differenceInMs/1000);
    const differenceInMin = Math.floor(differenceInSec/60);
    const differenceInHour = Math.floor(differenceInMin/60);
    const differenceInDays = Math.floor(differenceInHour/24);

    if(differenceInDays > 30)
        {
            const date = givenDate.getUTCDate();
            const month = givenDate.getUTCMonth();

            return date + " " + monthNames[month];
        }

    if(differenceInDays > 0)
        {
            return differenceInDays + "d";
        }
    
    if(differenceInHour > 0)
        {
            return differenceInHour + "h";
        }

    if(differenceInMin > 0)
        {
            return differenceInMin + "m";
        }
    
        return differenceInSec + "s";
}

function imageCircle(img : string, size : string, mt? : string)
{
    return <Image 
    borderRadius={'50%'}
    width={size}
    height={size}
    objectFit={'cover'}
    src={img}
    mt={mt}/>
}

function imageMessage(img : string)
{
    return <Image 
    width={'420px'}
    borderRadius={'4px'}
    src={img}/>
}

function timeString(timeStamp : Date){
    const date = new Date(timeStamp);
    const timeOnly = date.toLocaleString([], { hour:'2-digit', minute:'2-digit', hour12:true });
    return timeOnly;
}

function dateString(timeStamp : Date){
    const date = new Date(timeStamp);
    const timeOnly = date.toLocaleString([], { day:'2-digit', month:'long', year:'numeric'});
    return timeOnly;
}

export default {dateDifferences, imageCircle, imageMessage, editProfileCard, timeString, dateString}
