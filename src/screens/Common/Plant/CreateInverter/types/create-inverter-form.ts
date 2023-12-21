import type { InverterCreateModel } from '@/types'

export type CreateInverterForm = Omit<InverterCreateModel, 'id' | 'plantId'>
