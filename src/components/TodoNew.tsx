import React from 'react'
import { ActionFunction, Form, useActionData, useNavigate } from 'react-router-dom'
import '../styles/modal.css'

type Props = {}

export const TodoNew: React.FC<Props> = () => {
  const navigate = useNavigate()
  const actionData = useActionData()

  console.log('\n', `actionData = `, actionData, '\n')

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Form method="post">
          <div className="mb-2">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
              name="email-address"
              id="email-address"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

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
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export const action: ActionFunction = async ({ params, request }) => {
  console.log('\n', `hello new Todo action `, '\n')
  const formData = await request.formData()
  const formEntries = Object.fromEntries(formData) as unknown as any

  const response = new Response(JSON.stringify(formEntries), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; utf-8',
    },
  })

  return response
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
