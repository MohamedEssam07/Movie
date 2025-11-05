import { Box, Button, FormLabel, IconButton, InputGroup, InputRightElement, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CustomInput from "./Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type loginFormData, type registerFormData } from "./ValidationSchema";
import { loginList, registerList, type ILoginList, type IRegisterList } from "./List";
import ErrorMsg from "./ErrorMsg";
import FancyText from "../ui/FancyText";

import { useAppDispatch, type RootState } from "../app/store";
import { userLogin } from "../app/features/LoginSlice";
import { userRegister } from "../app/features/SignupSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import bglogo from "../assets/black-rocks-dark-1920x1080-13127.jpg"
import CookieService from "../services/CookieService";
interface IProps {

}
const LoginPage = ({ }: IProps) => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const { data: respRegisterData, loading } = useSelector((state: RootState) => state.register)
    const { loading: loginLoading } = useSelector((state: RootState) => state.login)
    console.log(respRegisterData)
    const token = CookieService.get("jwt")
    const [tabIndex, setTabIndex] = useState(0)
    //login 
    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) })
    // const inputRef = useRef<HTMLInputElement>(null)
    const onLoginFormSubmit = (data: loginFormData) => {

        dispatch(userLogin(data))

    }

    //register
    const { register: reg, handleSubmit: handleRegisterSubmit, formState: { errors: registerError } } = useForm<registerFormData>({ resolver: zodResolver(registerSchema) })
    const onRegisterFormSubmit = (registerData: registerFormData) => {

        dispatch(userRegister(registerData))

    }
    // 3lshan lma t3ml register ywdeek 3la tool 3la el home w ymn3k trg3 tany


    useEffect(() => {
        if (token) {

            setTimeout(() => {
                nav(-1)
            }, 3000);

        }

    }, [token])

    return (
        <Box

            h="100vh"
            bgImage={`url(${bglogo})`}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center"
            position="relative"
            _before={{
                content: "''",
                position: "absolute",
                inset: 0,
                bg: "rgba(8, 8, 8, 0.7)",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4} >
            <Box

                bg="gray.900"
                borderRadius="2xl"
                w={{ base: "90%", md: "400px" }}
                p={8}
                boxShadow="0 10px 40px rgba(0,0,0,0.6)"
                border="1px solid"
                borderColor="gray.700"
            >
                <Tabs
                    variant="soft-rounded"
                    index={tabIndex}
                    onChange={(e) => setTabIndex(e)}
                    colorScheme="teal"
                    isFitted
                >
                    <TabList mb={6} bg="gray.800" p={1} borderRadius="xl">
                        <Tab
                            _selected={{ bg: "blue.600", color: "white" }}
                            fontWeight="bold"
                            borderRadius="xl"
                        >
                            Login
                        </Tab>
                        <Tab
                            _selected={{ bg: "blue.600", color: "white" }}
                            fontWeight="bold"
                            borderRadius="xl"

                        >
                            SignUp
                        </Tab>
                    </TabList>

                    <TabPanels>
                        {/* LOGIN */}
                        <TabPanel>
                            <Box
                                as="form"
                                display="flex"
                                flexDir="column"
                                gap={4}
                                onSubmit={handleSubmit(onLoginFormSubmit)}
                            >
                                <Box textAlign={"center"}>
                                    <FancyText title="LOGIN" />
                                </Box>

                                {loginList.map((item: ILoginList) => (
                                    <Box w="full" key={item.id}>
                                        {item.title === "identifier" ?
                                            <FormLabel color="blue.600" htmlFor={item.id}>
                                                Email
                                            </FormLabel>
                                            :

                                            <FormLabel color="blue.600" htmlFor={item.id}>
                                                {item.title}
                                            </FormLabel>
                                        }

                                        {item.type === "password" ? (
                                            <InputGroup>
                                                <CustomInput
                                                    isInvalid={!!errors[item.title]}
                                                    type={showPassword ? "text" : "password"}
                                                    id={item.id}
                                                    {...register(item.title)}
                                                    pr="3rem"
                                                    bg="gray.800"
                                                    border="1px solid"
                                                    borderColor="gray.700"
                                                    _hover={{ borderColor: "blue.600" }}
                                                    _focus={{ borderColor: "blue.600", boxShadow: "0 0 0 2px rgba(56, 178, 172,0.4)" }}
                                                    color="white"
                                                />
                                                <InputRightElement>
                                                    <IconButton
                                                        variant="ghost"
                                                        aria-label="Toggle password visibility"
                                                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        _hover={{ bg: "transparent" }}
                                                        color="gray.300"
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                        ) : (
                                            <CustomInput
                                                isInvalid={!!errors[item.title]}
                                                type={item.type}
                                                id={item.id}
                                                {...register(item.title)}
                                                bg="gray.800"
                                                border="1px solid"
                                                borderColor="gray.700"
                                                _hover={{ borderColor: "blue.600" }}
                                                _focus={{ borderColor: "blue.600", boxShadow: "0 0 0 2px rgba(56, 178, 172,0.4)" }}
                                                color="white"
                                            />
                                        )}

                                        {errors[item.title] && <ErrorMsg msg={errors[item.title]?.message} />}
                                    </Box>
                                ))}

                                <Button
                                    type="submit"
                                    w="full"
                                    bgGradient="linear(to-r, teal.400, cyan.300)"
                                    color="white"
                                    bg={"blue.600"}
                                    _active={{ transform: "scale(0.97)" }}
                                    mt={2}
                                    _hover={{ transform: "translateY(-2px)", boxShadow: "0 5px 20px rgba(56,178,172,0.6)" }}
                                    isLoading={loginLoading}
                                >
                                    Login
                                </Button>
                            </Box>
                        </TabPanel>

                        {/* REGISTER */}
                        <TabPanel>
                            <Box
                                as="form"
                                display="flex"
                                flexDir="column"
                                gap={4}
                                onSubmit={handleRegisterSubmit(onRegisterFormSubmit)}
                            >
                                <Box textAlign={"center"}>
                                    <FancyText title="REGISTER" />
                                </Box>

                                {registerList.map(({ id, title, type }: IRegisterList) => (
                                    <Box w="full" key={id}>
                                        <FormLabel color="blue.600" htmlFor={id}>{title}</FormLabel>

                                        {type === "password" ? (
                                            <InputGroup>
                                                <CustomInput
                                                    isInvalid={!!registerError[title]}
                                                    type={showPassword ? "text" : "password"}
                                                    id={id}
                                                    {...reg(title)}
                                                    pr="3rem"
                                                    bg="gray.800"
                                                    border="1px solid"
                                                    borderColor="gray.700"
                                                    _hover={{ borderColor: "blue.600" }}
                                                    _focus={{ borderColor: "blue.600", boxShadow: "0 0 0 2px rgba(56, 178, 172,0.4)" }}
                                                    color="white"
                                                />
                                                <InputRightElement>
                                                    <IconButton
                                                        variant="ghost"
                                                        aria-label="Toggle password visibility"
                                                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        _hover={{ bg: "transparent" }}
                                                        color="gray.300"
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                        ) : (
                                            <CustomInput
                                                isInvalid={!!registerError[title]}
                                                type={type}
                                                id={id}
                                                {...reg(title)}
                                                bg="gray.800"
                                                border="1px solid"
                                                borderColor="gray.700"
                                                _hover={{ borderColor: "blue.600" }}
                                                _focus={{ borderColor: "blue.600", boxShadow: "0 0 0 2px rgba(56, 178, 172,0.4)" }}
                                                color="white"
                                            />
                                        )}

                                        {registerError[title] && <ErrorMsg msg={registerError[title]?.message} />}
                                    </Box>
                                ))}

                                <Button
                                    type="submit"
                                    w="full"
                                    bgGradient="linear(to-r, teal.400, cyan.300)"
                                    color="white"
                                    bg={"blue.600"}
                                    _active={{ transform: "scale(0.97)" }}
                                    mt={2}
                                    boxShadow="0px 0px 15px rgba(59, 130, 246, 0.5)"
                                    transition="all 0.3s ease-in-out"

                                    _hover={{
                                        bg: "blue.700",
                                        transform: "translateY(-3px) scale(1.05)",
                                        boxShadow: "0px 0px 25px rgba(59, 130, 246, 0.8)",
                                    }}
                                    isLoading={loading}
                                >
                                    Register
                                </Button>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>


    );
};

export default LoginPage;