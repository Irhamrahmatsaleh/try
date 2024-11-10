import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchReplies } from "../../component/replies";
import { replies } from "../../libs/type";


export const useRepliesform = () => {
    const {id} = useParams();
    const { data : replies ,refetch : refetchReplies } = useQuery<replies[]>({
        queryKey: ["replies"],
        queryFn: () => fetchReplies(id),
        });

        return {
            replies,
          refetchReplies
        }

}