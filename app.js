window.onload = function () {
    const taskinput = document.getElementById('taskinput');
    const context = document.getElementById('context');

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskElement(task.text, task.completed);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const taskElements = document.querySelectorAll('#context li');
        const tasks = [];
        taskElements.forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('span').textContent,
                completed: taskElement.querySelector('input[type="checkbox"]').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task element to the DOM
    function addTaskElement(text, completed) {
        let li = document.createElement("li");
        context.appendChild(li);
        li.style.color = 'white';

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        li.appendChild(checkbox);
        li.classList.add("mr-2");

        let taskText = document.createElement("span");
        taskText.textContent = text;
        if (completed) {
            taskText.style.textDecoration = 'line-through';
        }
        li.appendChild(taskText);

        // delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.classList.add("ml-10", "mb-4", "text-red-600", "bg-black", "hover:text-black", "hover:border-black", "hover:bg-red-600", "px-2", "py-1", "border", "border-red-600", "rounded-lg");

        deleteButton.onclick = () => {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteButton);

        // Edit Button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.classList.add("ml-10", "mb-4", "text-red-600", "bg-black", "hover:text-black", "hover:border-black", "hover:bg-red-600", "px-2", "py-1", "border", "border-red-600", "rounded-lg");

        editButton.onclick = function () {
            console.log('Edit button clicked');
            let newText = prompt("Enter new task text:", taskText.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskText.textContent = newText.trim();
                saveTasks();
            }
        };
        li.appendChild(editButton);

        // Checkbox event listener
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
            saveTasks();
        });
    }

    // Load tasks from local storage when the page loads
    loadTasks();

    addtask = () => {
        if (taskinput.value === "") {
            alert("You must write something!");
        }
        else {
            addTaskElement(taskinput.value, false);
            saveTasks();
        }

        taskinput.value = "";
    }
};
