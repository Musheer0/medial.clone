import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePoll, CreatePost, DeletePost } from '@/libs/post/actions';
import { PostsPage } from "@/type";

export function useSubmitPostMutation(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: CreatePost,
        onSuccess: async (newPost) => {
            const filters: QueryFilters = { queryKey: ['latest-post', 'post-feed'] };
            await queryClient.cancelQueries(filters);
            queryClient.setQueriesData<InfiniteData<PostsPage>>(filters,
                         //@ts-ignore  
                (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page, index) => {
                            if (index === 0) {
                                return {
                                    ...page,
                                    posts: [newPost.success, ...page.posts],
                                };
                            }
                            return page;
                        }),
                    };
                }
            );
        },
    });
}
export function useSubmitPollMutation(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: CreatePoll,
        onSuccess: async (newPost) => {
            const filters: QueryFilters = { queryKey: ['latest-post', 'post-feed'] };
            await queryClient.cancelQueries(filters);
           await  queryClient.setQueriesData<InfiniteData<PostsPage>>(filters,
                        //@ts-ignore   
            (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page, index) => {
                            if (index === 0) {
                                return {
                                    ...page,
                                    posts: [newPost.success, ...page.posts],
                                };
                            }
                            return page;
                        }),
                    };
                }
            );
        },
    });
}
export function useDeletePostMutation(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: DeletePost,
        onSuccess: async (oldPost) => {
            const filters: QueryFilters = { queryKey: ['latest-post', 'post-feed'] };
            await queryClient.cancelQueries(filters);
           await  queryClient.setQueriesData<InfiniteData<PostsPage>>(filters,
            //@ts-ignore  
            (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            posts: page.posts.filter(post => post.id !== oldPost.success?.id)
                        })),
                    };
                }
            );
        },
    });
}

