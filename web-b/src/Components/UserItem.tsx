import { Box, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { User } from '../../redux/slices/userSlice';
import DeleteModal from "./DeleteModal";



export default function UserItem({ user } : { user : User }) {
    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            paddingY='0.5rem'
        >
            <Typography
                variant='h5'
                alignItems='center'
            >
                {
                    user.role === 1
                    ? <StarBorderIcon fontSize='small' />
                    : ''
                }
                { user.name }
            </Typography>
            <DeleteModal user={user} />
        </Box>
    )
}