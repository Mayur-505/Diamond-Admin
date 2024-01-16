import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import ProfileImage from "@/assets/Image/profileImage.jpg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LogOutAPI } from "@/services/authService";
import { useAppSelector } from "@/hooks/use-redux";
import { toast } from "../ui/use-toast";

export function ProfileDropDown({ userdata }) {
  console.log("userdata", userdata);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const { mutate: NewPass } = useMutation({
    mutationFn: (data: any) => LogOutAPI(data),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast({
          title: "Logout User",
          description: "user logged out successfully",
        });
        localStorage.clear();
        navigate("/auth/login");
      }
    },
    onError: (response) => {
      toast({
        variant: "error",
        description: response?.data?.message?.[0]?.msg || "user not found",
      });
    },
  });

  const handaleLogout = () => {
    const data = { userid: user?.qurey?.id || "" };
    NewPass(data);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex gap-[7px] items-center">
          <img
            src={userdata?.image}
            alt="ProfileImage"
            className="max-w-[35px] w-full"
          />
          <p className="font-Nunito font-[600] text-[#495057] text-[12px] border-[#dee2e6] border-r-[1px] border-solid pr-[14px]">
            {userdata?.firstname}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-[5px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/myprofile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handaleLogout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
