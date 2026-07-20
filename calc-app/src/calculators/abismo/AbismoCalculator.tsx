import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Alert,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { validateAbismoInputs } from '@/utils';
import { calculatePitDepth } from './logic';

/**
 * AbismoCalculator - UI component for pit depth estimation.
 *
 * Estimates the total depth of a pit based on the elapsed time between
 * releasing a rock and hearing it reach the bottom.
 *
 * Flow: User inputs → Validation → Calculation → Result display
 */
export function AbismoCalculator() {
  const [timeInput, setTimeInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('1.5');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ time?: string; height?: string }>({});

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(event.target.value);
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: undefined }));
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeightInput(event.target.value);
    if (errors.height) {
      setErrors((prev) => ({ ...prev, height: undefined }));
    }
  };

  const handleCalculate = () => {
    // Step 1: Validate inputs
    const validationResult = validateAbismoInputs(timeInput, heightInput);

    // Step 2: If validation fails, show errors and don't calculate
    if (!validationResult.valid) {
      setErrors(validationResult.errors);
      setResult(null);
      return;
    }

    // Step 3: Validation passed - parse and calculate
    const time = parseFloat(timeInput);
    const height = parseFloat(heightInput);

    const calculatedResult = calculatePitDepth(time, height);
    setResult(calculatedResult);
    setErrors({});
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculadora de Abismo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Estima a profundidade de um abismo a partir do tempo entre soltar a
          pedra e ouvir o impacto.
        </Typography>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <Stack spacing={3}>
          <TextField
            id="time-input"
            label="Tempo até ouvir a pedra bater no fundo (s)"
            type="number"
            value={timeInput}
            onChange={handleTimeChange}
            inputProps={{ step: 'any', min: 0 }}
            fullWidth
            error={!!errors.time}
            helperText={errors.time ?? ' '}
          />

          <TextField
            id="height-input"
            label="Altura de onde a pedra foi solta (m)"
            type="number"
            value={heightInput}
            onChange={handleHeightChange}
            inputProps={{ step: 'any', min: 0 }}
            fullWidth
            error={!!errors.height}
            helperText={errors.height ?? ' '}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ minHeight: 44 }}
          >
            Calcular
          </Button>
        </Stack>
      </form>

      {result !== null && (
        <Box sx={{ mt: 4 }}>
          <Alert
            severity="success"
            icon={<CheckCircleOutlineIcon />}
          >
            <Typography variant="h6">Profundidade estimada</Typography>
            <Typography variant="h4">{result.toFixed(2)} m</Typography>
          </Alert>
        </Box>
      )}
    </Container>
  );
}
