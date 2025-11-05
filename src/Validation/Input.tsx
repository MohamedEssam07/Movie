import { forwardRef } from "react";
import { Input, type InputProps } from "@chakra-ui/react";

const CustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <Input ref={ref} {...props} />;
});

export default CustomInput;