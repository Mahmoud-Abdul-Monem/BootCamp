import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { ITask } from "../types/task";

type TaskContextType = {
    tasks: ITask[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    addTask: (title: string, desc?: string) => void;
    toggleTask: (index: number) => void;
    deleteTask: (index: number) => void;
    updateTask: (index: number, title: string, desc?: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export default function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<ITask[]>(() => {
        try {
            const saved = localStorage.getItem("tasks");
            return saved ? (JSON.parse(saved) as ITask[]) : [];
        } catch {
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string, desc?: string) => {
        if (!title.trim()) return;
        const newTask: ITask = {
            title: title.trim(),
            desc: desc?.trim() || undefined,
            isDone: false,
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const toggleTask = (index: number) => {
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const deleteTask = (index: number) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    const updateTask = (index: number, title: string, desc?: string) => {
        if (!title.trim()) return;
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index
                    ? { ...task, title: title.trim(), desc: desc?.trim() || undefined }
                    : task
            )
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                searchQuery,
                setSearchQuery,
                addTask,
                toggleTask,
                deleteTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}