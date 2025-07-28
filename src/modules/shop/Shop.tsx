import { useAppSelector } from 'store/hooks.ts';
import List from 'modules/shop/components/list/List.tsx';
import { IconButton, Badge, Typography } from '@mui/material';
import { useState } from 'react';
import Cart from 'modules/shop/components/cart/Cart.tsx';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectCartItemsCount } from 'store/cart/cartSelectors.ts';

const Shop = () => {
  const [open, setOpen] = useState(false);
  const selectedItemsCount = useAppSelector(selectCartItemsCount);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12} className="text-align-center">
        <Typography variant="h2" component="h1">
          Cat<span style={{ color: '#f08080' }}>shop</span> 🐈
        </Typography>

        <IconButton
          onClick={toggleDrawer(true)}
          style={{ position: 'absolute', right: '30px', top: '20px' }}
        >
          <ShoppingCartIcon fontSize="medium" />
          <Badge
            badgeContent={selectedItemsCount}
            color="primary"
            overlap="circular"
            style={{ position: 'absolute', right: '10px', top: '8px' }}
          />
        </IconButton>

        <Typography variant="body1">find your purrfect friend</Typography>
      </Grid>

      <Cart open={open} onClose={toggleDrawer(false)} />

      <List />
    </Grid>
  );
};

export default Shop;
