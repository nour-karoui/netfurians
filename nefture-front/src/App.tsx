import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Alert, AlertTitle} from "@mui/material";
import Main from "./components/main/main";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3C79F5',
        },
        secondary: {
            main: '#098292'
        },
        info: {
            main: '#f0e6d5'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            {
                window.ethereum ?
                    <div>
                        <Header/>
                        <Main/>
                    </div>
                    :
                    <div>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            You're Not Connected to the Blockchain — <strong>Add metamask wallet !</strong>
                        </Alert>
                    </div>
            }
        </ThemeProvider>
    );
}

export default App;
