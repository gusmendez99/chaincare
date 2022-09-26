import { INFURA_IPFS_PROJECT_ID, INFURA_IPFS_PROJECT_SECRET } from './settings';
const ipfsClient = require('ipfs-http-client')

const projectId = INFURA_IPFS_PROJECT_ID;
const projectSecret = INFURA_IPFS_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

export default ipfs
