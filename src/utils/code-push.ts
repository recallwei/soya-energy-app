import CodePush from 'react-native-code-push'

import { globalEnvConfig } from '@/env'

const syncStatusMap = new Map<number, string>([
  [CodePush.SyncStatus.UP_TO_DATE, '已经是最新版本'],
  [CodePush.SyncStatus.UPDATE_INSTALLED, '更新完成'],
  [CodePush.SyncStatus.UPDATE_IGNORED, '用户取消更新'],
  [CodePush.SyncStatus.UNKNOWN_ERROR, '未知错误'],
  [CodePush.SyncStatus.SYNC_IN_PROGRESS, '正在更新'],
  [CodePush.SyncStatus.CHECKING_FOR_UPDATE, '正在检查更新'],
  [CodePush.SyncStatus.AWAITING_USER_ACTION, '等待用户操作'],
  [CodePush.SyncStatus.DOWNLOADING_PACKAGE, '正在下载更新'],
  [CodePush.SyncStatus.INSTALLING_UPDATE, '正在安装更新']
])

export class CodePushUtils {
  static async syncCode() {
    if (globalEnvConfig.APP_ENVIRONMENT !== 'DEV') {
      await CodePush.sync(
        {
          updateDialog: {
            title: '更新提示',
            appendReleaseDescription: true,
            descriptionPrefix: '更新内容：',
            mandatoryContinueButtonLabel: '立即更新',
            mandatoryUpdateMessage: '有新版本了，请您及时更新',
            optionalIgnoreButtonLabel: '稍后',
            optionalInstallButtonLabel: '后台更新',
            optionalUpdateMessage: '有新版本了，是否更新？'
          },
          installMode: CodePush.InstallMode.IMMEDIATE
        },
        (status) => console.log(`[CodePush] ${syncStatusMap.get(status)}`)
      )
    } else {
      console.log('[CodePush] DEV 环境下不更新代码推送')
    }
  }
}
