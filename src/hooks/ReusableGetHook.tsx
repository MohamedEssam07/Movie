import { useQuery } from "@tanstack/react-query";
import { axiosinstance } from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";

interface IProps {
    queryKey: (string | number)[];
    URL: string;
    enabled?: boolean
    config?: AxiosRequestConfig<any> | undefined
}
const ReusableGetHook = ({ URL, queryKey, enabled = true, config }: IProps) => useQuery({
    queryKey,
    queryFn: async () => {
        try {
            const res = await axiosinstance.get(URL, config)

            return res.data
        } catch (error) {
            console.log(error)
        }

    },
    enabled,




})
export default ReusableGetHook;