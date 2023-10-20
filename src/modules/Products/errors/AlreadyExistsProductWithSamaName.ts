import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { ServiceError } from '@shared/core/error/ServiceError';

export class AlreadyExistsProductWithSamaName
  extends Error
  implements ServiceError
{
  status: number = statusCodeMapper.Conflict;

  constructor() {
    super('Já existe um produto com esse nome');
  }
}
