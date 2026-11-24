import {AbstractRepository} from "../../../lib/database/abstract.repository.js";
import type { IPost } from "../model/post.model.js";
import { Post } from "../model/post.model.js";


class PostRepository extends AbstractRepository<IPost> {
    
       constructor(){
          super(Post);
    }
 async findPostsByUser(userId: string) {
        return Post.find({ userId });
    }

    async findPostById(postId: string) {
        return Post.findById(postId);
    }
}

export const postRepository = new PostRepository();