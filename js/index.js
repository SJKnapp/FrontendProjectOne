'use strict';

(function() {

    const baseUrl='http://127.0.0.1:8080';

    const displayAllTasks = document.querySelector("#renderedTasks");

    const renderTask = (task) => {
        const renderedTask = document.createElement('div');

        const taskName = document.createElement('p');
        taskName.classList =  'inline';
        taskName.textContent = task.name;
        renderedTask.appendChild(taskName);

        const taskDesciption = document.createElement('p');
        taskDesciption.textContent = task.description;
        renderedTask.appendChild(taskDesciption);

        const taskpriority = document.createElement('p');
        taskpriority.textContent = task.dueDate;
        renderedTask.appendChild(taskpriority);

        const taskTimeEstimate = document.createElement('p');
        taskTimeEstimate.textContent = task.timeEstimateMinutes;
        renderedTask.appendChild(taskTimeEstimate);

        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = task.dueDate;
        renderedTask.appendChild(taskDueDate);    

        const saveButton = document.createElement('button');
        saveButton.textContent = 'save';
        renderedTask.appendChild(saveButton); 

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        renderedTask.appendChild(deleteButton); 

        displayAllTasks.appendChild(renderedTask);
    }

    const getTaskFromTasks = (tasks) => {

        tasks.forEach(task => {
            renderTask(task);
        });
    }

    const getAllTasks = () => {
        axios.get(`${baseUrl}/getAll`)
            .then(res=>{
                console.log(res);
                getTaskFromTasks(res.data);
            }).catch(err=>console.log(err));
    }

    getAllTasks();
})()
