import { Avatar, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { type UserInfo } from '@opensumi/ide-collaboration';
import { ICollaborationService } from '@opensumi/ide-collaboration/lib/common';
import { useInjectable } from '@opensumi/ide-core-browser';

import styles from './collaboration-users.module.less';

type UserState = UserInfo & {
  avatar: string;
};

interface UserInfoObj {
  'user-info': UserState;
}

export const CollaborationUsersView: React.FC = () => {
  const collaborationService = useInjectable<ICollaborationService>(ICollaborationService);
  const [users, setUsers] = useState<UserState[]>([]);

  useEffect(() => {
    if (!collaborationService) {
      return;
    }

    const updateUsers = () => {
      try {
        const awareness = (collaborationService as any).yWebSocketProvider?.awareness;
        if (!awareness) {
          return;
        }

        const states = awareness.getStates() as Map<number, UserInfoObj>;
        const userMap = new Map<string, UserState>();

        states.forEach((state: UserInfoObj) => {
          const userInfo = state['user-info'];

          if (userInfo && userInfo.nickname) {
            const userId = userInfo.id;

            // 排除当前用户 & 去重
            if (userId && !userMap.has(userId)) {
              userMap.set(userId, {
                id: userId,
                nickname: userInfo.nickname,
                avatar: userInfo.avatar,
              });
            }
          }
        });

        setUsers(Array.from(userMap.values()));
      } catch (error) {
        // console.error('Error updating users:', error);
      }
    };

    // 初始更新
    // updateUsers();

    // 监听 awareness 变化
    try {
      const awareness = (collaborationService as any).yWebSocketProvider?.awareness;
      if (awareness) {
        awareness.on('update', updateUsers);

        return () => {
          awareness.off('update', updateUsers);
        };
      }
    } catch (error) {
      // console.error('Error setting up awareness listener:', error);
    }
  }, [collaborationService]);

  // 只有当前用户或没有用户时不展示
  if (users.length === 0) {
    return null;
  }

  return (
    <div className={styles['collaboration-users']}>
      <div className={styles['collaboration-users-avatars']}>
        {users.slice(0, 3).map((userState) => (
          <Tooltip
            key={userState.id}
            title={`${userState.nickname}当前正在访问当前实验，多人同时操作可能卡顿、导致文件相互覆盖或环境配置冲突。`}
          >
            <Avatar src={userState.avatar} size={24} />
          </Tooltip>
        ))}
        {users.length > 3 && (
          <Tooltip title={`共有 ${users.length} 位用户正在访问当前实验`}>
            <div className={styles['collaboration-users-count']}>+{users.length - 3}</div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
