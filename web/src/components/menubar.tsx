import React from "react";
import { Flex, Link, Text, Box, Button } from "@chakra-ui/react";


export const MenuBar: React.FC = ({children}) => {
    return(
        <div>
        <Flex bg="black" w="100%" px="5" py="4" justifyContent="space-between" alignItems="center">
            <Text pl="3" color="white" fontSize="3xl"> Blogins </Text>
            <Box>
                <Button colorScheme="orange" variant="solid"> 
                    New post
                </Button>
            </Box>
        </Flex>
        {children}
        </div>
        
    );
};