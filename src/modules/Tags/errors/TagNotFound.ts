import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { ServiceError } from '@shared/core/error/ServiceError';

export class TagNotFound extends Error implements ServiceError {
  status: number = statusCodeMapper.Conflict;

  constructor() {
    super('Você está tentando referenciar uma tag que não existe');
  }
}
