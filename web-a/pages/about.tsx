import Box from "@mui/material/Box";



export default function About () {
    return (
        <Box
            display='flex'
            alignItems='center'
            flexDirection='column'
        >
            <Box
                id='about'
                display='flex'
                alignItems='center'
                height='70vh'
            >
                ABOUT
            </Box>
            <Box
                id='contact'
                display='flex'
                alignItems='center'
                height='70vh'
            >
                Contact
            </Box>
        </Box>
    )
}