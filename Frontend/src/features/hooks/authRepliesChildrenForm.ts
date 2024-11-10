import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { replies } from "../../libs/type";
import { fetchRepliesChildren } from "../../component/repliesChildren";


export const useReplieChildrenform = () => {
    const {id} = useParams();
    const { data : repliesChildren ,refetch : refetchChildrenReplies } = useQuery<replies[]>({
        queryKey: ["repliesChildren"],
        queryFn: () => fetchRepliesChildren(id),
        });

        return {
            repliesChildren,
          refetchChildrenReplies
        }

}