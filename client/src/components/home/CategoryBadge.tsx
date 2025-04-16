import { Badge } from "../ui/badge";
type CategoryBadgeProps = {
  categories: {
    _id: {
      _id: string;
      categoryName: string;
    };
    foods: any[];
  }[];
};
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ categories }) => {
  return (
    <div className="flex gap-2">
      {categories.map((categorie) => {
        return (
          <Badge variant="outline" key={categorie._id}>
            {categorie._id.categoryName}
          </Badge>
        );
      })}
    </div>
  );
};
