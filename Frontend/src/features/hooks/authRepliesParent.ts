import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchRepliesParent } from "../../component/repliesChildren";
import { repliesParent } from "../../libs/type";

export const useRepliesParentform = () => {
    const {id} = useParams();
    const { data: repliesParent, refetch: refetchParent } = useQuery<repliesParent>({
      queryKey: ["repliesParent"],
      queryFn: () => fetchRepliesParent(id)
      });

        return {
            repliesParent,
          refetchParent
        }

}