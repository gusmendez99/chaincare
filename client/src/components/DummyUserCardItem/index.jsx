import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Avatar } from '@material-ui/core';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import CustomButton from '../CustomButton';
import { green } from '@mui/material/colors';
import useEth from '../../contexts/EthContext/useEth'


const usePersonStyles = makeStyles(() => ({
  person: {
    alignItems: 'center',
    display: 'flex',
    padding: '1rem',
  },
  personBody: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  },
  personInfo: {
    marginLeft: '1.5rem'
  },
  basetext: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  fullname: {
    color: '#122740',
    fontWeight: 600,
    fontSize: '12pt',
    paddingBottom: '0.5rem'
  },
  caption: {
    fontSize: '9pt',
    color: '#758392',
  },
}));

const PersonItem = ({ src, fullname, count, onAction, isPatient }) => {
  const styles = usePersonStyles();
  const {
    state: { accounts },
  } = useEth();

  return (
    <Box className={styles.person}>
      <Avatar src={src} />
      <Box className={styles.personBody} minWidth={0}>
        <Box className={styles.personInfo} minWidth={0}>
          <div className={cx(styles.fullname, styles.basetext)}>{fullname}</div>
          {
            isPatient && (
              <div className={cx(styles.caption, styles.basetext)}>
                Billetera: {accounts ? accounts[0] : 'Billetera no conectado aún'}
              </div>
            )
          }
          <div className={cx(styles.caption, styles.basetext)}>
            {count} registros médicos
          </div>
        </Box>
        {
          onAction && (
            <CustomButton color={green['500']} text={'Nuevo registro'} handleClick={onAction}>
              <CloudUploadRoundedIcon style={{ color: 'white' }} />
            </CustomButton>
          )
        }
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  userCard: {
    borderRadius: 8,
    boxShadow: '0 4px 8px 0 #BDC9D7',
    overflow: 'hidden',
    padding: '1rem',
    margin: '2rem 0rem'
  },
  userCardHeader: {
    backgroundColor: 'white',
    padding: '1rem'
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  divider: {
    backgroundColor: '#d9e2ee',
    margin: '5px 10px',
  }
}));

const DummyUserCardItem = React.memo(function DummyUserCardItem({
  fullname = 'Paciente de prueba',
  imageUrl = 'https://i.pravatar.cc/300?img=10',
  registersCount = 0,
  onAction,
  isPatient = false,
}) {
  const styles = useStyles();
  return (
    <>
      <Box className={styles.userCard}>
        <Box alignItems={'baseline'} className={styles.userCardHeader}>
          <Box className={styles.headline}>
            {
              isPatient ? 'Resumen' : 'Paciente seleccionado'
            }
          </Box>
        </Box>
        <Divider variant={'middle'} className={styles.divider} />
        <PersonItem
          fullname={fullname}
          count={registersCount}
          src={imageUrl}
          onAction={onAction}
          isPatient={isPatient}
        />
      </Box>
    </>
  );
});

export default DummyUserCardItem;