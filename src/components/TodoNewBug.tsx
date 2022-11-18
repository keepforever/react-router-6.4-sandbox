import React from 'react'
import { ActionFunction, Form, json, redirect, useNavigate, useRouteError } from 'react-router-dom'
import '../styles/modal.css'
import { throw404 } from '../utils'

export const action: ActionFunction = async ({ params, request }) => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const formData = await request.formData()
  const action = formData.get('_action')
  const formEntries = Object.fromEntries(formData) as unknown as any

  console.log(`
  #########################################################
                  TodoNew action
  #########################################################
  `)
  console.log('\n', `formEntries = `, formEntries, '\n')
  console.log('\n', `action = `, action, '\n')
  console.log(`
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  #########################################################
  `)
  /* mutate server data */
  // wait for 2 seconds to simulate a mutation

  if (action === 'fail') {
    try {
      throw404()
    } catch (error) {
      return json({
        errors: {
          lastName: 'Last name is required',
          emailAddress: 'Email address is required',
        },
      })
    }
  }

  return redirect('/todos')
}
type Props = {}
/* TodoNewBug component is an example of a bug that breaks default browser behavior and, by consequence, react-router action/loader paradigm */
export const TodoNewBug: React.FC<Props> = () => {
  const navigate = useNavigate()

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        onClick={ev => {
          console.log('\n', `❌ Bug starts here`, '\n')
          ev.preventDefault()
          ev.stopPropagation()
        }}
      >
        {/* form to create a dodo */}
        <Form method="post">
          <input type="text" placeholder="Go on..." />
          <button type="submit">Submit</button>
        </Form>

        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

type ErrorProps = {}

export const TodoNewError: React.FC<ErrorProps> = props => {
  const error = useRouteError() as any

  return (
    <div>
      <h3>TodoError</h3>
      <code>{error.data.message}</code>
    </div>
  )
}
