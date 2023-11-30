import { memo, type PropsWithChildren } from 'react'

import { useAuthStore } from '@/store'

const InstallerProvider = memo((props: PropsWithChildren) => {
  const authStore = useAuthStore()

  return authStore.isInstaller() ? <>{props.children}</> : null
})

export default InstallerProvider
