import type { Prisma, AudioFile } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AudioFileCreateArgs>({
  audioFile: {
    one: {
      data: {
        description: 'String',
        category: 'String',
        user: {
          create: {
            email: 'String5289149',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        description: 'String',
        category: 'String',
        user: {
          create: {
            email: 'String2080340',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<AudioFile, 'audioFile'>
