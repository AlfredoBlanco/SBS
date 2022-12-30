import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  data: string;
  handleClose: () => void;
}

export default function TextItem({ data, handleClose }: Props) {
  return (
    <Box
      width='100%'
      onClick={handleClose}
    >
      <Typography
        variant='h3'
        my='0.6rem'
        fontSize={22}
        borderBottom={2}
        width='100%'
        align='center'
        color='primary'
        pb='0.5rem'
        sx={{
          borderRadius: '1rem',
          '&:hover': {
            borderColor: '#90f1ef',
            cursor: 'pointer'
          }
        }}
      >
        {data}
      </Typography>
    </Box>
  )
}