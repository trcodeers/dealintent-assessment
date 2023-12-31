import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TaskData } from "../types/items";

type Props  = {
    onCacelForm: () => void,
    onAddTask: (teask: TaskData) => void
}
const TaskForm = ({ onCacelForm, onAddTask }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const [minDate, setMinDate] = useState('');
  const [inputType, setInputType] = useState('text');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);
  
  const onSubmit = (data: any) => {
    onAddTask(data);
    reset();
  };

  return (
    <form
      className="bg-white rounded mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
    
        <div>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin`}
            id="name"
            type="text"
            placeholder="Task"
            {...register("name", { required: "Name is required" })}
          />
        </div>

        <div>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none `}
            id="description"
            placeholder="Description"
            rows={1}
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        <div>
            <input
                type={inputType}
                id="datepicker"
                className="mt-0 p-1.5 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                min={minDate}
                {...register("date")}
                placeholder="Due date"
                onFocus={() => setInputType('date')}
                onBlur={() => setInputType('text')}
            />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-200 text-black py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onCacelForm}
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-red-200 text-black py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
