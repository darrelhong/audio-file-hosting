import { MetaTags } from '@redwoodjs/web'

import ManageAccountFormCell from 'src/components/ManageAccountFormCell/ManageAccountFormCell'

const ManageAccountPage = () => {
  return (
    <>
      <MetaTags title="ManageAccount" description="ManageAccount page" />

      <div className="prose mx-auto px-6">
        <h1>Manage Account</h1>

        <ManageAccountFormCell />
      </div>
    </>
  )
}

export default ManageAccountPage
