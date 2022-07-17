import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const { login } = useAuth();

    const onSubmit = ({ email, password }) => login(email, password);

    return (
        <Container maxWidth="xs" sx={{ border: '1px solid #cccccc', borderRadius: 5, padding: 5}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid xs={12} item>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Controller
                                name="email"
                                rules={{ required: "An email address is required" }}
                                control={control}
                                render={({ field }) => (
                                    <TextField 
                                        {...field} 
                                        sx={{ margin: 1}}
                                        autoComplete="on"
                                        type="email"
                                        error={!!errors.email?.message}
                                        label="email" 
                                        helperText={errors.email?.message}
                                    />
                                )} 
                            />
                        </Box>
                    </Grid>
                    <Grid xs={12} item>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "A password is required" }}
                                render={({ field }) => (
                                    <TextField 
                                        {...field} 
                                        sx={{ margin: 1 }}
                                        autoComplete="on"
                                        type="password"
                                        error={!!errors.password?.message}
                                        label="password" 
                                        helperText={errors.password?.message}
                                    />
                                )} 
                            />
                        </Box>
                    </Grid>
                    <Grid xs={12} item>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button sx={{ margin: 1 }} variant='outlined' type="submit">
                                Login
                            </Button>
                            <Button 
                                variant='outlined' 
                                type="submit"
                                href={'/registration'}
                            >
                                Registration
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}