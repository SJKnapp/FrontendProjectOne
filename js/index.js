'use strict';

(function() {

    const baseUrl='';

    const displayAllTasks = document.querySelector("#renderedTasks");

    const updateTask = (requestBody, id) => {
        axios.put(`${baseUrl}/task/${id}/update`, requestBody)
        .then(res => {
            getAllTasks();
        })
        .catch(err => {
            console.log(err);
        });
    }

    const saveTask = (requestBody) => {
        console.log(requestBody);
        axios.post(`${baseUrl}/create`, requestBody)
            .then(res => {
                getAllTasks();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteTask = (id) => {
        axios.delete(`${baseUrl}/task/${id}/delete`)
        .then(res => {
            getAllTasks();
        })
        .catch(err => {
            console.log(err);
        });
    }

    const renderTask = (task, empty) => {

        const renderedTask = document.createElement('div');
        renderedTask.classList = "row align-self-start";

        const taskName = document.createElement('input');
        taskName.classList = "col-1";
        taskName.value = task.name;
        renderedTask.appendChild(taskName);

        const taskDesciption = document.createElement('input');
        taskDesciption.classList = "col";
        taskDesciption.value = task.description;
        renderedTask.appendChild(taskDesciption);

        const taskpriority = document.createElement('input');
        taskpriority.classList = "col";
        taskpriority.value = task.priority;
        renderedTask.appendChild(taskpriority);

        const taskTimeEstimate = document.createElement('input');
        taskTimeEstimate.classList = "col";
        taskTimeEstimate.value = task.timeEstimateMinutes;
        renderedTask.appendChild(taskTimeEstimate);

        const taskDueDate = document.createElement('input');
        taskDueDate.classList = "col";
        taskDueDate.type="date";
        taskDueDate.value = task.dueDate;
        renderedTask.appendChild(taskDueDate);    

        const saveButton = document.createElement('button');
        saveButton.classList = "col";
        saveButton.textContent = 'save';
        renderedTask.appendChild(saveButton); 
        saveButton.addEventListener('click', () =>{

            const requestBody = {
                'dueDate':`${taskDueDate.value}`,
                'name':`${taskName.value}`,
                'description':`${taskDesciption.value}`,
                'priority': `${taskpriority.value}`,
                'timeEstimateMinutes': `${taskTimeEstimate.value}`
            }
            if(!empty){
                updateTask(requestBody , task.id);
            }else{
                saveTask(requestBody);
            }
        })

        if(!empty){
            const deleteButton = document.createElement('button');
            deleteButton.classList = 'col';
            deleteButton.textContent = 'delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(task.id);
            })
            renderedTask.appendChild(deleteButton); 
        }else{
			const emptyEllement = document.createElement('div');
			emptyEllement.classList = 'col';
			renderedTask.appendChild(emptyEllement)
		}
        displayAllTasks.appendChild(renderedTask);
    }

    const getTaskFromTasks = (tasks) => {

        tasks.forEach(task => {
            renderTask(task, false);
        });

        const emtpyJson =  
            {
                "dueDate":"",
                "name":"",
                "description":"",
                "priority": 0,
                "timeEstimateMinutes": 0
            }

        renderTask(emtpyJson, true);
    }

    const getAllTasks = () => {
        displayAllTasks.innerHTML = "";
        axios.get(`${baseUrl}/getAll`)
            .then(res=>{
                console.log(res);
                getTaskFromTasks(res.data);
            }).catch(err=>console.log(err));
    }

    getAllTasks();
})()
