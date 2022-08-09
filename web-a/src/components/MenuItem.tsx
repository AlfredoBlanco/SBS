import Link from 'next/link';
import Typography from '@mui/material/Typography';


export default function MenuItem({go, data } : {go : string ,data : string}) {
    return (
    <Link href={`#${go}`} >
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
            borderRadius : '1rem',
            '&:hover' : {
              borderColor : '#90f1ef',
              cursor : 'pointer'
            }
          }}
        >
          {data}
        </Typography>
    </Link>
    )
}