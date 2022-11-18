import React from 'react'
import { Link, useAsyncValue } from 'react-router-dom'
import { Todo } from '../../../interfaces'
import { tailwindStylesHelper } from '../../../styles'

type Props = {}

export const AsyncTodosRenderPropAlternative: React.FC<Props> = props => {
  const todos = useAsyncValue() as Todo[]
  return (
    <div className="flex justify-around pb-4 flex-wrap gap-2">
      {(todos || [])
        ?.filter((todo, index: any) => {
          return index < 5
        })
        ?.map(todo => {
          return (
            <Link className={tailwindStylesHelper.link} key={todo.title} to={String(todo.id)}>
              slow: {todo.id}
            </Link>
          )
        })}
    </div>
  )
}
