import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FancyTextProps {
    words: string[];
    typingSpeed?: number; // سرعة الكتابة
    deletingSpeed?: number; // سرعة المسح
    delayBetweenWords?: number; // التأخير بين كل كلمة
}

const AnimatedText: React.FC<FancyTextProps> = ({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenWords = 1500,
}) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];
        let timeout: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
            }, deletingSpeed);
        } else {
            timeout = setTimeout(() => {
                setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
            }, typingSpeed);
        }

        // switch between typing/deleting
        if (!isDeleting && displayText === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
        } else if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, words, index, typingSpeed, deletingSpeed, delayBetweenWords]);

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
            {displayText}
        </Text>
    );
};

export default AnimatedText;
