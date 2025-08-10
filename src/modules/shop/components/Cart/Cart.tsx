import { Button, Drawer, Stack, Typography } from '@mui/material';
import SmallCard from 'components/ProductCard/SmallCard.tsx';
import {
  selectCartItems,
  selectCartItemsCount,
} from 'store/Cart/cartSelectors.ts';
import { useAppDispatch, useAppSelector } from 'store/hooks.ts';
import styles from './Cart.module.css';
import { clearCart } from 'store/Cart/cartSlice.ts';

type CartProps = {
  open: boolean;
  onClose: () => void;
};

const Cart = ({ open, onClose }: CartProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const selectedItemsCount = useAppSelector(selectCartItemsCount);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={onClose}
      data-testid="cart-drawer"
    >
      <Stack spacing={3} className={styles.wrapper}>
        <Typography variant="h5" component="h3" gutterBottom>
          Cart
        </Typography>

        <Typography variant="body1" gutterBottom>
          {selectedItemsCount > 0 ? (
            <>You selected {selectedItemsCount} cats:</>
          ) : (
            <>List is empty</>
          )}
        </Typography>

        {cartItems.map((cat) => (
          <SmallCard key={cat.id} cat={cat} />
        ))}

        {selectedItemsCount > 0 ? (
          <Button variant="contained" onClick={() => dispatch(clearCart())}>
            Clear the cart
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </Drawer>
  );
};

export default Cart;
