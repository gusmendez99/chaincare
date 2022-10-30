import { Grid, Box, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress, IconButton } from '@mui/material'
import React, { useCallback, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ListAlt from '@mui/icons-material/ListAlt'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert'
import AddRecordModal from './AddRecordModal'
import ipfs from '../../ipfs'
import Record from '../../components/Record'
import DummyUserCardItem from '../../components/DummyUserCardItem'


const Doctor = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth();
  const { setAlert } = useAlert()

  const [patientExist, setPatientExist] = useState(false)
  const [isRegisterPatientViewDisplayed, setIsRegisterPatientViewDisplayed] = useState(false);
  const [searchPatientAddress, setSearchPatientAddress] = useState('')
  const [addPatientAddress, setAddPatientAddress] = useState('')
  const [records, setRecords] = useState([])
  const [addRecord, setAddRecord] = useState(false)

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

  const registerPatient = async () => {
    try {
      await contract.methods.addPatient(addPatientAddress).send({ from: accounts[0] })
    } catch (err) {
      console.error(err)
    }
  }

  const addRecordCallback = useCallback(
    async (buffer, fileName, patientAddress) => {
      if (!patientAddress) {
        setAlert('Por favor, busca primero al paciente registrado', 'error')
        return
      }
      try {
        const res = await ipfs.add(buffer)
        const ipfsHash = res[0].hash
        if (ipfsHash) {
          await contract.methods.addRecord(ipfsHash, fileName, patientAddress).send({ from: accounts[0] })
          setAlert('Nuevo registro médico subido exitosamente', 'success')
          setAddRecord(false)

          // refresh records
          const records = await contract.methods.getRecords(patientAddress).call({ from: accounts[0] })
          setRecords(records)
        }
      } catch (err) {
        setAlert('Error al subir archivo del registro médico', 'error')
        console.error(err)
      }
    },
    [addPatientAddress, accounts, contract]
  )

  // Views
  const PatientsListView = () => (
    <>
      <Modal open={addRecord} onClose={() => setAddRecord(false)}>
        <AddRecordModal
          handleClose={() => setAddRecord(false)}
          handleUpload={addRecordCallback}
          patientAddress={searchPatientAddress}
        />
      </Modal>
      <Typography variant='h4'>Búsqueda</Typography>
      <Box display='flex' alignItems='center' my={1}>
        <FormControl fullWidth>
          <TextField
            variant='outlined'
            placeholder='Buscar paciente por dirección de billetera'
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

      {patientExist && (
        <DummyUserCardItem
          registersCount={records.length}
          onAction={() => setAddRecord(true)}
        />
      )}
    
      {patientExist && records.length === 0 && (
        <Box display='flex' alignItems='center' justifyContent='center' my={5}>
          <Typography variant='h5'>Este paciente no cuenta con registros médicos aún</Typography>
        </Box>
      )}
    
      {patientExist && records.length > 0 && (
        <Box display='flex' flexDirection='column' mt={4} mb={-2}>
          <Typography variant='h4' mb={2}>Listado de registros</Typography>
          {records.map((record, index) => (
            <Box mb={2}>
              <Record key={index} record={record} />
            </Box>
          ))}
        </Box>
      )}
    </>
  );

  const RegisterPatientView = () => (
    <>
      <Typography variant='h4'>Registro de Pacientes</Typography>
      <Box display='flex' alignItems='center' my={1}>
        <FormControl fullWidth>
          <TextField
            variant='outlined'
            placeholder='Registrar paciente por dirección de billetera'
            value={addPatientAddress}
            onChange={e => setAddPatientAddress(e.target.value)}
            InputProps={{ style: { fontSize: '15px' } }}
            InputLabelProps={{ style: { fontSize: '15px' } }}
            size='small'
          />
        </FormControl>
        <Box mx={2}>
          <CustomButton text={'Registrar'} handleClick={() => registerPatient()}>
            <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        </Box>
      </Box>
    </>
  );

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
            >
              Registros Médicos 
            </Typography>
          </Box>
          <IconButton
            style={{
              backgroundColor: '#3DBFF2',
              padding: '1rem',

            }}
            aria-label="Buscar registro"
            component="label"
            onClick={() => setIsRegisterPatientViewDisplayed(!isRegisterPatientViewDisplayed)}
          >
            {
              !isRegisterPatientViewDisplayed 
                ? <PersonAddAlt1RoundedIcon fontSize='large' style={{ color: 'white' }} />
                : <ListAlt fontSize='large' style={{ color: 'white' }} />
            }
          </IconButton>
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
              {role === 'patient' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Solo los doctores tienen acceso a esta página</Typography>
                </Box>
              )}
              {role === 'doctor' && (
                isRegisterPatientViewDisplayed
                ? RegisterPatientView()
                : PatientsListView()
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default Doctor
