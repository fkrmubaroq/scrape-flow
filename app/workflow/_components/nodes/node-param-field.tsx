"use client";

import { TASK_PARAM_TYPE } from "@/lib/constant";
import { ReactFlowTypes } from "@/types/global";
import { FieldTypeString } from "./param-fields";

const FieldList = {
  [TASK_PARAM_TYPE.String]: FieldTypeString
};
 
export default function NodeParamField({
  param,
}: {
  param: ReactFlowTypes.TaskParam;
  }) {
  const FieldComponent = FieldList[param.type] || FieldNotFound
  return <FieldComponent param={param} />
}


function FieldNotFound() {
  return <div className="w-full">
    <p className="text-xs text-muted-foreground">Not Implemented</p>
  </div>
}

