import { Schema, model } from "mongoose";

const publicationSchema = Schema({
    title: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    profilePicture:{
        type: String
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


export default model("Publication", publicationSchema)