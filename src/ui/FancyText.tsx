import { Text } from "@chakra-ui/react";
interface IProps {
    title: string | undefined
}
export default function FancyText({ title }: IProps) {
    return (
        <Text
            as="h1"
            fontSize="6xl"
            fontWeight="extrabold"
            lineHeight="1"
            transform="skewX(-6deg)"

            bgGradient="linear(to-r, blue.400, cyan.300, blue.600)"
            bgClip="text"
            sx={{
                display: "inline-block",
                backgroundSize: "200% auto",
                animation: "gradientMove 3s ease infinite",
                position: "relative",
                "@keyframes gradientMove": {
                    from: { backgroundPosition: "0% center" },
                    to: { backgroundPosition: "200% center" },
                },
            }}
        >
            {title}
        </Text>
    );
}
