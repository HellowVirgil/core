import { CollaborationModuleContribution, type UserInfo } from '@opensumi/ide-collaboration';
import { Domain, uuid } from '@opensumi/ide-core-common';

@Domain(CollaborationModuleContribution)
export class CollaborationUserInfoContribution implements CollaborationModuleContribution {
  get info(): UserInfo & {
    avatar: string;
  } {
    return {
      id: uuid(6),
      nickname: uuid(6),
      avatar: 'https://work.alibaba-inc.com/photo/102228.100x100.jpg',
    };
  }
}
