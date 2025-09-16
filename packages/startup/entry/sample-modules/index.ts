import { Injectable, Provider } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { AbstractNodeExtProcessService } from '@opensumi/ide-extension/lib/common/extension.service';

import { AINativeContribution } from './ai-native/ai-native.contribution';
import { CollaborationUserInfoContribution } from './collaboration-users/collaboration-user-info.contribution';
import { CollaborationUsersContribution } from './collaboration-users/collaboration-users.contribution';
import { DebugConfigurationContribution } from './debug-configuration.contribution';
import { EditorEmptyComponentContribution } from './editor-empty-component.contribution';
import { MenuBarContribution } from './menu-bar/menu-bar.contribution';
import { OverrideExtensionNodeService } from './overrides/extension/extension-node.service';
import { StatusBarContribution } from './status-bar.contribution';

@Injectable()
export class SampleModule extends BrowserModule {
  providers: Provider[] = [
    MenuBarContribution,
    EditorEmptyComponentContribution,
    StatusBarContribution,
    AINativeContribution,
    DebugConfigurationContribution,
    CollaborationUsersContribution,
    CollaborationUserInfoContribution,
    {
      token: AbstractNodeExtProcessService,
      useClass: OverrideExtensionNodeService,
      override: true,
    },
  ];
}
