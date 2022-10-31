import { AppBar, Chip, Toolbar, Box, Typography } from '@mui/material'
import React from 'react'
import useEth from '../../contexts/EthContext/useEth'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import logo from '../../assets/LogoBlueCropped.png'
import { grey } from '@mui/material/colors'

const HeaderAppBar = () => {
  const {
    state: { accounts, role },
  } = useEth()

  const getRoleName = role => {
    switch(role) {
      case 'patient':
        return "Paciente";
      case 'doctor':
        return 'Doctor';
      case 'datascientist':
        return 'Científico de Datos'
      default:
        return 'Usuario invitado'
    }
  } 

  return (
    <AppBar position='static' style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
          <a href='/'>
            <img src={logo} alt='chaincare-logo' style={{ height: 40, weight: 40 }} />
          </a>
          <Box flexGrow={1} />
          <Box display='flex' alignItems='center'>
            {/* <Box ml={0.5} mr={2}>
              <Typography variant='h6' color='black'>
              {accounts ? accounts[0] : 'Billetera no conectado aún'}
              </Typography>
            </Box> */}
            <PersonRoundedIcon style={{ color: grey[700], fontSize: '22px', marginRight: '8px' }} />
            <Chip
              label={getRoleName(role)}
              style={{ fontSize: '12px', backgroundColor: '#06283D', color: 'white' }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default HeaderAppBar
