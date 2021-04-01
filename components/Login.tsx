import { ChangeEvent, FormEvent, useState } from 'react';
import { firebase } from 'gateway/clientApp';
import { useRouter } from 'next/router';
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Box,
    Button,
  } from '@chakra-ui/react';


export const Login = (): JSX.Element => {
  
  const router = useRouter();
  const [{ email, password }, setState] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent<any>): Promise<void> => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Box as='form' onSubmit={handleSubmit}>
      <FormControl id='email'>
        <FormLabel>Email address</FormLabel>
        <Input type='email' name='email' onChange={handleChange} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id='password'>
        <FormLabel>Password</FormLabel>
        <Input type='password' name='password' onChange={handleChange} />
        <FormHelperText>Secret password.</FormHelperText>
      </FormControl>
      <Button mt='10px' type='submit' colorScheme='teal'>
        Login
      </Button>
    </Box>
  );
};


