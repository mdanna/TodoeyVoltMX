define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
      this.view.flxBackground.onClick = () => this.toggle(false);
      this.view.flxAddTask.onClick = () => {
        const taskName = this.view.txtAddTaskName.text;
        if(taskName){
          eventManager.publish('addTask', taskName);
          this.toggle(false);
        }
      };
    },

    initGettersSetters() {},

    toggle(show){
      this.view.isVisible = !!show;
      show && this.view.txtAddTaskName.setFocus(true);
      show && (this.view.txtAddTaskName.text = '');
    }
  };
});