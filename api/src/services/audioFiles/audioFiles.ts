import type {
  QueryResolvers,
  MutationResolvers,
  AudioFileRelationResolvers,
} from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const audioFiles: QueryResolvers['audioFiles'] = () => {
  return db.audioFile.findMany({ where: { userId: context.currentUser.id } })
}

export const audioFile: QueryResolvers['audioFile'] = ({ id }) => {
  return db.audioFile.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createAudioFile: MutationResolvers['createAudioFile'] = ({
  input,
}) => {
  return db.audioFile.create({
    data: input,
  })
}

const verifyOwnership = async (id) => {
  if (await audioFile({ id })) {
    return true
  } else {
    throw new ForbiddenError('You do not own this audio file')
  }
}

export const updateAudioFile: MutationResolvers['updateAudioFile'] = async ({
  id,
  input,
}) => {
  await verifyOwnership(id)

  return db.audioFile.update({
    data: input,
    where: { id },
  })
}

export const deleteAudioFile: MutationResolvers['deleteAudioFile'] = async ({
  id,
}) => {
  await verifyOwnership(id)

  return db.audioFile.delete({
    where: { id },
  })
}

export const AudioFile: AudioFileRelationResolvers = {
  user: (_obj, { root }) => {
    return db.audioFile.findUnique({ where: { id: root?.id } }).user()
  },
}
