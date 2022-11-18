import { createBrowserRouter } from 'react-router-dom'

import { loader as alphaChildLoader, TodoDetail } from './components/TodoDetail'
import { loader as appLoader, App, AppError } from './App'
import { TodoNew, TodoNewError, action as newTodoAction } from './components/TodoNew'
import { Todos, loader as todosLoader } from './components/Todos'

export const router = createBrowserRouter(
  [
    {
      id: 'root',
      element: <App />,
      errorElement: <AppError />,
      loader: appLoader,
      path: `/`,
      children: [
        {
          id: 'todos',
          path: `todos`,
          element: <Todos />,
          loader: todosLoader,
          children: [
            {
              id: 'todos/new',
              path: `new`,
              element: <TodoNew />,
              action: newTodoAction,
              errorElement: <TodoNewError />,
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
