import { Schema, model } from "mongoose";

const commentSchema = Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        maxLength: [25, "Username cannot exceed 25 characters"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        maxLength: [75, "Name cannot exceed 75 characters"]
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    })


export default model("Comment", commentSchema)