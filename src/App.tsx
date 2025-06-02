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
  return <div>Task Management</div>;
};

export default App;
