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
          <input name="title" id="title" type="text" placeholder="Go on..." />
          <button type="submit">Submit</button>
        </Form>

        <button onClick={() => navigate(-1)}>Cancel</button>
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
