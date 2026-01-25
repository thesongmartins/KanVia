import { useState, useEffect } from "react";
import Layout from "./components/layout/layout";
import Board from "./components/Board";
import TaskModal from "./components/modals/TaskModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";
import data from "./data.json";
import "./index.css";
import type { Board as BoardType, Task } from "./types/types";

const App = () => {
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Data State
  const [boards, setBoards] = useState<BoardType[]>(data.boards);

  // Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTaskIndices, setSelectedTaskIndices] = useState<{
    colIndex: number;
    taskIndex: number;
  } | null>(null);

  const activeBoard = boards[activeBoardIndex];

  // Helper to get selected task
  const selectedTask =
    selectedTaskIndices !== null
      ? activeBoard.columns[selectedTaskIndices.colIndex].tasks[
          selectedTaskIndices.taskIndex
        ]
      : null;

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handlers
  const handleTaskClick = (colIndex: number, taskIndex: number) => {
    setSelectedTaskIndices({ colIndex, taskIndex });
    setIsTaskModalOpen(true);
  };

  const handleSubtaskToggle = (subtaskIndex: number) => {
    if (!selectedTaskIndices) return;
    const { colIndex, taskIndex } = selectedTaskIndices;
    
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    const column = board.columns[colIndex];
    const task = column.tasks[taskIndex];
    const subtask = task.subtasks[subtaskIndex];

    subtask.isCompleted = !subtask.isCompleted;
    setBoards(newBoards);
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedTaskIndices) return;
    const { colIndex, taskIndex } = selectedTaskIndices;

    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    const currentColumn = board.columns[colIndex];
    const task = currentColumn.tasks[taskIndex];

    // Find new column
    const newColIndex = board.columns.findIndex((col) => col.name === newStatus);
    if (newColIndex === -1) return;

    // Remove from current
    currentColumn.tasks.splice(taskIndex, 1);
    // Update status text
    task.status = newStatus;
    // Add to new
    board.columns[newColIndex].tasks.push(task);

    setBoards(newBoards);
    setIsTaskModalOpen(false); // Close because indices are invalid now
  };

  const handleAddTask = (taskData: any) => {
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    // Add to specific column based on status, or first column
    const columnIndex = board.columns.findIndex(
      (col) => col.name === taskData.status
    );
    const targetColumnIndex = columnIndex !== -1 ? columnIndex : 0;
    
    board.columns[targetColumnIndex].tasks.push(taskData);
    setBoards(newBoards);
  };

  return (
    <Layout
      boards={boards}
      activeBoardIndex={activeBoardIndex}
      setActiveBoardIndex={setActiveBoardIndex}
      theme={theme}
      setTheme={setTheme}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      onAddNewTask={() => setIsAddModalOpen(true)}
    >
      <Board 
        board={activeBoard} 
        onTaskClick={handleTaskClick}
      />
      
      {selectedTask && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          columns={activeBoard.columns}
          currentColumnName={activeBoard.columns[selectedTaskIndices!.colIndex].name}
          onStatusChange={handleStatusChange}
          onSubtaskToggle={handleSubtaskToggle}
        />
      )}

      <AddEditTaskModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        columns={activeBoard.columns}
        onSubmit={handleAddTask}
      />
    </Layout>
  );
};

export default App;
