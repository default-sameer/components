import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import { Users } from "./Sortable";
import { GripVerticalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  item: Users;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  ({ isOpacityEnabled, isDragging, style, ...props }, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      lineHeight: "0.5",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <div className="relative" ref={ref} style={styles}>
        <div
          {...props}
          className={cn(
            "absolute",
            isDragging
              ? "cursor-grabbing transform scale-105"
              : "cursor-grab scale-100",
            isOpacityEnabled ? "opacity-40" : "opacity-100",
            "leading-[0.5]",
            style
          )}
        >
          <GripVerticalIcon />
        </div>
        <div
          style={{
            borderRadius: "8px",
            boxShadow: isDragging
              ? "none"
              : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
            maxWidth: "100%",
            objectFit: "cover",
          }}
          className="h-40 w-40 bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {props.item.name}
            </div>
            <div className="text-sm text-gray-500">
              {props.item.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Item.displayName = "Item";

export default Item;
