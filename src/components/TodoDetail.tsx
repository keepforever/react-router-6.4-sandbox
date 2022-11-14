import React from 'react'
import { ActionFunction, json, LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { throwIf404 } from '../utils'

type Props = {}

export const TodoDetail: React.FC<Props> = props => {
  const todo = useLoaderData() as any
  return (
    <div style={{ backgroundColor: 'coral', padding: '12px 10px', marginTop: 12 }}>
      <h2 className="text-2xl">#: {todo.id}</h2>
      <h2 className="text-2xl">Title: {todo.title}</h2>
      <small>TodoDetail is coral</small>
    </div>
  )
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
  throwIf404(res)
  const data = await res.json()
  return json(data, { status: 200 })
}

export const action: ActionFunction = async ({ params, request }) => {
  return () => {}
}
