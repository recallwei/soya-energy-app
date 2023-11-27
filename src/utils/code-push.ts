import type { DownloadProgressCallback, SyncStatusChangedCallback } from 'react-native-code-push'
import CodePush from 'react-native-code-push'

import { globalEnvConfig } from '@/env'
import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Global')

export class CodePushUtils {
  static syncStatusMap = new Map<number, () => string>([
    [CodePush.SyncStatus.UP_TO_DATE, () => t('Code.Push.Sync.Status.Up.To.Date')],
    [CodePush.SyncStatus.UPDATE_INSTALLED, () => t('Code.Push.Sync.Status.Update.Installed')],
    [CodePush.SyncStatus.UPDATE_IGNORED, () => t('Code.Push.Sync.Status.Update.Ignored')],
    [CodePush.SyncStatus.UNKNOWN_ERROR, () => t('Code.Push.Sync.Status.Unknown.Error')],
    [CodePush.SyncStatus.SYNC_IN_PROGRESS, () => t('Code.Push.Sync.Status.Sync.In.Progress')],
    [CodePush.SyncStatus.CHECKING_FOR_UPDATE, () => t('Code.Push.Sync.Status.Checking.For.Update')],
    [
      CodePush.SyncStatus.AWAITING_USER_ACTION,
      () => t('Code.Push.Sync.Status.Awaiting.User.Action')
    ],
    [CodePush.SyncStatus.DOWNLOADING_PACKAGE, () => t('Code.Push.Sync.Status.Downloading.Package')],
    [CodePush.SyncStatus.INSTALLING_UPDATE, () => t('Code.Push.Sync.Status.Installing.Update')]
  ])

  static getUpdateDialogOptions() {
    return {
      title: t('Code.Push.Upload.Dialog.Title'),
      appendReleaseDescription: true,
      descriptionPrefix: t('Code.Push.Upload.Dialog.Description.Prefix'),
      mandatoryContinueButtonLabel: t('Code.Push.Upload.Dialog.Mandatory.Continue.Button.Label'),
      mandatoryUpdateMessage: t('Code.Push.Upload.Dialog.Mandatory.Update.Message'),
      optionalIgnoreButtonLabel: t('Code.Push.Upload.Dialog.Optional.Ignore.Button.Label'),
      optionalInstallButtonLabel: t('Code.Push.Upload.Dialog.Optional.install.Button.Label'),
      optionalUpdateMessage: t('Code.Push.Upload.Dialog.Optional.Update.Message')
    }
  }

  static async syncCode(
    syncStatusChangedCb?: SyncStatusChangedCallback,
    downloadProgressCb?: DownloadProgressCallback
  ) {
    if (globalEnvConfig.APP_ENVIRONMENT !== 'DEV') {
      await CodePush.sync(
        {
          updateDialog: this.getUpdateDialogOptions(),
          mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
          installMode: CodePush.InstallMode.IMMEDIATE
        },
        syncStatusChangedCb,
        downloadProgressCb
      )
    }
  }
}
