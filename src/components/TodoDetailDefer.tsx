import React, { Suspense } from 'react'
import { Await, defer, LoaderFunction, useAsyncValue, useLoaderData, useMatches } from 'react-router-dom'
import { getSlowTodo } from '../api'
import { Todo } from '../interfaces'
import { LoadingElement, ErrorElement } from './Todos/components'

type Props = {}

export const TodoDetailDefer: React.FC<Props> = props => {
  const loaderData = useLoaderData() as any
  /* leverage useMatches to have access to any/all parent route data.  Can target by 'id' */
  const matches = useMatches()
  const rootLoaderData = matches.find(match => match.id === 'root')?.data
  const todosLoaderData = matches.find(match => match.id === 'todos')?.data

  // console.group(`%cTodoDetail.tsx:`, 'color: yellow; font-size: 13px; font-weight: bold;')
  // console.log('\n', `matches = `, matches, '\n')
  // console.log('\n', `rootLoaderData = `, rootLoaderData, '\n')
  // console.log('\n', `todosLoaderData = `, todosLoaderData, '\n')
  // console.groupEnd()

  return (
    <>
      <p className="text-2xl">TodoDetail is coral</p>
      <Suspense fallback={<LoadingElement />}>
        <Await resolve={loaderData.todo} errorElement={<ErrorElement />}>
          <AsyncTodo />
        </Await>
      </Suspense>
    </>
  )
}

export const loader: LoaderFunction = async ({ params }) => {
  return defer({
    todo: getSlowTodo(params?.id || ''),
  })
}

export const AsyncTodo: React.FC<Props> = props => {
  const todo = useAsyncValue() as Todo
  // console.log('\n', `todo = `, todo, '\n')
  return (
    <div className="flex justify-around pb-4 flex-wrap gap-2">
      <div style={{ backgroundColor: 'coral', padding: '12px 10px', marginTop: 12 }}>
        <h2 className="text-2xl">#: {todo.id}</h2>
        <h2 className="text-2xl">Title: {todo.title}</h2>
      </div>
    </div>
  )
}
