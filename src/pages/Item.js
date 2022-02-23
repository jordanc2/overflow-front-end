/* eslint-disable */ 
import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography, ButtonGroup } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ItemList
} from '../components/_dashboard/item';
//
import PRODUCTS from '../_mocks_/products';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
// ----------------------------------------------------------------------


export default function Item(props) {
const [value, setValue] = useState(0);
const [count, setCount] = useState(0);


const handleIncrement = () => {
  setCount(count + 1);
}

const handleDecrement = () => {
  if(count <= 0) {
    return;
  } else {
    setCount(count - 1);
  }
}

// const displayCounter = count >  0;



  return (
    <Page title="Dashboard: Item | Minimal-UI">
      <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} rowSpacing={1}>
        <Grid item xs={8}>
        <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Image
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={4} container spacing={0} rowSpacing={2}>
    <Stack>
     <h2>Product Name</h2>
     <br></br>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <br></br>
      <Box sx={{ mt: 3 }}>
      <h4>${PRODUCTS.price}</h4>
      <br></br>
      </Box>
    {/* <Button sx={{ mt: 3 }} size="medium" variant ="contained"  onClick={handleIncrement} >Add to Cart</Button> */}
    <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleIncrement}>+</Button>
        {<Button disabled>{count}</Button>}
        {<Button onClick={handleDecrement}>-</Button>}
      </ButtonGroup>
    </Stack>
    </Grid>
    </Grid>
    </Box>
      </Container>
      </Page>
  );
}
