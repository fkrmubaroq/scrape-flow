"use client";

import { CreateWorkflow } from "@/actions/workflows/create-workflow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createWorkflowSchema } from "@/schema/workflow";
import { WorkflowSchema } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Layers2Icon } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default function CreateWorkflowDialog({
  triggerText,
}: {
  triggerText?: string;
}) {
  const form = useForm<WorkflowSchema.CreateWorkflow>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow created", {
        id: "create-workflow",
      });
    },
    onError: (e) => {
      toast.error(e.message || "Failed to create workflow", {
        id: "create-workflow",
      });
    },
  });

  const onSubmit = (data: WorkflowSchema.CreateWorkflow) => {
    toast.loading("Creating workflow...", { id: "create-workflow" });
    mutate(data);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText || "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pt-6 pb-3">
          <DialogTitle asChild>
            <div className="flex flex-col items-center gap-y-1 mb-2">
              <Layers2Icon size={30} className={cn("stroke-primary")} />
              <p className={cn("text-xl text-primary")}>Create workflow</p>
              <p className={cn("font-medium text-muted-foreground")}>
                Start Building your workflow
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <FormWorkflow form={form} onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}

function FormWorkflow({
  form,
  onSubmit,
  isPending,
}: {
  form: UseFormReturn<WorkflowSchema.CreateWorkflow>;
  onSubmit: (data: WorkflowSchema.CreateWorkflow) => void;
  isPending: boolean;
}) {
  const {
    formState: { errors },
  } = form;
  console.log(errors);
  return (
    <Form {...form}>
      <form
        className="space-y-8 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Name
                <p className="text-xs text-primary">(required)</p>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormDescription>
                Choose a descriptive and unique name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Description
                <p className="text-xs text-primary">(optional)</p>
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>

              <FormDescription>
                Provide a brief description of what the workflow does.
                <br /> this is optional but can help you remember the
                workflow&apos;s purpose
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          isLoading={isPending}
        >
          Proceed
        </Button>
      </form>
    </Form>
  );
}
