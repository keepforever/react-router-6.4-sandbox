import React, { Suspense } from 'react'
import { ActionFunction, json, Link, LoaderFunction, Outlet, useLoaderData, Await, defer } from 'react-router-dom'

import { throw404, throwIf404 } from '../../utils'
import { ErrorElement } from './components'
import { Todo } from '../../interfaces'
import { getSlowTodos } from '../../api'
import { tailwindStylesHelper } from '../../styles'

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  // throw404(res)
  throwIf404(res)
  const todosFast = (await res.json()) as Todo[]

  return defer({
    // `getSlowTodos` returns a promise, and, since we're NOT awaiting it, React Router will not block rendering of the /todos route
    todosSlow: getSlowTodos(),
    // if you await `getSlowTodos` here, React Router will block rendering of the /todos route until the promise resolves
    // awaitedTodosSlow: await getSlowTodos(),

    todosFast, // todos fast was already resolved, so it will be available immediately
  })
}

export const action: ActionFunction = async ({ params, request }) => {
  return () => {}
}

type Props = {}

export const Todos: React.FC<Props> = props => {
  const loaderData = useLoaderData() as { todosSlow: Promise<Todo[]>; todosFast: Todo[] }
  console.log('\n', `loaderData = `, loaderData, '\n')

  return (
    <div
      style={{
        backgroundColor: 'lightgreen',
      }}
    >
      <h3>Todos is light green</h3>
      <Suspense
        fallback={
          <>
            <h1 className="text-3xl">Loading...</h1>
          </>
        }
      >
        <Await resolve={loaderData.todosSlow} errorElement={<ErrorElement />}>
          {todos => (
            <div className="flex justify-around pb-4 flex-wrap gap-2">
              {(todos || [])
                ?.filter((t: any, index: any) => {
                  return index < 5
                })
                ?.map((todo: any, index: number) => {
                  return (
                    <Link className={tailwindStylesHelper.link} key={todo.title} to={String(todo.id)}>
                      slow: {todo.id}
                    </Link>
                  )
                })}
            </div>
          )}
        </Await>
      </Suspense>

      <p className="text-2xl mt-8">Fast Todos</p>

      <div className="flex justify-around pb-4 flex-wrap gap-2">
        {loaderData.todosFast.map((todo, index: number) => {
          if (index < 5) {
            return (
              <Link className={tailwindStylesHelper.link} key={todo.title} to={String(todo.id)}>
                Fast: {todo.id}
              </Link>
            )
          } else {
            return null
          }
        })}
      </div>

      <Outlet />
    </div>
  )
}
