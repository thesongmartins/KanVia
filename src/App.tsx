const App = () => {
  interface App {
    id: number;
    name: string;
    task: string;
  }

  const task: App = {
    id: 2,
    name: "Song Martins",
    task: "Todo",
  };

  const STORAGE_KEY = "todos";

  let todos: Todo[];

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    todos = JSON.parse(stored);
  } else {
    todos = [
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Build a project", completed: true },
      { id: 3, title: "Deploy to production", completed: false },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
  return <div>Task Management</div>;
};

export default App;
