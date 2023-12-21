import { useQuery } from '@tanstack/react-query'

import { UserAPI } from '@/api'
import { CacheUtils } from '@/utils'

export const useCustomersQuery = () => {
  const queryResult = useQuery({
    queryKey: [UserAPI.CUSTOMER_LIST_QUERY_KEY],
    queryFn: () => UserAPI.getUserList(),
    select: (res) => {
      CacheUtils.fetchBlob(
        (res.data ?? []).filter((item) => item.avatar).map((item) => item.avatar!)
      )
      return res.data
    }
  })

  return { customerList: queryResult.data, queryResult }
}
