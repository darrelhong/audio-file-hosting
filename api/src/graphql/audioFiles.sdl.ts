export const schema = gql`
  type AudioFile {
    id: Int!
    description: String!
    category: String!
    user: User!
    userId: Int!
    url: String!
  }

  type Query {
    audioFiles: [AudioFile!]! @requireAuth
    audioFile(id: Int!): AudioFile @requireAuth
  }

  input CreateAudioFileInput {
    description: String!
    category: String!
    userId: Int
    url: String!
  }

  input UpdateAudioFileInput {
    description: String
    category: String
    userId: Int
    url: String
  }

  type Mutation {
    createAudioFile(input: CreateAudioFileInput!): AudioFile! @requireAuth
    updateAudioFile(id: Int!, input: UpdateAudioFileInput!): AudioFile!
      @requireAuth
    deleteAudioFile(id: Int!): AudioFile! @requireAuth
  }
`
