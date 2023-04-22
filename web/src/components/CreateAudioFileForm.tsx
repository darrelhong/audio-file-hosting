import { Form, SelectField, SubmitHandler, TextField } from '@redwoodjs/forms'

type AudioFormValues = {
  description: string
  category: string
}

export const CreateAudioFileForm = () => {
  const onSumbit: SubmitHandler<AudioFormValues> = (data) => {
    console.log(data)
  }

  return (
    <>
      <h3>Create new file</h3>
      <div className="w-full">
        <Form
          onSubmit={onSumbit}
          config={{ mode: 'onBlur' }}
          className="form-control"
        >
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

          <button className="btn-primary btn mt-4 self-start">Submit</button>
        </Form>
      </div>
    </>
  )
}
