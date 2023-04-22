import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ input }) => {
  return db.user.update({ data: input, where: { id: context.currentUser.id } })
}

export const deleteUser: MutationResolvers['deleteUser'] = () => {
  return db.user.update({
    data: { disabled: true },
    where: { id: context.currentUser.id },
  })
}

export const User: UserRelationResolvers = {
  audioFiles: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).audioFiles()
  },
}
