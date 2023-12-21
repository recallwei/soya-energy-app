import * as yup from 'yup'

import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'Validation')

export const createPlantSchema = yup
  .object({
    plantName: yup.string().required(() => t('Plant.Name.Not.Null')),
    systemPower: yup.string().required(() => t('Capacity.Not.Null')),
    country: yup.string().required(() => t('Country.Region.Not.Null')),
    timeZone: yup.string().required(() => t('Time.Zone.Not.Null')),
    address: yup.string().required(() => t('Address.Not.Null')),
    type: yup.string().required(() => t('Plant.Type.Not.Null')),
    moduleNum: yup.string().optional(),
    pvPanelAzimuth: yup.string().optional(),
    pvPanelAngle: yup.string().optional()
  })
  .required()
