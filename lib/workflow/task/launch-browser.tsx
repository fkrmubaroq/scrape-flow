import { TASK_PARAM_TYPE, TASK_TYPE } from "@/lib/constant";
import { Globe2Icon, LucideProps } from "lucide-react";

export const LAUNCH_BROWSER_TASK = {
  type: TASK_TYPE.LaunchBrowser,
  label: "Launch Browser",
  isEntryPoint: true,
  icon: (props: LucideProps) => (
    <Globe2Icon className="stroke-pink-400" {...props} />
  ),
  inputs: [
    {
      name: "Website Url",
      type: TASK_PARAM_TYPE.String as keyof typeof TASK_PARAM_TYPE,
      placeholder: "e.g https://google.com",
      helperText: (
        <div>
          The url of the website you want to launch
        </div>
      ),
      required: true,
      hideHandle: true,
    },
  ],
};
