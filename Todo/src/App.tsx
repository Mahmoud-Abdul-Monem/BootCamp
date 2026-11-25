import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import SearchBar from "./components/SearchBar.tsx";
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";
import TaskProvider from "./context/TaskContext.tsx";

export default function App() {
  return (
    <TaskProvider>
      <Header />
      <main className="bg-[#faf8ff] min-h-dvh">
        <div className="w-1/2 mx-auto flex gap-6 flex-col">
          <TaskForm />
          <SearchBar />
          <TaskList />
        </div>
      </main>
      <Footer />
    </TaskProvider>
  );
}