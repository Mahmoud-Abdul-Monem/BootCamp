import { useState, type SubmitEvent } from "react";
import vMark from "../assets/Icon.svg";
import plusIcon from "../assets/+.svg";
import { useTasks } from "../context/TaskContext";

type Props = {};

export default function TaskForm({ }: Props) {
    const { addTask } = useTasks();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTask(title, desc);
        setTitle("");
        setDesc("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl mt-6 flex flex-col gap-2 justify-center p-3"
        >
            <div className="flex justify-between items-center gap-2">
                <div className="flex gap-2 items-center flex-1">
                    <img src={vMark} className="w-4 h-4 shrink-0" alt="" />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        className="w-full font-normal text-[14px] outline-0 bg-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className="cursor-pointer bg-[#4F46E5] flex p-2 justify-center items-center gap-1 text-white rounded-lg shrink-0"
                >
                    <img src={plusIcon} alt="" /> Add Task
                </button>
            </div>

            <input
                id="add-input"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="rounded-lg p-2 bg-[#F2F3FF] outline-0 text-sm"
                placeholder="Add a short description (optional)..."
            />
        </form>
    );
}