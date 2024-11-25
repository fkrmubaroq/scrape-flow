import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactFlowTypes } from "@/types/global";
import { useId } from "react";

export function FieldTypeString({ param }: { param: ReactFlowTypes.TaskParam }) {
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input id={id} placeholder={param.placeholder} />
      {param.helperText && (
        <p className="text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
}
