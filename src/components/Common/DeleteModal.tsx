import Modal from "./Model";
import { Button } from "../ui/button";
import Loading from "./Loading";

const DeleteModal = ({
  handleDelete,
  setOpenDelete,
  openDelete,
  isopen,
}: any) => {
  const Deletebody = (
    <div>
      {isopen && <Loading />}
      <div className="font Nutino text-[35px] font-semibold">Are you sure?</div>
      <div className="font Nutino text-[20px]">Do you want to delete data?</div>
      <div className="flex justify-end gap-4 mt-5">
        <Button
          variant={"outline"}
          className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          className="w-full bg-[#343a40] border border-transparent hover:border-[#343a40] text-white"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
  return (
    <Modal
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      children={Deletebody}
      className="!p-[20px]"
    />
  );
};

export default DeleteModal;
