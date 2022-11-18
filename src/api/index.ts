export const getSlowTodos = async () => {
  // wait two seconds
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  if (!response.ok) {
    throw new Response('Failed to fetch posts.', { status: 500 })
  }
  /* this works */
  return response.json()

  /* this ALSO works, but, I'm not sure why */
  // const payload = await response.json()
  // return payload
}
