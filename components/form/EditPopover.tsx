import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormEdit from "./FormEdit";
import { IUser } from "@/utils/models/user.model";

interface EditPopoverProps {
  user: IUser;
}

const EditPopover = ({ user }: EditPopoverProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="default" variant="secondary" asChild>
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <FormEdit user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default EditPopover;
