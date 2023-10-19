import { container } from 'tsyringe';
import { InjectableKeys } from '../keys';
import { Database } from '@database/index';

container.registerSingleton(InjectableKeys.Database, Database);
