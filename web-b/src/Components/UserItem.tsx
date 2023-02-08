import { Box, Typography, useMediaQuery } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { User } from '../../redux/slices/userSlice';
import DeleteModal from "./DeleteModal";



export default function UserItem({ user } : { user : User }) {
    const W400 = useMediaQuery('(min-width:400px)');
    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            paddingY='0.5rem'
        >
            <Typography
                variant={W400 ? 'h5' : 'h6'}
                alignItems='center'
            >
                {
                    user.role === 1
                    ? <StarBorderIcon fontSize='inherit' />
                    : ''
                }
                { user.name }
            </Typography>
            <DeleteModal user={user} />
        </Box>
    )
}