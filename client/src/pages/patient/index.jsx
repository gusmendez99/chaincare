import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography, Backdrop, CircularProgress } from '@mui/material'
import useEth from '../../contexts/EthContext/useEth'
import Record from '../../components/Record'
import DummyUserCardItem from '../../components/DummyUserCardItem';

const Patient = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const [records, setRecords] = useState([])
  const [loadingRecords, setLoadingRecords] = useState(true)

  useEffect(() => {
    const getRecords = async () => {
      try {
        const records = await contract.methods.getRecords(accounts[0]).call({ from: accounts[0] })
        setRecords(records)
        setLoadingRecords(false)
      } catch (err) {
        console.error(err)
        setLoadingRecords(false)
      }
    }
    getRecords()
  })

  if (loading || loadingRecords) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return (
      <Box display='flex' flexDirection='column' alignItems='center' width='100vw'>
        <Grid  
          container
          justifyContent="space-between"
          alignItems="center"
          style={{
            backgroundColor: '#06283D',
            color: 'white',
            padding: '3rem',
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="p"
            >
              Mis Registros Médicos 
            </Typography>
          </Box>
        </Grid>
        <Box width='60%' my={5}>
          <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
          {!accounts ? (
            <Box display='flex' justifyContent='center'>
              <Typography variant='h6'>Abra su billetera MetaMask para conectarse, luego actualice esta página</Typography>
            </Box>
          ) : (
            <>
              {role === 'unknown' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>No estás registrado, por favor ve a la página de inicio</Typography>
                </Box>
              )}
              {role === 'doctor' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Solo los pacientes tienen acceso a este portal</Typography>
                </Box>
              )}
              {role === 'patient' && (
                <>
                  <Typography variant='h4'>Mi Perfil</Typography>
                  <DummyUserCardItem
                    isPatient
                    registersCount={records.length}
                  />
                  <Typography variant='h4' mt={4}>Listado de registros</Typography>

                  {records.length === 0 && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>Aún no hay registros creados en la plataforma</Typography>
                    </Box>
                  )}

                  {records.length > 0 && (
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      {records.map((record, index) => (
                        <Box mb={2}>
                          <Record key={index} record={record} />
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default Patient
