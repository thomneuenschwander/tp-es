import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';

type PizzaTypeCardProps = {
  flavor: string;
  description: string;
  imageUrl: string;
  selected: boolean;
  price: number;
};

const PizzaTypeCard = ({
  flavor,
  description,
  imageUrl,
  selected,
  price,
}: PizzaTypeCardProps) => {
  return (
    <Card
      onClick={() => 1}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        borderRadius: 2,
        cursor: 'pointer',
        border: 1,
        borderColor: selected ? 'primary.main' : 'divider',
      }}
    >
      <Stack gap={1} pl={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight="bold">
            {flavor}
          </Typography>
          {price > 0 && (
            <Typography variant="caption" color="text.secondary">
              (+R$ {price.toFixed(2)})
            </Typography>
          )}
        </Box>
        <Divider />
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Stack>
      <Avatar src={imageUrl} sx={{ width: 100, height: 100 }} />
    </Card>
  );
};

export default PizzaTypeCard;
