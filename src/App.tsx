import { useState, useEffect } from "react";
import Layout from "./components/layout/layout";
import Board from "./components/Board";
import TaskModal from "./components/modals/TaskModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";
import BoardModal from "./components/modals/BoardModal";
import DeleteModal from "./components/modals/DeleteModal";
import data from "./data.json";
import type { Board as BoardType, Task } from "./types/types";
import "./index.css";

const App = () => {
  // State
  const [boards, setBoards] = useState<BoardType[]>(data.boards);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("kanvia-theme");
    return (savedTheme as "light" | "dark") || "dark";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const [boardModalType, setBoardModalType] = useState<"add" | "edit">("add");

  // Selected task tracking
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskIndices, setSelectedTaskIndices] = useState<{
    colIndex: number;
    taskIndex: number;
  } | null>(null);

  const activeBoard = boards[activeBoardIndex];

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("kanvia-theme", theme);
  }, [theme]);

  // Task Handlers
  const handleTaskClick = (colIndex: number, taskIndex: number) => {
    const task = activeBoard.columns[colIndex].tasks[taskIndex];
    setSelectedTask(task);
    setSelectedTaskIndices({ colIndex, taskIndex });
    setIsTaskModalOpen(true);
  };

  const handleAddTask = (taskData: any) => {
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    const columnIndex = board.columns.findIndex(
      (col) => col.name === taskData.status
    );
    if (columnIndex !== -1) {
      board.columns[columnIndex].tasks.push(taskData);
      setBoards(newBoards);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedTaskIndices) return;
    const { colIndex, taskIndex } = selectedTaskIndices;
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    const column = board.columns[colIndex];
    const task = column.tasks[taskIndex];

    // Remove from current column
    column.tasks.splice(taskIndex, 1);

    // Add to new column
    const newColIndex = board.columns.findIndex((c) => c.name === newStatus);
    if (newColIndex !== -1) {
      task.status = newStatus;
      board.columns[newColIndex].tasks.push(task);
      setBoards(newBoards);

      // Update selected task indices
      setSelectedTaskIndices({
        colIndex: newColIndex,
        taskIndex: board.columns[newColIndex].tasks.length - 1,
      });
      setSelectedTask(task);
    }
  };

  const handleSubtaskToggle = (subtaskIndex: number) => {
    if (!selectedTaskIndices) return;
    const { colIndex, taskIndex } = selectedTaskIndices;
    const newBoards = [...boards];
    const task = newBoards[activeBoardIndex].columns[colIndex].tasks[taskIndex];
    task.subtasks[subtaskIndex].isCompleted =
      !task.subtasks[subtaskIndex].isCompleted;
    setBoards(newBoards);
    setSelectedTask(task);
  };

  const handleEditTaskSubmit = (taskData: any) => {
    if (!selectedTaskIndices) return;
    const { colIndex, taskIndex } = selectedTaskIndices;
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    const column = board.columns[colIndex];

    // Check if status changed
    if (taskData.status !== column.name) {
      // Move task
      column.tasks.splice(taskIndex, 1);
      const newColIndex = board.columns.findIndex(
        (c) => c.name === taskData.status
      );
      if (newColIndex !== -1) {
        board.columns[newColIndex].tasks.push(taskData);
      }
    } else {
      // Update in place
      column.tasks[taskIndex] = taskData;
    }
    setBoards(newBoards);
    setIsEditTaskModalOpen(false);
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = () => {
    if (!selectedTaskIndices) return;
    const { colIndex, taskIndex } = selectedTaskIndices;
    const newBoards = [...boards];
    const board = newBoards[activeBoardIndex];
    const column = board.columns[colIndex];
    column.tasks.splice(taskIndex, 1);
    setBoards(newBoards);
    setIsDeleteTaskModalOpen(false);
    setIsTaskModalOpen(false);
  };

  // Board Handlers
  const openAddBoardModal = () => {
    setBoardModalType("add");
    setIsBoardModalOpen(true);
  };

  const openEditBoardModal = () => {
    setBoardModalType("edit");
    setIsBoardModalOpen(true);
  };

  const handleBoardSubmit = (data: {
    name: string;
    columns: { name: string; tasks: [] }[];
  }) => {
    if (boardModalType === "add") {
      setBoards([...boards, data as BoardType]);
      setActiveBoardIndex(boards.length);
    } else {
      const newBoards = [...boards];
      // Preserve existing tasks when editing
      const existingBoard = newBoards[activeBoardIndex];
      const updatedColumns = data.columns.map((newCol) => {
        const existingCol = existingBoard.columns.find(
          (col) => col.name === newCol.name
        );
        return existingCol || { name: newCol.name, tasks: [] };
      });
      newBoards[activeBoardIndex] = {
        name: data.name,
        columns: updatedColumns,
      };
      setBoards(newBoards);
    }
  };

  const handleDeleteBoard = () => {
    const newBoards = boards.filter((_, i) => i !== activeBoardIndex);
    if (newBoards.length === 0) {
      // Create a default empty board if all deleted
      newBoards.push({ name: "New Board", columns: [] });
    }
    setBoards(newBoards);
    setActiveBoardIndex(0);
    setIsDeleteBoardModalOpen(false);
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
      onEditBoard={openEditBoardModal}
      onDeleteBoard={() => setIsDeleteBoardModalOpen(true)}
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
          currentColumnName={
            activeBoard.columns[selectedTaskIndices!.colIndex].name
          }
          onStatusChange={handleStatusChange}
          onSubtaskToggle={handleSubtaskToggle}
          onEditTask={() => {
            setIsTaskModalOpen(false);
            setIsEditTaskModalOpen(true);
          }}
          onDeleteTask={() => {
            setIsDeleteTaskModalOpen(true);
          }}
        />
      )}

      {/* Add Task Modal */}
      <AddEditTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        columns={activeBoard.columns}
        onSubmit={handleAddTask}
      />

      {/* Edit Task Modal */}
      {selectedTask && (
        <AddEditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={() => setIsEditTaskModalOpen(false)}
          columns={activeBoard.columns}
          onSubmit={handleEditTaskSubmit}
          task={selectedTask}
        />
      )}

      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        type={boardModalType}
        board={boardModalType === "edit" ? activeBoard : undefined}
        onSubmit={handleBoardSubmit}
      />

      {/* Delete Board Modal */}
      <DeleteModal
        isOpen={isDeleteBoardModalOpen}
        onClose={() => setIsDeleteBoardModalOpen(false)}
        onDelete={handleDeleteBoard}
        type="board"
        title={activeBoard.name}
      />

      {/* Delete Task Modal */}
      {selectedTask && (
        <DeleteModal
          isOpen={isDeleteTaskModalOpen}
          onClose={() => setIsDeleteTaskModalOpen(false)}
          onDelete={handleDeleteTask}
          type="task"
          title={selectedTask.title}
        />
      )}
    </Layout>
  );
};

export default App;
