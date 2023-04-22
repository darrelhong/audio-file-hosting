import type { AudioFilesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query AudioFilesQuery {
    audioFiles {
      id
      description
      category
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-error">Error: {error?.message}</div>
)

export const Success = ({ audioFiles }: CellSuccessProps<AudioFilesQuery>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <td>Id</td>
            <td>Description</td>
            <td>Category</td>
            <td>URL</td>
          </tr>
        </thead>
        <tbody>
          {audioFiles.map((audioFile) => (
            <tr key={audioFile.id}>
              <td>{audioFile.id}</td>
              <td>{audioFile.description}</td>
              <td>{audioFile.category}</td>
              <td>
                <audio controls preload="metadata">
                  <source src={audioFile.url} />
                </audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
