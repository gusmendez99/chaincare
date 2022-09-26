const ipfsClient = require('ipfs-http-client')

const projectId = 'TODO: Set params'
const projectSecret = 'TODO: Set params'
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
