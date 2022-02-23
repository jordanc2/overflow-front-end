/* eslint-disable */ 
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from '../UserPool';



// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  const LoginSchema = Yup.object().shape({
    Username: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      Username: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("from values", values)
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      console.log("from user", user);
      const authDetails = new AuthenticationDetails({
        Username: email,
        password: password,
      });
      console.log("from auth details", authDetails);

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
        },
      });
      navigate('/dashboard/app', { replace: true });
    }
  });


  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, handleChange } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="text"
            label="Email address"
            {...getFieldProps('Username')}
            onChange = {handleChange} 
            value = {formik.values.Username}
            error={Boolean(touched.Username && errors.Username)}
            helperText={touched.Username && errors.Username}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value = {formik.values.password}
            {...getFieldProps('password')}
            onChange = {handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={formik.values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
