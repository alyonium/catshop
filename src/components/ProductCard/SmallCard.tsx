import {
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import catImage from 'assets/cat.webp';
import { removeItem } from 'store/Cart/cartSlice.ts';
import ClearIcon from '@mui/icons-material/Clear';
import type { CardProps } from 'components/ProductCard/types.ts';
import { useAppDispatch } from 'store/hooks.ts';

const SmallCard = ({ cat }: CardProps) => {
  const dispatch = useAppDispatch();

  return (
    <MuiCard sx={{ maxWidth: 320, display: 'flex' }}>
      {cat.image ? (
        <CardMedia
          component="img"
          sx={{ width: 80 }}
          image={cat.image.url}
          title={cat.name}
        />
      ) : (
        <CardMedia sx={{ width: 80 }} image={catImage} title={cat.name} />
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 180,
          position: 'relative',
        }}
      >
        <CardContent sx={{ padding: 1 }}>
          <Typography gutterBottom variant="subtitle1">
            {cat.name}
          </Typography>
          <Typography variant="body2" className="text-overflow">
            {cat.description}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton
            onClick={() => dispatch(removeItem(cat))}
            style={{ position: 'absolute', top: '-5px', right: '-8px' }}
            data-testid="cart-remove-item-button"
          >
            <ClearIcon fontSize="medium" />
          </IconButton>
        </CardActions>
      </Box>
    </MuiCard>
  );
};

export default SmallCard;
