import mongoose, { Document } from "mongoose";
import { UserType } from "./user.model";

export interface NotesObjectType {
    title: string;
    content: string;
    user: UserType;
}

export interface NoteType extends Document, NotesObjectType {
    _id: string;
}

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<NoteType>("Note", noteSchema);
