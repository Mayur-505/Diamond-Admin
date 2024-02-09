import { Link, useNavigate } from "react-router-dom";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useActions from "@/hooks/use-actions";
import { userLogin } from "@/services/authService";
import { toast } from "../ui/use-toast";
import Loading from "../Common/Loading";

const Login = () => {
	const { setUserData } = useActions();
	const navigate = useNavigate();

	const {
		register,
		formState: {},
		reset,
		handleSubmit,
	} = useForm();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FieldValues) => userLogin(data),
		onSuccess: (response) => {
			setUserData(response.data.data);
			reset();
			if (response.data.data.qurey.role === 2) {
				navigate("/");
				toast({
					variant: "success",
					title: "Login Successfully",
				});
			} else {
				toast({
					variant: "error",
					title: "Invalid user role or email",
				});
			}
		},
		onError: (error) => {
			toast({
				variant: "error",
				title: (error as { data?: { message?: string } })?.data?.message || "",
			});
		},
	});

	const onSubmit = (values: FieldValues) => {
		mutate(values);
	};

	return (
		<>
			{isPending && <Loading />}
			<img src={Diamond} alt="Diamond" className="h-[56px] [mt-21px]" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center gap-[21px]">
					<div className="mb-[14px]">
						<h2 className="font-Nunito text-[28px] font-semibold text-[#212121]">
							Login to your account
						</h2>
						<p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
							Forgot password?{" "}
							<Link to={"/auth/forgot-password"} className="text-[#2196F3]">
								Click here
							</Link>{" "}
							to reset.
						</p>
					</div>
					<InputWithLabel
						id="email"
						placeholder="Email"
						className="h-[35px] w-[280px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
						{...register("email", { required: "This field is required." })}
					/>
					<InputWithLabel
						id="password"
						type="password"
						placeholder="Password"
						className="h-[35px] w-[280px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
						{...register("password", { required: "This field is required." })}
					/>
					<Button
						variant={"secondary"}
						className="h-[35px] w-[280px] border border-[#2196F3] hover:bg-[#2196F3] hover:bg-opacity-[0.8] bg-[#2196F3] rounded-[4px] text-[#fff]">
						CONTINUE
					</Button>
					<div className="flex text-sm font-sans font-medium text-gray-400 mt-2 gap-1">
						Don´t have an account?
						<Link
							to={"http://185.199.53.33:3001/sign-up"}
							className="underline text-[#2196F3]">
							Sign up
						</Link>
					</div>
				</div>
			</form>

			<p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
				A problem?{" "}
				<Link
					to={"http://185.199.53.33:3001/contact"}
					className="text-[#2196F3]">
					Click here
				</Link>{" "}
				and let us help you.
			</p>
		</>
	);
};

export default Login;
