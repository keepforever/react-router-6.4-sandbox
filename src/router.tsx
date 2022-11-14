import { createBrowserRouter } from 'react-router-dom'
import { Todos, loader as todosLoader } from './components/Todos'

import { loader as alphaChildLoader, TodoDetail } from './components/TodoDetail'
import { loader as appLoader, App, AppError } from './App'

import { TodoNew, action as newTodoAction } from './components/TodoNew'

export const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: <App />,
      loader: appLoader,
      errorElement: <AppError />,
      id: 'root',
      children: [
        {
          path: `todos`,
          element: <Todos />,
          loader: todosLoader,
          id: 'todos',
          children: [
            {
              id: 'todos/new',
              path: `new`,
              element: <TodoNew />,
              action: newTodoAction,
            },
            {
              id: 'todos/:id',
              path: `:id`,
              element: <TodoDetail />,
              loader: alphaChildLoader,
            },
          ],
        },
      ],
    },
  ],
  {},
)
