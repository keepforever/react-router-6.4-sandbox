import React from 'react'
import { ActionFunction, json, Link, LoaderFunction, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { throwIf404 } from '../utils'

type Props = {}

export const Todos: React.FC<Props> = props => {
  const data = useLoaderData() as any[]
  return (
    <div
      style={{
        backgroundColor: 'lightgreen',
      }}
    >
      <h3>Todos is light green</h3>
      <div className="flex justify-around pb-4">
        {data.map((todo, index) => {
          return (
            <Link
              className="inline-flex bg-origin-border px-5 py-3 border border-transparent text-lg text-black font-medium rounded-md shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-otc-mustard no-underline"
              key={todo.title}
              to={String(todo.id)}
            >
              todo: {todo.id}
            </Link>
          )
        })}
      </div>
      <Outlet />
    </div>
  )
}

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  throwIf404(res)
  const data = (await res.json()) as any[]
  return json(data.splice(0, 5), { status: 200 })
}

export const action: ActionFunction = async ({ params, request }) => {
  return () => {}
}
