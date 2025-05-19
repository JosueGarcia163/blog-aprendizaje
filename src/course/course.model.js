import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },    
},
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model('Course', courseSchema);
