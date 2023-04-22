import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserQuery,
} from 'types/graphql'

import {
  Form,
  FormError,
  Submit,
  SubmitHandler,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

export const QUERY = gql`
  query UserQuery {
    user {
      email
      name
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { error, loading }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      toast.success('User updated')
      formMethods.setValue('name', updateUser.name)
    },
  })

  const onSubmit: SubmitHandler<{ name?: string }> = (data) => {
    const { name } = data
    if (!name || name === user.name) {
      toast.error('No changes made')
      return
    }
    create({ variables: { input: { name } } })
  }

  return (
    <Form
      className="form-control"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      <FormError
        error={error}
        wrapperClassName="bg-error rounded p-3"
        titleClassName="m-0"
        listClassName="m-0"
        listItemClassName="m-0"
      />
      <label className="label" htmlFor="email">
        Email
      </label>
      <TextField
        name="email"
        defaultValue={user.email}
        disabled
        className="input-bordered input"
      />

      <label className="label" htmlFor="name">
        Name
      </label>
      <TextField
        name="name"
        required
        validation={{ required: true }}
        defaultValue={user.name}
        className="input-bordered input"
        errorClassName="input-bordered input input-error"
      />

      <Submit disabled={loading} className="btn-primary btn mt-4 self-start">
        Update
      </Submit>
    </Form>
  )
}
