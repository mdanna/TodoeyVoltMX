define({
  tasks: [],

  onViewCreated(){
    this.view.init = () => {
      this.view.flxFloatingButton.onClick = () => this.view.cmpAddTask.toggle(true);
      this.tasks = voltmx.store.getItem('tasks') || [];
      this.loadTasks();
    };
    
    this.view.postShow = () => this.loadTasks();

    eventManager.subscribe('addTask', (taskName) => {
      this.tasks.push({taskName, isDone: false});
      voltmx.store.setItem('tasks', this.tasks);
      this.loadTasks();
    });

    eventManager.subscribe('deleteTask', (taskName) => {
      this.tasks = this.tasks.filter((t) => t.taskName !== taskName);
      voltmx.store.setItem('tasks', this.tasks);
      this.loadTasks();
    });
  },
  
  loadTasks(){
    this.view.flsTaskList.removeAll();
    this.tasks.forEach((t) => {
      const task = new com.hcl.mario.Task({
        id: `task${new Date().getTime()}`,
        width: `${voltmx.os.deviceInfo().screenWidth - 60}dp`
      }, {}, {});
      task.taskName = t.taskName;
      task.isDone = false;
      this.view.flsTaskList.add(task);
    });
    this.view.lblCount.text = `${this.tasks.length} ${this.tasks.length === 1 ? 'Task' : 'Tasks'}`;
    this.view.flsTaskList.forceLayout();
  }
});