import * as XLSX from "xlsx";
import { Button } from "../ui/button";

interface ExportButtonProps {
  data: any[];
  filename: string;
  className?: string;
}

export const ExportExcelButton = ({
  data,
  filename,
  className,
}: ExportButtonProps) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  return (
    <Button className={className} onClick={exportToExcel}>
      Export
    </Button>
  );
};
