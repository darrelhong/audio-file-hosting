import type { AudioFile } from '@prisma/client'

import {
  audioFiles,
  audioFile,
  createAudioFile,
  updateAudioFile,
  deleteAudioFile,
} from './audioFiles'
import type { StandardScenario } from './audioFiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('audioFiles', () => {
  scenario('returns all audioFiles', async (scenario: StandardScenario) => {
    const result = await audioFiles()

    expect(result.length).toEqual(Object.keys(scenario.audioFile).length)
  })

  scenario('returns a single audioFile', async (scenario: StandardScenario) => {
    const result = await audioFile({ id: scenario.audioFile.one.id })

    expect(result).toEqual(scenario.audioFile.one)
  })

  scenario('creates a audioFile', async (scenario: StandardScenario) => {
    const result = await createAudioFile({
      input: {
        description: 'String',
        category: 'String',
        url: 'String',
        userId: scenario.audioFile.two.userId,
      },
    })

    expect(result.description).toEqual('String')
    expect(result.category).toEqual('String')
    expect(result.userId).toEqual(scenario.audioFile.two.userId)
  })

  scenario('updates a audioFile', async (scenario: StandardScenario) => {
    const original = (await audioFile({
      id: scenario.audioFile.one.id,
    })) as AudioFile
    const result = await updateAudioFile({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a audioFile', async (scenario: StandardScenario) => {
    const original = (await deleteAudioFile({
      id: scenario.audioFile.one.id,
    })) as AudioFile
    const result = await audioFile({ id: original.id })

    expect(result).toEqual(null)
  })
})
