import { UserQuery } from 'types/graphql'

import { Form, Submit, TextField } from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query UserQuery {
    user {
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-error">Error: {error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<UserQuery>) => {
  return (
    <Form className="form-control">
      <label className="label" htmlFor="email">
        Email
      </label>
      <TextField
        name="email"
        disabled
        className="input-bordered input"
        value={user.email}
      />

      <label className="label" htmlFor="name">
        Name
      </label>
      <TextField
        name="name"
        value={user.name}
        required
        validation={{ required: true }}
        className="input-bordered input"
        errorClassName="input-bordered input input-error"
      />

      <Submit className="btn-primary btn mt-4 self-start">Update</Submit>
    </Form>
  )
}
