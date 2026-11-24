
import { Model, UpdateQuery, type QueryFilter, type QueryOptions } from "mongoose";

export abstract class AbstractRepository<T> {

    constructor(private readonly model: Model<T>) {}

   async create(data: Partial<T>) {
    return this.model.create(data);
}

    async update(
        filter: QueryFilter<T>,
        data: UpdateQuery<T>,
        options?: QueryOptions<T>
    ) {
        return this.model.findOneAndUpdate(filter, data, options);
    }

    async delete(filter: QueryFilter<T>) {
        return this.model.findOneAndDelete(filter);
    }

    async findOne(filter: QueryFilter<T>) {
        return this.model.findOne(filter);
    }
}
