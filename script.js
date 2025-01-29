// Wait for the DOM to fully load before executing the script

document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        if (taskText !== " ") {
                 // Create a new list item (li) element
                const taskItem = document.createElement('li');
                taskItem.textContent = taskText;
                 // Create a remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = "Remove";
                removeButton.classList.add('remove-btn');
                     // Add event listener to remove the task when clicked
                removeButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
                });
                     // Append button to list item, then list item to task list
                taskItem.appendChild(removeButton);
                taskList.appendChild(taskItem);

                if (save) {
                    const storedTasks= JSON.parse(localStorage.getItem('tasks') || '[');
                    storedTasks.push(taskText);
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                }
    }

    // Clear input field
    taskInput.value = "";
}
        // Function to remove task from localStorage
        function removeTaskFromStorage(taskText) {
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
    // Event listener for the Add Task button
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Event listener for Enter key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
loadTasks();