import { useQuery } from '@tanstack/react-query'

import { InverterAPI } from '@/api'

interface Props {
  id: string
}

export const useInverterDetailQuery = (props: Props) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [InverterAPI.DETAIL_QUERY_KEY, props.id],
    queryFn: () => InverterAPI.detail(props.id),
    select: (res) => res.data
  })

  return {
    detail: data ?? {},
    isLoading: isFetching,
    refetch
  }
}
