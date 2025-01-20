import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { RoleProvider } from './hook/RoleContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </RoleProvider>
  </StrictMode>,
)