import { Task } from "../components/TodoForm";
import { config } from "../config";

export const addTaskInDb = async (task: Task) => {
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(task)
  })
}

export const getTodos = async ()=> {
  const response = await fetch(`http://${config.HOST}:${config.PORT}/api/todos/`);

  return response.json()
}

export const deleteTaskFromDB = async (id: number) => {
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(id)
  })
}

export const completeTaskInDB = async (id: number) => {
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/complete/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  })
}

