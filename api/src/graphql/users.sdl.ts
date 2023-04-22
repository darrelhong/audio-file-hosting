export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    # hashedPassword: String!
    # salt: String!
    # resetToken: String
    # resetTokenExpiresAt: DateTime
    audioFiles: [AudioFile]!
  }

  type Query {
    users: [User!]! @requireAuth
    user: User! @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User! @requireAuth
  }
`
