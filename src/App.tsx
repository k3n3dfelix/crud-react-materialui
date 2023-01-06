import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Login, MenuLateral } from './shared/components';
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
} from './shared/contexts';
import './shared/forms/TraducoesYup';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes></AppRoutes>
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
