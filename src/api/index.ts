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

export const getSlowTodo = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  // console.log('\n', `response = `, response, '\n')
  if (!response.ok) {
    throw new Response('Failed to fetch post.', { status: 500 })
  }
  return response.json()
}
