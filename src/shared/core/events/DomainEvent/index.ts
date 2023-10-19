import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityId;
}
