import { Grid, useMediaQuery } from "@mui/material"
import ProductItem from "./ProductItem";
import UserItem from "./UserItem";
import type { User } from "../../redux/slices/userSlice";

interface Data {
  _id: string,
  title: string,
  image: string,
  description: string,
  price: number,
  stock: boolean
}

interface Props {
    products?: Data[];
    users?: User[]
}

export default function List({ products, users } : Props) {
    
    const W400 = useMediaQuery('(min-width:400px)');
    return (
        <Grid
          container
          width={W400 ? '80vw' : '90vw'}
          p='0.2rem'
          sx={{
            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
            borderRadius: '1rem'

          }}
        >
        {
          products?.map((e: Data) => {
            return (
              <ProductItem data={e} key={e._id} />
            )
          })
        }
        {
          users?.map((e : User) => {
              return (
                <UserItem user={e} key={e._id} />
              )
          })
        }

        </Grid>
    )
}