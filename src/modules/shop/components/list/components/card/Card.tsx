import type { Cat } from 'types/types.ts';
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import catImage from 'assets/cat.webp';

type CardProps = {
  cat: Cat;
};

const Card = ({ cat }: CardProps) => {
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {cat.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Add</Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
