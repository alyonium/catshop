import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import catImage from 'assets/cat.webp';
import { addItem } from 'store/cart/cartSlice.ts';
import type { CardProps } from 'components/ProductCard/types.ts';
import { useAppDispatch, useAppSelector } from 'store/hooks.ts';
import { selectIsItemInCart } from 'store/cart/cartSelectors.ts';

const LargeCard = ({ cat }: CardProps) => {
  const dispatch = useAppDispatch();
  const isItemInCart = useAppSelector(selectIsItemInCart(cat.id));

  return (
    <MuiCard sx={{ maxWidth: 300 }}>
      {cat.image ? (
        <CardMedia
          sx={{ height: 200 }}
          image={cat.image.url}
          title={cat.name}
        />
      ) : (
        <CardMedia sx={{ height: 200 }} image={catImage} title={cat.name} />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cat.name}
        </Typography>
        <Typography variant="body2" className="text-overflow">
          {cat.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => dispatch(addItem(cat))}
          disabled={isItemInCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default LargeCard;
