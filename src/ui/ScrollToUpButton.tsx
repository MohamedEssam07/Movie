import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
interface IProps {
    windowScrollY: number;
    top?: number;
    bottom?: number;
    right?: string;
}
export default function ScrollToTopButton({ windowScrollY, top, bottom, right }: IProps) {
    const [isVisible, setIsVisible] = useState(false);

    // لما المستخدم ينزل شوية في الصفحة، الزرار يبان
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | null = null;

        const handleScroll = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsVisible(window.scrollY > windowScrollY);
            }, 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            if (timeout) clearTimeout(timeout);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [windowScrollY]);


    // لما المستخدم يضغط عليه يطلع لفوق
    const scrollToTop = () => {
        window.scrollTo({ top: top, behavior: "smooth" });
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}

                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{
                            position: "fixed",
                            bottom,
                            zIndex: 9999,
                            right,
                        }}
                    >
                        <IconButton

                            icon={<ChevronUpIcon boxSize={6} />}
                            aria-label="Scroll to top"
                            colorScheme="blue"
                            borderRadius="full"
                            size="lg"
                            boxShadow="xl"
                            onClick={scrollToTop}
                            _hover={{ transform: "scale(1.1)" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
