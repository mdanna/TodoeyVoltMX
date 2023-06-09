define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.flxFloatingButton.onClick = () => this.view.cmpAddTask.toggle(true);
    };

    let countTask = 0;

    eventManager.subscribe('addTask', (taskName) => {
      const task = new com.hcl.mario.Task({
        id: `task${new Date().getTime()}`,
        width: `${this.view.flsTaskList.frame.width - 60}dp`
      }, {}, {});
      task.taskName = taskName;
      task.isDone = false;
      this.view.flsTaskList.add(task);
      this.view.flsTaskList.forceLayout();
      countTask++;
      this.view.lblCount.text = `${countTask} ${countTask === 1 ? 'Task' : 'Tasks'}`;
    });

    eventManager.subscribe('deleteTask', (taskName) => {
      const task = this.view.flsTaskList.widgets().find((widget) => widget.taskName === taskName);
      this.view.flsTaskList.remove(task);
      this.view.flsTaskList.forceLayout();
      countTask--;
      this.view.lblCount.text = `${countTask} ${countTask === 1 ? 'Task' : 'Tasks'}`;
    });
  }
});