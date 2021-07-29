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
    
    const updateStatus = (id, status) => {
		axios.patch(`${baseUrl}/task/${id}/status/${status}`)
        	.then(res => {
            	getAllTasks();
        	})
        	.catch(err => {
            	console.log(err);
        	});
	}

    const renderTask = (task, empty) => {

        let renderedTask = document.createElement('div');
		
        renderedTask.classList = "row align-self-start";
        
        let DueClass = ''; 
        let today = new Date();
        today.setHours(0, 0, 0, 0);
		if(task.done === true){
			DueClass = 'done';
		}
        else if(task.dueDate === null){
			DueClass = 'notSet';
		}
        else if(new Date(task.dueDate) >= today){
			DueClass = 'inDate';
		}
		else{
			DueClass = 'overdue';
		}

        const taskName = document.createElement('input');
        taskName.type = 'text';
        taskName.classList = `col-1 ${DueClass}`;
        taskName.value = task.name;
        renderedTask.appendChild(taskName);

        const taskDesciption = document.createElement('input');
        taskDesciption.classList = `col-4 ${DueClass}`;
        taskDesciption.value = task.description;
        renderedTask.appendChild(taskDesciption);

        const taskpriority = document.createElement('input');
        taskpriority.classList = `col-1 ${DueClass}`;
        taskpriority.value = task.priority;
        renderedTask.appendChild(taskpriority);

        const taskTimeEstimate = document.createElement('input');
        taskTimeEstimate.classList = `col-1 ${DueClass}`;
        taskTimeEstimate.value = task.timeEstimateMinutes;
        renderedTask.appendChild(taskTimeEstimate);

        const taskDueDate = document.createElement('input');
        taskDueDate.classList = `col-2 ${DueClass}`;
        taskDueDate.type="date";
        taskDueDate.value = task.dueDate;
        
        
        renderedTask.appendChild(taskDueDate);    

        const saveButton = document.createElement('button');
        saveButton.classList = "col-1";
        saveButton.textContent = 'save';
        saveButton.type = 'submit';
        renderedTask.appendChild(saveButton); 
        
        saveButton.addEventListener('click', function(e) {
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
            deleteButton.classList = 'col-1';
            deleteButton.textContent = 'delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(task.id);
            })
            renderedTask.appendChild(deleteButton); 
            
            
            const markCompleate = document.createElement('button');
            markCompleate.classList = 'col-1';
            let status = 'true';
            if(task.done === true ){
				markCompleate.textContent = 'not done';
				 status = 'false';
			}
			else{
            	markCompleate.textContent = 'done';
            }
            markCompleate.addEventListener('click', () => {
                updateStatus(task.id, status);
            })
            renderedTask.appendChild(markCompleate);
        }else{
			const emptyEllement1 = document.createElement('div');
			emptyEllement1.classList = 'col';
			renderedTask.appendChild(emptyEllement1);
			const emptyEllement2 = document.createElement('div');
			emptyEllement2.classList = 'col';
			renderedTask.appendChild(emptyEllement2);
		}
        displayAllTasks.appendChild(renderedTask);
    }

    const getTaskFromTasks = (tasks) => {

        tasks.forEach(task => {
            renderTask(task, false);
        });

        const emtpyJson =  
            {
                "dueDate":null,
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
