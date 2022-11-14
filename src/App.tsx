import { json, Link, LoaderFunction, Outlet, useLoaderData, useRouteError } from 'react-router-dom'
import './index.css'

export const loader: LoaderFunction = async ({ params, request }) => {
  const data = { foo: 'bar' }

  return json(data, { status: 200 })
}

export const App = () => {
  const loaderData = useLoaderData()

  return (
    <div
      className="bg-blue-300"
      style={{
        outline: '1px solid white',
        padding: 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '70vw',
      }}
    >
      <h2>App.tsx is light blue</h2>
      <nav>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Link to="/todos">todos</Link>
          <Link to="/todos/new">new todo</Link>
        </div>
      </nav>

      <Outlet />
    </div>
  )
}

type ErrorProps = {}

export const AppError: React.FC<ErrorProps> = props => {
  const error = useRouteError() as any

  return (
    <div>
      <h3>AppError</h3>
      <code>{error.data.message}</code>
    </div>
  )
}
