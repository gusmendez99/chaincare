import { Chip, Grid, Box, FormControl, TextField, Typography, Backdrop, CircularProgress, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MonitorHeart from '@mui/icons-material/MonitorHeart'
import TireRepair from '@mui/icons-material/TireRepair'
import useEth from '../../contexts/EthContext/useEth'
import useAlert from '../../contexts/AlertContext/useAlert'
import Record from '../../components/Record'
import DummyCardItem from '../../components/DummyCardItem'
import DummyUserCardItem from '../../components/DummyUserCardItem'

const DATASETS = [
  {
    title: 'Ciudad de Guatemala 2022',
    content: 'Datasets de radiografías de personas en Ciudad Guatemala.',
    imageUrl: 'https://media.istockphoto.com/vectors/heart-pain-vector-id1140699571?k=20&m=1140699571&s=612x612&w=0&h=I_0bEzUyYbv-AXGjRtEaY5O482pgWatkBRlbP9w2bdo='
  },
  {
    title: 'Occidente 2021',
    content: 'Datasets de rayos X realizados en el período de marzo a octubre de 2021, en Hospital Y del país.',
    imageUrl: 'https://www.us.es/sites/default/files/noticia/pulmones_radiografia_web.jpg'
  },
  {
    title: 'Electrocardiogramas en adultos de 23-30 años en Ciudad Guatemala',
    content: 'Resultados de los electrocardiogramas obtenidos en el año 2022 en Hospital X de Guatemala.',
    imageUrl: 'https://cardium.net/wp-content/uploads/2021/01/EKG-1024x412.jpg'
  },
  {
    title: 'Rayos X de entrenamiento 2022',
    content: 'Dataset de rayos X pulmonares de la región del Oriente del país, tomadas en el año 2022.',
    imageUrl: 'https://saludconlupa.com/media/images/pulmones.width-1920.jpg'
  },
  {
    title: 'Resonancias magnéticas en adolescentes',
    content: 'Dataset de resonancias magnéticas tomadas a jovenes de 15 a 18 años en Hospital Sur del país.',
    imageUrl: 'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'
  },
  {
    title: 'Pletismografías en niños con asma menores a 10 años',
    content: 'Resultados en CSV de los resultados de pruebas de pletismografías en el año 2022 en la Ciudad Guatemala.',
    imageUrl: 'https://www.neumologopediatramonterrey.com/images/pletismografia-neumologa-pediatra-monterrey.jpg'
  }
]


const Doctor = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth();
  const { setAlert } = useAlert()

  const [patientExist, setPatientExist] = useState(false)
  const [searchPatientAddress, setSearchPatientAddress] = useState('')
  const [records, setRecords] = useState([])

  const searchPatient = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(searchPatientAddress)) {
        setAlert('Ingrese una dirección de billetera válida', 'error')
        return
      }
      const patientExists = await contract.methods.getPatientExists(searchPatientAddress).call({ from: accounts[0] })
      if (patientExists) {
        const records = await contract.methods.getRecords(searchPatientAddress).call({ from: accounts[0] })
        setRecords(records)
        setPatientExist(true)
      } else {
        setAlert('El paciente no se encuentra registrado en el sistema', 'error')
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
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
              fontFamily={'Nunito'}
            >
              Conjuntos de datos 
            </Typography>
          </Box>
        </Grid>
        <Box width='60%' my={5}>
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
              {(role === 'patient' || role === 'doctor') && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Solo los científicos de datos tienen acceso a esta página</Typography>
                </Box>
              )}
              {role === 'datascientist' && (
                <>
                  <Typography variant='h4'>Búsqueda</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Buscar datasets por enfermedad, área geográfica, entidad o paciente (billetera)'
                        value={searchPatientAddress}
                        onChange={e => setSearchPatientAddress(e.target.value)}
                        InputProps={{ 
                          style: { 
                            fontSize: '15px',
                            borderRadius: '30px'
                          },
                          endAdornment: (
                            <IconButton
                              style={{
                                backgroundColor: '#3DBFF2',
                                margin: '0.75rem 0rem',
                                padding: '1rem',
                
                              }}
                              aria-label="Buscar registro"
                              component="label"
                              onClick={() => searchPatient()}
                            >
                              <SearchRoundedIcon style={{ color: 'white' }} />
                            </IconButton>
                          )
                        }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                  </Box>
                  {
                    !patientExist && (
                      <>
                        <Box mt={2}>
                          <Chip icon={<MonitorHeart />} style={{ fontSize: '10pt' }} label="Cardiovasculares" />
                          <Chip icon={<TireRepair />} style={{ fontSize: '10pt', marginLeft: '1rem' }} label="Pulmonares" variant="outlined" />
                        </Box>
                        <Grid mt={2} container spacing={2}>
                          {
                            DATASETS.map(({ title, content, imageUrl }) => (
                              <Grid item xs={6} md={4}>
                                <DummyCardItem
                                  title={title}
                                  content={content}
                                  imageUrl={imageUrl}
                                />
                              </Grid>
                            ))
                          }
                        </Grid>
                      </>
                    )
                  }

                  {patientExist && (
                    <>
                      <DummyUserCardItem
                        registersCount={records.length}
                      />
                      {
                        records.length === 0 && (
                          <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                            <Typography variant='h5'>Este paciente no cuenta con registros médicos aún</Typography>
                          </Box>
                        )
                      }
                      {
                        records.length > 0 && (
                          <Box display='flex' flexDirection='column' mt={6} mb={-2}>
                            <Typography variant='h4' mb={2}>Listado de registros</Typography>
                            {records.map((record, index) => (
                              <Box mb={2}>
                                <Record key={index} record={record} />
                              </Box>
                            ))}
                          </Box>
                        )
                      }
                    </>
                    
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

export default Doctor
