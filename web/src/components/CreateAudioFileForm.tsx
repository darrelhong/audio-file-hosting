import { CreateAudioFileMutation } from 'types/graphql'
import { CreateAudioFileMutationVariables } from 'types/graphql'

import {
  Form,
  SelectField,
  Submit,
  SubmitHandler,
  TextField,
} from '@redwoodjs/forms'
import { FormError } from '@redwoodjs/forms'
import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

const CREATE_AUDIO_FILE = gql`
  mutation CreateAudioFileMutation($input: CreateAudioFileInput!) {
    createAudioFile(input: $input) {
      id
    }
  }
`

type AudioFormValues = {
  description: string
  category: string
}

export const CreateAudioFileForm = () => {
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation<
    CreateAudioFileMutation,
    CreateAudioFileMutationVariables
  >(CREATE_AUDIO_FILE, {
    onCompleted: () => {
      formMethods.reset()
      toast.success('File submitted')
    },
  })

  const onSubmit: SubmitHandler<AudioFormValues> = (data) => {
    console.log(data)
    create({ variables: { input: data } })
  }

  return (
    <>
      <Toaster />
      <h3>Create new file</h3>
      <div className="w-full">
        <Form
          onSubmit={onSubmit}
          className="form-control"
          formMethods={formMethods}
        >
          <FormError
            error={error}
            wrapperClassName="bg-error rounded p-3"
            titleClassName="m-0"
            listClassName="m-0"
            listItemClassName="m-0"
          />

          <label className="label" htmlFor="description">
            Description
          </label>
          <TextField
            name="description"
            required
            validation={{ required: true }}
            className="input-bordered input"
            errorClassName="input-bordered input input-error"
          />

          <label className="label" htmlFor="category">
            Category
          </label>
          <SelectField
            name="category"
            required
            validation={{ required: true }}
            className="input-bordered input"
            errorClassName="input-bordered input input-error"
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="sound-effect">Sound Effect</option>
            <option value="recording">Recording</option>
          </SelectField>

          <Submit
            disabled={loading}
            className="btn-primary btn mt-4 self-start"
          >
            Submit
          </Submit>
        </Form>
      </div>
    </>
  )
}
