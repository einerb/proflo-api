import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
  InsertEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../user.entity';

@EventSubscriber()
export class UpdatePasswordSubscriber
  implements EntitySubscriberInterface<UserEntity>
{
  listenTo() {
    return UserEntity;
  }

  async hashPassword(entity: UserEntity): Promise<void> {
    entity.password = await bcrypt.hash(entity.password, 10);
  }

  beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    return this.hashPassword(event.entity);
  }

  /* async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity.password !== databaseEntity?.password) {
      await this.hashPassword(entity);
    }
  } */
}
