import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on('taskCompleted', (taskId) => (
    console.log(`Task ${taskId} is completed`)
));

export default eventEmitter;