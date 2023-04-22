import { useState } from 'react'

import { CreateAudioFileMutation } from 'types/graphql'
import { CreateAudioFileMutationVariables } from 'types/graphql'

import {
  Form,
  InputField,
  SelectField,
  Submit,
  SubmitHandler,
  TextField,
} from '@redwoodjs/forms'
import { FormError } from '@redwoodjs/forms'
import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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
  'audio-file': FileList
}

export const CreateAudioFileForm = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [loading, setLoading] = useState(false)

  const [create, { error }] = useMutation<
    CreateAudioFileMutation,
    CreateAudioFileMutationVariables
  >(CREATE_AUDIO_FILE, {
    onCompleted: () => {
      formMethods.reset()
      toast.success('File submitted')
    },
    refetchQueries: ['AudioFilesQuery'],
  })

  const onSubmit: SubmitHandler<AudioFormValues> = async (data) => {
    console.log(data)
    setLoading(true)
    try {
      // upload file to filestack
      const resp = await fetch(
        `https://www.filestackapi.com/api/store/S3?${new URLSearchParams({
          key: process.env.REDWOOD_ENV_FILESTACK_API_KEY,
        })}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'audio/mp3',
          },
          body: data['audio-file'][0],
        }
      )
      const { url } = await resp.json()
      if (!url) {
        throw new Error('File upload failed')
      }
      const { description, category } = data

      create({
        variables: {
          input: {
            description,
            category,
            url,
          },
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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

          <label className="label" htmlFor="audio-file">
            Audio file
          </label>
          <InputField
            className="file-input-bordered file-input w-full"
            type="file"
            required
            name="audio-file"
            accept="audio/mp3"
          />
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
