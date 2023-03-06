import { Box, Link, Modal, Typography } from "@mui/material";
import { grey, red } from '@mui/material/colors';
import { useDispatch } from "react-redux";

interface Props {
    open: boolean;
    setOpen: any;
    total: number;
}

export default function DetailModal({ open, setOpen, total }: Props) {

    const handleClose = () => {
        setOpen(false);
    }



    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                padding='1rem'
                border='2px solid black'
                borderRadius='1rem'
                gap={3}
                bgcolor={`${grey[100]}`}
            >

                <Typography
                    variant="h5"
                >
                    El valor de su compra es de ${total}
                </Typography>
                <Link href={'/?status=approved'}
                    underline="none"
                    color='error'
                    sx={{
                        padding: '0.5rem',
                        border: `1px solid ${red.A400}`,
                        borderRadius: '0.5rem',
                        transition: 'all',
                        transitionDuration: '300ms',
                        '&:hover': {
                            color: '#fff',
                            background: `${red.A400}`
                        }

                    }}
                >
                    PAGAR
                </Link>




            </Box>
        </Modal>
    )
}