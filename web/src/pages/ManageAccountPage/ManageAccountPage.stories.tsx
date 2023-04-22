import type { ComponentMeta } from '@storybook/react'

import ManageAccountPage from './ManageAccountPage'

export const generated = () => {
  return <ManageAccountPage />
}

export default {
  title: 'Pages/ManageAccountPage',
  component: ManageAccountPage,
} as ComponentMeta<typeof ManageAccountPage>
