import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChangePassword,
  GetOneUser,
  UpdateProfile,
  UploadImage,
} from "@/services/adminService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import Loading from "../Common/Loading";
import { Button } from "../ui/button";

const MyProfile = () => {
  const [dataObject, setDataObject] = useState({
    old_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const { user } = useAppSelector((state) => state.auth);
  const [userdata, setUserData] = React.useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [userID, setUserId] = useState(user?.query?.id || "");
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const handaleUpdate = () => {
    changepass(dataObject);
    setIsOpen(true);
  };

  const deepEqual = (obj1: any, obj2: any) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  useEffect(() => {
    if (user?.qurey?.id) setUserId(user?.qurey?.id);
  }, [user]);

  const { data: categoryData } = useQuery({
    queryKey: ["GET_ONEUSER", { userID }],
    queryFn: () => GetOneUser(userID),
  });

  useEffect(() => {
    setUserData(categoryData?.data?.data);
  }, [categoryData]);

  const handalechange = (e: any) => {
    const { name, value } = e.target;
    setDataObject((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: changepass } = useMutation({
    mutationFn: ChangePassword,
    onSuccess: () => {
      toast({
        title: "Reset Password",
        description: "Password changes successfully",
      });
      setIsOpen(false);
      setDataObject({ old_pass: "", new_pass: "", confirm_pass: "" });
    },
    onError: (error) => {
      toast({
        title: "Reset Password",
        description:
          (error as { data?: { message?: string } })?.data?.message || "",
      });
      setIsOpen(false);
    },
  });

  const { mutate: UpdateUser } = useMutation({
    mutationFn: UpdateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ONEUSER"] });
      setImageUrl("");
      setIsOpen(false);
      toast({
        title: "profile image change",
        description: "user profile image change successfully",
      });
    },
    onError: (error) => {
      setIsOpen(false);
      toast({
        title: "profile image change",
        description:
          (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate: UploadImagedata, isPending } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setImageUrl(res?.data?.data?.image);
    },
  });

  const handaleImageChange = (e: any) => {
    const { files } = e.target;
    const payload = new FormData();
    payload.append("image", files[0]);
    UploadImagedata(payload);
  };

  const handaleChangeEvent = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handaleUpdateProfile = () => {
    let payload = {
      userid: userdata?.id,
      image: imageUrl,
      firstname: userdata?.firstname,
      Address: userdata?.Address,
      lastname: userdata?.lastname,
      email: userdata?.email,
      mobile: userdata?.mobile,
      password: userdata?.password,
      Comment: userdata?.Comment,
    };
    UpdateUser(payload);
    setIsOpen(true);
  };
  return (
    <div className="custom_contener !px-[28px] !mt-[50px]">
      {isPending && <Loading />}
      {isOpen && <Loading />}
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-[#343A4030]">
          <TabsTrigger value="account">My Account</TabsTrigger>
          <TabsTrigger value="password">Reset Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="px-8 py-10">
            <form action="#">
              <div className="form-container vertical">
                <div className="mb-[19px]">
                  <h5 className="font-Nunito text-[25px] font-[700] ">
                    My Account
                  </h5>
                  <p className="font-Nunito text-[15px] font-[400]">
                    Basic info, like your name and address that will displayed
                    in public
                  </p>
                </div>
                <div className="mt-[25px] max-w-[150px] h-[150px] rounded-full relative">
                  <img
                    src={imageUrl || userdata?.image}
                    alt="userImage"
                    className="w-full h-full rounded-full object-cover border-[1px] border-solid border-[#0000004D] "
                  />
                  <input
                    type="file"
                    onChange={handaleImageChange}
                    className="w-full h-full cursor-pointer rounded-full absolute top-0 left-0 opacity-0"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">Name</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <span className="flex items-center gap-4">
                          <div className="input-suffix-start">
                            {" "}
                            <svg
                              stroke="currentColor"
                              fill="none"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="text-[20px]"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>{" "}
                          </div>
                          <input
                            className="input input-md focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                            type="text"
                            name="firstname"
                            autoComplete="off"
                            placeholder="Name"
                            onChange={handaleChangeEvent}
                            value={userdata?.firstname}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">Email</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <span className="flex items-center gap-4">
                          <div className="input-suffix-start">
                            {" "}
                            <svg
                              stroke="currentColor"
                              fill="none"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="text-[20px]"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              ></path>
                            </svg>{" "}
                          </div>
                          <input
                            className="input input-md focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            onChange={handaleChangeEvent}
                            value={userdata?.email}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">Address</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <span className="flex items-center gap-4">
                          <div className="input-suffix-start">
                            {" "}
                            <img
                              src={
                                "https://www.svgrepo.com/show/374529/address.svg"
                              }
                              alt="loction"
                              className="max-w-[20px]"
                            />{" "}
                          </div>
                          <input
                            className="input input-md focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                            type="email"
                            name="Address"
                            autoComplete="off"
                            placeholder="Email"
                            onChange={handaleChangeEvent}
                            value={userdata?.Address}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">Avatar</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <div className="upload cursor-pointer">
                          <input className="upload-input" type="file" />
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt="imageUrl"
                              className="w-[300px] h-[130px] mt-[10px]"
                            />
                          )}
                          <span
                            className="avatar avatar-circle border-2 border-white dark:border-gray-800 shadow-lg"
                            style={{
                              width: "60px",
                              minWidth: "60px",
                              fontSize: "30px",
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="grid md:grid-cols-3 gap-4 py-8 items-center">
                  <div className="font-semibold">Comment</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <span className="flex items-center gap-4">
                          <div className="input-suffix-start">
                            {" "}
                            <svg
                              stroke="currentColor"
                              fill="none"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="text-[20px]"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              ></path>
                            </svg>{" "}
                          </div>
                          <input
                            className="input input-md focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                            type="text"
                            name="Comment"
                            autoComplete="off"
                            placeholder="Title"
                            onChange={handaleChangeEvent}
                            value={userdata?.Comment}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-5 mb-[50px]">
                <Button
                  className="button bg-[#343A40] text-white radius-round h-11 px-8 py-2"
                  type="button"
                  onClick={() => handaleUpdateProfile()}
                  disabled={deepEqual(userdata, categoryData?.data?.data)}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="px-8 py-10">
            <form action="#">
              <div className="form-container vertical">
                <div className="mb-[19px]">
                  <h5 className="font-Nunito text-[25px] font-[700] ">
                    Reset Password
                  </h5>
                  <p className="font-Nunito text-[15px] font-[400]">
                    Enter your current &amp; new password to reset your password
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">Current Password</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <input
                          className="input py-[8px] input-md border-[1px] border-solid w-full rounded-[5px] pl-[10px] border-[#0000004D] focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                          type="password"
                          name="old_pass"
                          autoComplete="off"
                          placeholder="Current Password"
                          onChange={handalechange}
                          value={dataObject.old_pass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">New Password</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <input
                          className="input py-[8px] input-md border-[1px] border-solid w-full rounded-[5px] pl-[10px] border-[#0000004D] focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                          type="password"
                          name="new_pass"
                          autoComplete="off"
                          placeholder="New Password"
                          onChange={handalechange}
                          value={dataObject.new_pass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
                  <div className="font-semibold">Confirm Password</div>
                  <div className="col-span-2">
                    <div className="form-item vertical mb-0 max-w-[700px]">
                      <label className="form-label"></label>
                      <div className="">
                        <input
                          className="input py-[8px] input-md border-[1px] border-solid w-full rounded-[5px] pl-[10px] border-[#0000004D] focus:ring-blue-600 focus-within:ring-blue-600 focus-within:border-blue-600 focus:border-blue-600"
                          type="password"
                          name="confirm_pass"
                          autoComplete="off"
                          placeholder="Confirm Password"
                          onChange={handalechange}
                          value={dataObject.confirm_pass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 ltr:text-right">
                  <Button
                    className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-11 px-8 py-2 ltr:mr-2 rtl:ml-2"
                    type="button"
                    onClick={() =>
                      setDataObject({
                        old_pass: "",
                        new_pass: "",
                        confirm_pass: "",
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button
                    className="button bg-[#343A40] text-white radius-round h-11 px-8 py-2"
                    type="button"
                    onClick={() => handaleUpdate()}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProfile;
