function TaskManager() {
    let tasks = loadTasks();
  
    // Load tasks from localStorage
    function loadTasks() {
      const tasksJSON = localStorage.getItem("tasks");
      return tasksJSON ? JSON.parse(tasksJSON) : [];
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Generate a unique task ID
    function generateUniqueId() {
      if (tasks.length === 0) return 1;
      return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
    }
  
    // Create a new task object
    function createTask(description) {
      return {
        id: generateUniqueId(),
        description: description || "No Description",
        completed: false,
      };
    }
  
    // Add a new task
    function addTask(description) {
      if (!description || typeof description !== "string") {
        console.log("Task description cannot be empty and must be a valid string.");
        return;
      }
      const newTask = createTask(description);
      tasks.push(newTask);
      saveTasks();
      console.log(`Task added: "${description}"`);
    }
  
    // View all tasks
    function viewTasks() {
      if (tasks.length === 0) {
        console.log("No tasks available.");
      } else {
        tasks.forEach((task) => {
          console.log(
            `[ID: ${task.id}] ${task.description} - ${task.completed ? "Completed" : "Not Completed"}`
          );
        });
      }
    }
  
    // Toggle the completion status of a task
    function toggleTaskCompletion(id) {
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        console.log(`Task with ID ${id} not found.`);
      } else {
        task.completed = !task.completed;
        saveTasks();
        console.log(`Task [ID: ${id}] status is now: ${task.completed ? "Completed" : "Not Completed"}.`);
      }
    }
  
    // Remove a task by ID
    function removeTask(id) {
      const initialLength = tasks.length;
      tasks = tasks.filter((task) => task.id !== id);
      if (tasks.length < initialLength) {
        saveTasks();
        console.log(`Task [ID: ${id}] removed.`);
      } else {
        console.log(`Task with ID ${id} not found.`);
      }
    }
  
    // Update a task description by ID
    function updateTask(id, newDescription) {
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        console.log(`Task with ID ${id} not found.`);
      } else if (!newDescription || typeof newDescription !== "string") {
        console.log("New description must be a valid string.");
      } else {
        task.description = newDescription;
        saveTasks();
        console.log(`Task [ID: ${id}] updated to: "${newDescription}"`);
      }
    }
  
    // Search tasks by description
    function searchTasks(searchTerm) {
      const foundTasks = tasks.filter((task) =>
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (foundTasks.length > 0) {
        foundTasks.forEach((task) => {
          console.log(
            `[ID: ${task.id}] ${task.description} - ${task.completed ? "Completed" : "Not Completed"}`
          );
        });
      } else {
        console.log(`No tasks matching "${searchTerm}" found.`);
      }
    }
  
    // Expose the functions to be used outside
    return {
      addTask,
      viewTasks,
      toggleTaskCompletion,
      removeTask,
      updateTask,
      searchTasks,
    };
  }
  
  // Display the menu options
  function displayMenu() {
    console.log("Task Manager Menu:");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Toggle Task Completion");
    console.log("4. Edit Task");
    console.log("5. Delete Task");
    console.log("6. Search for Task");
    console.log("7. Exit");
  }
  
  // Handle the user's input
  function handleUserInput() {
    const taskManager = TaskManager();
    let choice;
  
    while (choice !== "7") {
      displayMenu();
      choice = prompt("Choose an option (1-7):");
  
      switch (choice) {
        case "1":
          const taskDescription = prompt("Enter the task description:");
          taskManager.addTask(taskDescription);
          break;
        case "2":
          taskManager.viewTasks();
          break;
        case "3":
          const toggleId = parseInt(prompt("Enter the task ID to toggle:"));
          taskManager.toggleTaskCompletion(toggleId);
          break;
        case "4":
          const editId = parseInt(prompt("Enter the task ID to edit:"));
          const newDescription = prompt("Enter the new task description:");
          taskManager.updateTask(editId, newDescription);
          break;
        case "5":
          const deleteId = parseInt(prompt("Enter the task ID to delete:"));
          taskManager.removeTask(deleteId);
          break;
        case "6":
          const searchTerm = prompt("Enter the search term:");
          taskManager.searchTasks(searchTerm);
          break;
        case "7":
          console.log("Exiting Task Manager.");
          break;
        default:
          console.log("Invalid option. Please choose a number from 1 to 7.");
          break;
      }
    }
  }
  
  // Start the Task Manager
  handleUserInput();
  