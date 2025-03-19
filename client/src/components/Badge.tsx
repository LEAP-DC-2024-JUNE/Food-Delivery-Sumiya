import { Badge } from "./ui/badge";
type DataType = {
  data: string;
  isActive: boolean;
};
export const BadgeUi = ({ data, isActive }: DataType) => {
  return (
    <Badge className={`badge ${isActive ? "active" : ""}`} variant="outline">
      {data}
    </Badge>
  );
};
export default BadgeUi;
