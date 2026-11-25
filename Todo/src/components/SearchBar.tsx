import { useTasks } from "../context/TaskContext";

type Props = {};

export default function SearchBar({ }: Props) {
    const { searchQuery, setSearchQuery } = useTasks();

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200">
            <div className="relative flex-1 flex items-center">
                <svg
                    className="w-4 h-4 text-slate-400 absolute start-3 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
                    />
                </svg>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-transparent outline-0 placeholder:text-slate-400"
                    placeholder="Search tasks by title or description..."
                />
            </div>
        </div>
    );
}