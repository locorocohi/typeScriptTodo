import { Task } from "../components/TodoForm";

export const addTaskInDb = async (task: Task) => {
  await fetch('http://localhost:5009/api/todos/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(task)
  })
}

export const getTodos = async ()=> {
  const response = await fetch('http://localhost:5009/api/todos/');

  return response.json()
}