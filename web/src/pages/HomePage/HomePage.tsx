import { MetaTags } from '@redwoodjs/web'

import { CreateAudioFileForm } from 'src/components/CreateAudioFileForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="prose px-6 pt-4">
        <h1 className="mb-4">My files</h1>

        <CreateAudioFileForm />
      </div>
    </>
  )
}

export default HomePage
