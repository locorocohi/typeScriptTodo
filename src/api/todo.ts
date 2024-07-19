export const addTask = async () => {
}

export const getTodos = async ()=> {
  const response = await fetch('http://localhost:5009/api/todos/');

  return response.json()
}