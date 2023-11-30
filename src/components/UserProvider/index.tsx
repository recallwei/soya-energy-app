import { memo, type PropsWithChildren } from 'react'

import { useAuthStore } from '@/store'

const UserProvider = memo((props: PropsWithChildren) => {
  const authStore = useAuthStore()

  return authStore.isUser() ? <>{props.children}</> : null
})

export default UserProvider
