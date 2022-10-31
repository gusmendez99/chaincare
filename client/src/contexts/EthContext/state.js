const actions = {
  init: 'INIT',
  addDoctor: 'ADD_DOCTOR',
  addDataScientist: 'ADD_DATASCIENTIST',
}

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  role: 'unknown',
  loading: true,
}

const reducer = (state, action) => {
  const { type, data } = action
  switch (type) {
    case actions.init:
      return { ...state, ...data }
    case actions.addDoctor:
      return { state: { ...state, role: 'doctor' } }
    case actions.addDataScientist:
      return { state: { ...state, role: 'datascientist' } }
    default:
      throw new Error('Undefined reducer action type')
  }
}

export { actions, initialState, reducer }
