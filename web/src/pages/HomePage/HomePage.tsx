import { MetaTags } from '@redwoodjs/web'

import AudioFilesCell from 'src/components/AudioFilesCell'
import { CreateAudioFileForm } from 'src/components/CreateAudioFileForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="prose mx-auto max-w-5xl px-6 pt-4">
        <h1 className="mb-4">My files</h1>

        <CreateAudioFileForm />

        <AudioFilesCell />
      </div>
    </>
  )
}

export default HomePage
