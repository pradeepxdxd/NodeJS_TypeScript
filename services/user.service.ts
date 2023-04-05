import mongoose, {Document, QueryOptions, FilterQuery, UpdateQuery} from "mongoose";
import { UserDocument, userModel } from "../models/user.model";

export const createUser = (data : Document<UserDocument>) => {
    return userModel.create(data);
}