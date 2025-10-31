'use client';

import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useTaskStore } from '../../store/useStore';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
}

export default function DashboardPage() {
  const { tasks, setTasks, addTask, updateTask, removeTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get<Task[]>('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const handleCreate = async () => {
    if (!title || !description) return;

    try {
      const res = await axios.post<Task>('/tasks', { title, description });
      addTask(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`);
      removeTask(id);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus: Task['status'] =
      task.status === 'todo'
        ? 'in-progress'
        : task.status === 'in-progress'
          ? 'done'
          : 'todo';

    try {
      const res = await axios.put<Task>(`/tasks/${task.id}`, { status: newStatus });
      updateTask(res.data);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSave = async (id: number) => {
    try {
      const res = await axios.put<Task>(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
      });
      updateTask(res.data);
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Tasks Dashboard</h1>

      <div className="mb-6 flex gap-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-4 mb-3 rounded-lg flex justify-between items-center shadow-sm"
          >
            <div className="flex-1">
              {editingId === task.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 mb-1 w-full rounded"
                  />
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                </>
              ) : (
                <>
                  <h2 className="font-bold text-lg">{task.title}</h2>
                  <p className="text-gray-700">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{task.status}</p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {editingId === task.id ? (
                <>
                  <button
                    onClick={() => handleEditSave(task.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
