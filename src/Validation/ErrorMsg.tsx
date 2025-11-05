import { Text } from "@chakra-ui/react";

interface IProps {
    msg: string | undefined;
}
const ErrorMsg = ({ msg }: IProps) => {
    return (
        <>
            {msg ? <Text color={"red.800"}>{msg}</Text> : null}
        </>
    );
};

export default ErrorMsg;