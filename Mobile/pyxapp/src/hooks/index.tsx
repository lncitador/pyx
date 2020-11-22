import React from 'react';

import { AuthUser } from './auth';

const AppProvider: React.FC = ({ children }) => <AuthUser>{children}</AuthUser>;

export default AppProvider;
