import { container } from 'tsyringe';

import AdminRepository from '@modules/admin/infra/typeorm/repositories/AdminRepository';
import IAdminRepository from '@modules/admin/repositories/IAdminRepository';

import IEmployeersRepository from '@modules/employeers/repositories/IEmployeersRepository';
import EmployeersRepository from '@modules/employeers/infra/typeorm/repositories/EmployeersRepository';

import ISuperUsersRepository from '@modules/superusers/repositories/ISuperUsersRepository';
import SuperUsersRepository from '@modules/superusers/infra/typeorm/repositories/SuperUsersRepository';

container.registerSingleton<IAdminRepository>(
  'AdminRepository',
  AdminRepository,
);

container.registerSingleton<IEmployeersRepository>(
  'EmployeersRepository',
  EmployeersRepository,
);

container.registerSingleton<ISuperUsersRepository>(
  'SuperUsersRepository',
  SuperUsersRepository,
);
