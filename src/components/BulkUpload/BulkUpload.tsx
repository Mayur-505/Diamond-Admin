import { ErrorType } from "@/lib/types";
import { BulkUploadData } from "@/services/bulkuploadService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import Loading from "../Common/Loading";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#00000081",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const BulkUpload = () => {
  const navigate = useNavigate();
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles, // This will contain the array of accepted files
  } = useDropzone({
    accept: ".xlsx",
    maxFiles: 1,
    multiple: false,
  });

  const { mutate: uploadBulk, isPending } = useMutation({
    mutationFn: BulkUploadData,
    onSuccess: () => {
      toast({
        description: "Bulk Upload Successfully.",
      });
    },
    onError: (error: ErrorType) => {
      if (error?.code == 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: error?.data?.message || "",
      });
    },
  });

  useEffect(() => {
    if (acceptedFiles?.length) {
      const payload = new FormData();
      payload.append("product_exel", acceptedFiles[0]);
      console.log("acceptedFiles", acceptedFiles[0]);
      uploadBulk(payload);
    }
  }, [acceptedFiles]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      {isPending && <Loading />}
      <div className=" ml-[30px] mt-[50px] max-w-[400px] bg-[#fafafa] border-[1px] border-solid border-[#0000004f] rounded-[3px] p-[15px]">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p className="text-[15px] text-[#000]">
            <div className="text-[70px] pb-[10px] text-[] flex items-center w-full justify-center">
              <BiSolidCloudUpload />
            </div>
            Drag'n' drop Only xlsx files here, or click to select files
          </p>
        </div>
        <div className="mt-[15px]">
          <h3 className="text-[15px] font-[600]">
            Accepted File Types(Max size:10 MB){" "}
          </h3>
          <div className="border-[1px] border-solid border-[#00000081] rounded-[2px] py-[5px] px-[4px] text-[14px]">
            .xlsx
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkUpload;
