import { json } from 'react-router-dom'

export const throwIf404 = (res: Response) => {
  if (res.status === 404) {
    throw json(
      {
        message: 'There has been a 404',
        foo: 'bar',
      },
      { status: 404, statusText: 'Status Text' },
    )
  }
}

export const throw404 = (res?: Response) => {
  throw json(
    {
      message: 'There has been a 404',
      foo: 'bar',
    },
    { status: 404, statusText: 'Status Text' },
  )
}
