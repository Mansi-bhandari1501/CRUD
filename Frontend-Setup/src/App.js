import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import RouteComponent from './route.jsx';

function App() {
  const user = useSelector((state) => state.user); 

  return (
    <SnackbarProvider>
      <CssBaseline>
        <RouteComponent isLogined={user.isLogedin} role={user.user?.role_details?.role_type || ""} />
      </CssBaseline>
    </SnackbarProvider>
  );
}

export default App;

