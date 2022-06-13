# holistic-process-platform
A BPMN-based platform that combines BPMS and RPA.

Currently, the prototype enables users to model and combine RPA workflows and business processes using the business process model and notation.
Addressing the process orchestration issue, RPA workflows can not only be linked and invoked from business processes, but individual RPA operations can be embedded directly into processes.
To match the different levels of abstraction of business processes (high abstraction) and RPA workflows (low abstraction), the modeler follows a layered approach, capturing the high process view, the individual acitvities, and, if required, also the atomic tasks that consitute an activity.


## Background
Currently, business process management systems (BPMS) and tools for robotic process automation (RPA) are usually deployed and enacted seperately.
But with the increasing number of processes, RPA workflows and thus complexity, especially orchestrating process executions become more difficult.
Consequently, companies strive to later connnect both softwares, causing additional costs and maintainance effort.
The holistic process platform combines BPMS and RPA, thereby avoiding the need for integration at a later stage.


## Usage

### Modeling RPA workflows
RPA workflows solely consist of tasks that represent atomic RPA operations, such as opening an software application or pressing a button.

![RPA_RPA Flow Creation](https://user-images.githubusercontent.com/1167788/173344209-291e1778-347d-49f0-b348-2b0afe0980a8.gif)

Each task and thus RPA operation can be directly configured in the modeler (for the demonstration only a limited set of available RPA operations is used).

<img src="https://user-images.githubusercontent.com/1167788/173344949-2feced85-1bb5-4443-b591-fe0f441c88a5.gif" width="700" />


### Modeling Business Processes
While RPA excels at automatic repetitive tasks at a small scope, business processes are used to describe and enact "end-to-end" processes, of which RPA could be part of, e.g., an activity of a business process could be automated using RPA.

![RPA_BP Creation](https://user-images.githubusercontent.com/1167788/173344656-f8502ac7-bf5e-4d8c-bb60-a6c6a58514f3.gif)


### Navigation
Business processes can be explored by double-clicking non-atomic element, i.e., call activities that reference RPA flows and sub-processes, which will open the respective process definition.

![RPA_BP RPA Navigation](https://user-images.githubusercontent.com/1167788/173345638-f156301d-ab6a-41a7-980c-2d1a330a811e.gif)


## Installation
If you want to try the modeler yourself, you can easily install and run it:

1. Clone the repository
2. Run `npm install`
3. Execute `npm run dev`
4. Open "http://localhost:3000/modeler"
