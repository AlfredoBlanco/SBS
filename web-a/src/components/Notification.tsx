import { Alert, Snackbar } from "@mui/material";
import type { Notice } from "../../pages/auth/login";

interface Notices extends Notice {
    handleClose?: any;
}
export default function Notification({ open, message, severity, handleClose}: Notices) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity ? severity === 1? 'warning' : 'error' : 'success'}
                sx={{
                    bgcolor: `${severity ? severity === 1? '#e85d04' : '#d64933' : '#538d22'}` ,
                    color: '#fff'
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}