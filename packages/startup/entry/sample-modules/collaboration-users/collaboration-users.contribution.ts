import { ComponentContribution, ComponentRegistry, Domain } from '@opensumi/ide-core-browser';

import { CollaborationUsersView } from './collaboration-users.view';

export const CollaborationUsersId = 'collaboration-users';

@Domain(ComponentContribution)
export class CollaborationUsersContribution implements ComponentContribution {
  registerComponent(registry: ComponentRegistry): void {
    registry.register(CollaborationUsersId, {
      id: CollaborationUsersId,
      component: CollaborationUsersView,
    });
  }
}
