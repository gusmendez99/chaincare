// Guards
import AlertPopup from './components/AlertPopup'

// Pages
import Home from './pages'
import Patient from './pages/patient'
import Doctor from './pages/doctor'
import DataScientist from './pages/datascientist'
import HeaderAppBar from './components/Layout'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: (
          <>
            <AlertPopup />
            <Home />
          </>
        ),
      },
      {
        path: 'patient',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Patient />
          </>
        ),
      },
      {
        path: 'doctor',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Doctor />
          </>
        ),
      },
      {
        path: 'datascientist',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <DataScientist />
          </>
        ),
      },
    ],
  },
]

export default routes
