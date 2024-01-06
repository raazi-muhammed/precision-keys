import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import API from "@/lib/API";
import { UserType } from "@/types/types";
import { SyntheticEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { convertToBase64 } from "@/utils/converter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function EditProfile({ userDetails }: { userDetails: UserType }) {
    const { toast } = useToast();

    const [username, setUsername] = useState(userDetails.username);
    const [imageBase64, setimageBase64] = useState<string | undefined>(
        userDetails?.avatar
    );

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const values = {
            username,
            email: userDetails.email,
            avatar: imageBase64,
        };
        console.log(values);
        API.editUser(values, { toaster: toast }).then((response) => {
            console.log(response);
        });
    };
    const onFileChange = async (file: File | null) => {
        if (!file) return;
        const fileBase64 = await convertToBase64(file);
        console.log(fileBase64);
        setimageBase64(fileBase64 as string);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Avatar className="mx-auto w-36 h-36">
                    <AvatarImage src={imageBase64} />
                    <AvatarFallback>IMG</AvatarFallback>
                </Avatar>

                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input
                            disabled={true}
                            value={userDetails.email}
                            className="col-span-3"
                        />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Avatar
                        </Label>
                        <Input
                            onChange={(e) =>
                                onFileChange(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
                            type="file"
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}