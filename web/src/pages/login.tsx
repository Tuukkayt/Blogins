import React from 'react';
import {Form, Formik} from 'formik';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { MenuBar } from '../components/menubar';

interface loginProps {

}

const Login: React.FC<loginProps> = ({}) => {
    return (
        <MenuBar>
        <Box mt={10} mx="auto" maxWidth="500px" w="100%">
            <Formik 
                initialValues={{username: "", password: ""}}
                onSubmit={(values) => {
                    console.log(values);
                }}>
                {({values, handleChange}) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input 
                                value={values.username} 
                                onChange={handleChange} 
                                id="username" 
                                placeholder="username" 
                            />
                            <FormLabel mt={4} htmlFor="password">Password</FormLabel>
                            <Input 
                                value={values.password} 
                                onChange={handleChange} 
                                id="password" 
                                placeholder="password"
                            />
                            <Button mt={4} type="submit" colorScheme="orange" variant="solid">Log in</Button>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </Box>
        </MenuBar>
    );
}

export default Login;