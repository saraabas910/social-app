import { AbstractRepository } from '../../../lib/database/abstract.repository.js';
import type { IComment } from '../../comment/model/model.js';
import { Comment } from '../../comment/model/model.js';

class CommentRepository extends AbstractRepository<IComment> {

    constructor() {
        super(Comment);
    }

    async findCommentsByPost(postId: string) {
        return Comment.find({postId});
    }

    async findCommentById(commentId: string) {
        return Comment.findById(commentId);
    }
}

export const commentRepository = new CommentRepository();