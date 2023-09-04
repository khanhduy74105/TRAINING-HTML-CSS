import { Model, Types } from "mongoose";
import { IUser } from "types";

class BaseService<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model
    }
    create(data: Partial<T>) {
        return this.model.create(data)
    }
    findOneById(_id: Types.ObjectId) {
        return this.model.findById(_id)
    }
    findOne(parital: Partial<T>): Promise<T> {
        return this.model.findOne(parital)
    }
    find(parital: Partial<T>) {
        return this.model.find(parital)
    }
    findOneAndUpdate(parital: Partial<T>, data: Partial<T>) {
        return this.model.findOneAndUpdate(parital, data)
    }
    findOneByIdAndDelete(_id: Types.ObjectId) {
        return this.model.findOneAndDelete({ _id })
    }
}

export default BaseService