import React from "react";
import { Flex, Link, Text, Box, Button } from "@chakra-ui/react";


export const MenuBar: React.FC = () => {
    return(
        <Flex bg="coral" w="100%" px="5" py="4" justifyContent="space-between" alignItems="center">
            <Text pl="3" color="white" fontSize="3xl"> Blogins </Text>
            <Box>
                <Button colorScheme="whiteAlpha" variant="solid"> 
                    New post
                </Button>
            </Box>
        </Flex>
    );
};