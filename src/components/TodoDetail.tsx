import React from 'react'
import { json, LoaderFunction, useLoaderData, useMatches, useNavigate } from 'react-router-dom'
import { throwIf404 } from '../utils'

type Props = {}

export const TodoDetail: React.FC<Props> = props => {
  const todo = useLoaderData() as any
  /* leverage useMatches to have access to any/all parent route data.  Can target by 'id' */
  const matches = useMatches()
  const rootLoaderData = matches.find(match => match.id === 'root')?.data
  const todosLoaderData = matches.find(match => match.id === 'todos')?.data

  console.group(`%cTodoDetail.tsx: ${todo.id}`, 'color: yellow; font-size: 13px; font-weight: bold;')
  console.log('\n', `matches = `, matches, '\n')
  console.log('\n', `rootLoaderData = `, rootLoaderData, '\n')
  console.log('\n', `todosLoaderData = `, todosLoaderData, '\n')
  console.groupEnd()

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
