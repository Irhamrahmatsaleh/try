import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchThreadsReplies } from "../../component/replies";
import { thread } from "../../libs/type";

export const useRepliesThreadform = () => {
    const {id} = useParams();
    const { data: threadID, refetch: refetchThreads } = useQuery<thread>({
      queryKey: ["threadID"],
      queryFn: () => fetchThreadsReplies(id)
      });

        return {
            threadID,
          refetchThreads
        }

}