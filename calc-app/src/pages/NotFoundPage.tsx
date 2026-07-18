import { useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        alignItems="center"
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', sm: '6rem' },
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          404
        </Typography>

        <Typography variant="h5" component="h2">
          Página não encontrada
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
        >
          A página que você está procurando não existe ou foi movida.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Voltar ao início
        </Button>
      </Stack>
    </Container>
  );
}
