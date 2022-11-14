import React from 'react'
import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useMatches,
  useNavigate,
  useNavigation,
  useRouteError,
} from 'react-router-dom'
import '../styles/modal.css'
import { throw404 } from '../utils'

type Props = {}

export const TodoNew: React.FC<Props> = () => {
  const navigate = useNavigate()
  const actionData = useActionData() as unknown as any
  const { formData, state: navState } = useNavigation()
  const formEntries = Object.fromEntries(formData || []) as unknown as any

  /* leverage useMatches to have access to any/all parent route data.  Can target by 'id' */
  const matches = useMatches()
  const rootLoaderData = matches.find(match => match.id === 'root')?.data
  const todosLoaderData = matches.find(match => match.id === 'todos')?.data

  console.group(`%cTodoNew.tsx`, 'color: #ffffff; font-size: 13px; font-weight: bold;')
  console.log('\n', `navState = `, navState, '\n')
  console.log('\n', `formEntries = `, formEntries, '\n')
  console.log('\n', `actionData = `, actionData, '\n')
  console.log('\n', `matches = `, matches, '\n')
  console.log('\n', `rootLoaderData = `, rootLoaderData, '\n')
  console.log('\n', `todosLoaderData = `, todosLoaderData, '\n')
  console.groupEnd()

  const isSubmitting = navState === 'submitting'

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Form method="post">
          <p className="text-2xl mb-2">New Todo Modal</p>
          <div className="mb-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              required
              id="lastName"
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="flex text-red-600 font-bold">{actionData?.errors?.lastName}</div>
          </div>

          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
              name="emailAddress"
              required
              id="emailAddress"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="flex text-red-600 font-bold">{actionData?.errors?.emailAddress}</div>
          </div>

          {isSubmitting && <div className="text-4xl">Submitting...</div>}

          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="rounded-md border border-gray-700 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              name="_action"
              value="success"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>

            <button
              type="submit"
              name="_action"
              value="fail"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Submit With Error
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

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

// export const TodoNew: React.FC<Props> = () => {
//   const navigate = useNavigate()

//   return (
//     <div className="modal-overlay" onClick={() => navigate(-1)}>
//       <div
//         className="modal"
//         onClick={ev => {
//           ev.preventDefault()
//           ev.stopPropagation()
//         }}
//       >
//         {/* form to create a dodo */}
//         <Form method="post">
//           <input type="text" placeholder="Go on..." />
//           <button type="submit">Submit</button>
//         </Form>

//         <button onClick={() => navigate(-1)}>Cancel</button>
//       </div>
//     </div>
//   )
// }
