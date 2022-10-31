import { Box, Typography, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import useEth from '../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import Science from '@mui/icons-material/Science'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../components/Header';
import Features from '../components/Features';

import '../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const Home = () => {
  const classes = useStyles();
  const {
    state: { contract, accounts, role, loading },
    dispatch,
  } = useEth()
  const navigate = useNavigate()

  const registerDoctor = async () => {
    try {
      await contract.methods.addDoctor().send({ from: accounts[0] })
      dispatch({
        type: 'ADD_DOCTOR',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const registerDataScientist = async () => {
    try {
      await contract.methods.addDataScientist().send({ from: accounts[0] })
      dispatch({
        type: 'ADD_DATASCIENTIST',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const ActionSection = () => {
    if (!accounts) {
      return (
        <Typography variant='h5' color='white'>
          Abra su billetera MetaMask para conectarse, luego actualice esta página
        </Typography>
      )
    } else {
      if (role === 'unknown') {
        return (
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h5' color='white'>
              Regístrate en nuestra plataforma
            </Typography>
            <Box mb={2}>
              <CustomButton text='Doctor' handleClick={() => registerDoctor()}>
                <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
              </CustomButton>
            </Box>
            <Box mb={2}>
              <CustomButton text='Científico de Datos' handleClick={() => registerDataScientist()}>
                <Science style={{ color: 'white' }} />
              </CustomButton>
            </Box>
            <Typography variant='h5' color='white'>
              Si eres un paciente, pídale a tu médico que te registre primero
            </Typography>
          </Box>
        )
      } else if (role === 'patient') {
        return (
          <CustomButton text='Portal de Paciente' handleClick={() => navigate('/patient')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      } else if (role === 'doctor') {
        return (
          <CustomButton text='Portal de Doctor' handleClick={() => navigate('/doctor')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      } else if (role === 'datascientist') {
        return (
          <CustomButton text='Portal de Científico de Datos' handleClick={() => navigate('/datascientist')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      }
    }
  }

  const AccessSection = () => (
    <Box
      id='portal'
      p={5}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        mt={20}
      >
        <ActionSection />
        <Box display='flex' alignItems='center' mt={2}>
          <Typography variant='h5' color='white'>
            Plataforma hecha con {' '}
          </Typography>
          <Box mx={1}>
            <img
              src='https://cdn.worldvectorlogo.com/logos/ethereum-1.svg'
              alt='Ethereum logo vector'
              style={{ height: 20 }}
            ></img>
          </Box>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png'
            alt='Ethereum logo vector'
            style={{ height: 20 }}
          ></img>
        </Box>
      </Box>
    </Box>
  )

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <AccessSection />
        <Features />
      </div>
    );
  }
}

export default Home
