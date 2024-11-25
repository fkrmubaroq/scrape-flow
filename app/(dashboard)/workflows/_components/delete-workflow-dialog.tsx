"use client";

import { DeleteWorkflow } from "@/actions/workflows/delete-workflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { WorkflowFeature } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  data,
}: WorkflowFeature.DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: data.id });
      setConfirmText("");
    },
    onError: (e) => {
      toast.error("Something went wrong", { id: data.id });
    },
  });

  const onDelete = () => {
    toast.loading("Deleting workflow. ..", {
      id: data.id,
    });
    mutate(data.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not be able to recover it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="text-center text-muted-foreground text-sm">
          To confirm, type "<strong>{data.name}</strong>" in the box below
        </div>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive font-semibold text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== data.name || isPending}
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
