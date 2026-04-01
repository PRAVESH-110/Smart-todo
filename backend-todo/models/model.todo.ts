import mongoose,{Schema} from 'mongoose';
import { ITodo } from '../types/type.todo';

const todoSchema = new Schema<ITodo>({
    text:{
        type:String,
        required: true
    },
    completed:{
        type:Boolean,
        required: true
    }
})
export const Todo= mongoose.model<ITodo>('Todo',todoSchema);
