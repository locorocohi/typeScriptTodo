import { Task } from "../models/todo";
import { config } from "../config";

export const addTaskInDb = async (options: {text: string}): Promise<Task> => {
  const res = await fetch(`http://${config.HOST}:${config.PORT}/api/todos/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(options)
  })

  return res.json();
}

export const getTodos = async ()=> {
  const response = await fetch(`http://${config.HOST}:${config.PORT}/api/todos/`);

  return response.json()
}

export const deleteTaskFromDB = async (id: number) => {
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/${id}`, {
    method: 'DELETE'
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

export const completeAllTasksInDN = async () => {
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/complete/all/tasks`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  })
}

export const removeCompletedTasks = async () => {
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/remove/completed`, {method: 'DELETE'})
}

export const saveTaskText = async (text: string, id:number) => {
  console.log(JSON.stringify(text))
  await fetch(`http://${config.HOST}:${config.PORT}/api/todos/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({text})
  })
}
