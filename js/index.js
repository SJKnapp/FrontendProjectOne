'use strict';

(function() {

    const baseUrl="http://127.0.0.1:8080";

    const displayAllTasks = document.querySelector("#renderedTasks");

    const renderTask = (task) => {
        const renderedTask = document.createElement('div');
        const taskName = document.createElement('p');
        taskName.textContent = task.name;

        renderedTask.appendChild(taskName);

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