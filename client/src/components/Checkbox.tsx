import { useState } from "react";

type CheckboxProps = {
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
};

export const Checkbox = ({ isChecked, onCheck }: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked ?? false);

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="w-5 h-5 rounded-full appearance-none cursor-pointer bg-taskUncompleted checked:bg-blue-500 checked:dark:bg-taskCompleted"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          onCheck?.(!checked);
        }}
      />
      {checked && <span className="ml-1">✨</span>}
    </div>
  );
};
