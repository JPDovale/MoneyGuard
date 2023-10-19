import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { ServiceError } from '@shared/core/error/ServiceError';

export class AlreadyExistsTagWithSamaName
  extends Error
  implements ServiceError
{
  status: number = statusCodeMapper.Conflict;

  constructor() {
    super('Já existe uma tag com esse nome');
  }
}
