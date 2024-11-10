import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
    colors: {
        circle: {
            grey: '#909090',
            greyCard: '#262626',
            greyBg: '#444444',
            followBg: '#1D1D1D'
        },
        error: {
            primary: '#FF0000'
        }
    },
  })

  export default theme;
