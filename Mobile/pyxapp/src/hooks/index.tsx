import React from 'react';
import { Api } from './api';

import { AuthUser } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthUser>
    <Api>{children}</Api>
  </AuthUser>
);

export default AppProvider;
