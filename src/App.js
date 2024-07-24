import React from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  Grid,
  theme,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Center>
            <FileUpload />
          </Center>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
