import { EthProvider } from './contexts/EthContext'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import { AlertProvider } from './contexts/AlertContext/AlertContext'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const content = useRoutes(routes)

  return (
    <ThemeProvider theme={theme}>
      <EthProvider>
        <AlertProvider>{content}</AlertProvider>
      </EthProvider>
    </ThemeProvider>
  )
}

export default App
