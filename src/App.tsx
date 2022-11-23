import { useContext } from 'react'
import { json, Link, LoaderFunction, Outlet, useLoaderData, useRouteError } from 'react-router-dom'
import { StateContext } from './components/Context'
import './index.css'

export const loader: LoaderFunction = async ({ params, request }) => {
  console.log('\n', `hello App.tsx loader `, '\n')
  const data = { foo: 'bar' }
  return json(data, { status: 200 })
}

export const App = () => {
  const loaderData = useLoaderData()
  // const context = useContext(StateContext)
  console.group(`%cApp.tsx`, 'color: yellow; font-size: 13px; font-weight: bold;')
  // console.log('\n', `context?.auth = `, context?.auth, '\n')
  console.log('\n', `hello App.tsx `, '\n')
  console.groupEnd()
  return (
    <div className="bg-blue-300 p-6 mx-auto max-w-4xl h-screen">
      <h2>App.tsx is light blue</h2>
      <nav>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Link to="/">HOME</Link>
          <Link to="/todos">todos</Link>
          <Link to="/todos/new">new todo</Link>
          <Link to="/form-test">Form Test</Link>
          <button
            onClick={() => {
              // context?.setAuth?.('token')
              console.log('\n', `set token on click `, '\n')
            }}
          >
            Set Auth
          </button>
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
