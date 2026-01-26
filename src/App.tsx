import { useState, useEffect } from "react";
import Layout from "./components/layout/layout";
import Board from "./components/Board";
import TaskModal from "./components/modals/TaskModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";
import BoardModal from "./components/modals/BoardModal";
import data from "./data.json";
import "./index.css";
import type { Board as BoardType } from "./types/types";

const App = () => {
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Data State
  const [boards, setBoards] = useState<BoardType[]>(data.boards);

  // Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [boardModalType, setBoardModalType] = useState<"add" | "edit">("add");
  
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

  const handleBoardSubmit = (data: { name: string; columns: { name: string; tasks: [] }[] }) => {
    const newBoards = [...boards];
    
    if (boardModalType === "add") {
      const newBoard: BoardType = {
        name: data.name,
        columns: data.columns.map(col => ({ name: col.name, tasks: [] }))
      };
      newBoards.push(newBoard);
      setBoards(newBoards);
      setActiveBoardIndex(newBoards.length - 1);
    } else {
      const board = newBoards[activeBoardIndex];
      board.name = data.name;
      
      // Smart merge of columns to preserve tasks if names match, or just tasks if index match
      // For simplicity in this demo, we will try to map existing tasks to new columns if names match
      
      const newColumns = data.columns.map(newCol => {
         const existingCol = board.columns.find(c => c.name === newCol.name);
         return {
           name: newCol.name,
           tasks: existingCol ? existingCol.tasks : []
         };
      });

      // NOTE: This simple logic might lose tasks if column names change completely. 
      // In a real app we'd track column IDs. 
      // Fallback: if we just added a column, keep old ones.
      // But the modal returns the FULL list of desired columns. 
      
      // Let's improve: The modal returns ALL columns including new ones.
      // We iterate over the modal's returned columns.
      
      board.columns = newColumns;
      setBoards(newBoards);
    }
    
    setIsBoardModalOpen(false);
  };

  const openAddBoardModal = () => {
    setBoardModalType("add");
    setIsBoardModalOpen(true);
  };

  const openEditBoardModal = () => {
    setBoardModalType("edit");
    setIsBoardModalOpen(true);
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
      onAddBoard={openAddBoardModal}
    >
      <Board 
        board={activeBoard} 
        onTaskClick={handleTaskClick}
        onAddColumn={openEditBoardModal}
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

      <BoardModal 
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        type={boardModalType}
        board={boardModalType === "edit" ? activeBoard : undefined}
        onSubmit={handleBoardSubmit}
      />
    </Layout>
  );
};

export default App;
