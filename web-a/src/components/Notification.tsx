import { Alert, Snackbar } from "@mui/material";
import type { Notice } from "../../pages/auth/login";

interface Notices extends Notice {
    handleClose?: any;
}
export default function Notification({ open, message, handleClose}: Notices) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity='error'
                sx={{
                    bgcolor: '#d64933',
                    color: '#fff'
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}