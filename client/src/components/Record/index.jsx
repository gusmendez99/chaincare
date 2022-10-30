import { Card, CardContent, IconButton, Typography, Grid, Box } from '@mui/material'
import React from 'react'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import { grey } from '@mui/material/colors'
import moment from 'moment'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded'
// import { useNavigate } from 'react-router-dom'

const Record = ({ record }) => {
  const [id, name, idPatient, idDoctor, timestamp] = record
  // const navigate = useNavigate()

  return (
    <Card
      style={{
        borderRadius: 8,
        boxShadow: '0 4px 8px 0 #BDC9D7',
      }}
    >
      <CardContent
        style={{
          paddingBottom: 'unset',
          padding: 'unset',
        }}
      >
        <Grid container spacing={2}>
          <Grid display={'flex'} flexDirection={'row'} xs={10}>
            <Box display={'flex'} style={{
              backgroundColor: '#06283D',
              width: '100px',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '16px'
            }}>
              <DescriptionRoundedIcon style={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Grid display={'flex'} flexDirection={'row'} style={{
              padding: '36px 24px'
            }}>
            <Box display='flex' flexDirection='column' xs={11}>
              <Typography variant='h4' mb={1}>{name}</Typography>
              <Typography variant='h6' color={grey[500]}>
                Doctor
              </Typography>
              <Typography variant='h6'>{idDoctor}</Typography>
              <Typography variant='h6' color={grey[500]}>
                Fecha de creación
              </Typography>
              <Typography variant='h6'>{moment.unix(timestamp).format('MM-DD-YYYY HH:mm')}</Typography>
            </Box>
            </Grid>
          </Grid>
          <Grid xs={2} display={'flex'} justifyContent={'flex-end'} style={{
            padding: '24px 12px',
          }}>
            <a href={`https://chaincare.infura-ipfs.io/ipfs/${id}`} target='_blank' rel='noopener noreferrer'>
              <IconButton>
                <CloudDownloadRoundedIcon fontSize='large' />
              </IconButton>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Record
