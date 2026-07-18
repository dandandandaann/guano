import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Alert,
} from '@mui/material';
import { calculators } from '@/calculators';
import { getIcon } from '@/components/iconMap';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Coleção de calculadoras de engenharia para uso em campo.
        </Typography>
      </Box>

      {calculators.length === 0 ? (
        <Alert severity="info">Nenhuma calculadora disponível ainda.</Alert>
      ) : (
        <Grid container spacing={3}>
          {calculators.map((calculator) => {
            const Icon = getIcon(calculator.icon);

            return (
              <Grid item xs={12} sm={6} md={4} key={calculator.id}>
                <Card>
                  <CardActionArea
                    onClick={() => navigate(calculator.path)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ height: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ fontSize: 48 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        align="center"
                      >
                        {calculator.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {calculator.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
