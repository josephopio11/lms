import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
    value: number;
    variant?: "default" | "success" | "warning" | "danger";
    size?: "default" | "sm" | "md" | "lg";
}

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
    warning: "text-amber-700",
    danger: "text-rose-700",
}

const sizeByVariant = {
    default: "text-sm font-medium",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
}

export const CourseProgress = ({
    value,
    variant,
    size
}: CourseSidebarProps) => {

    return (
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}
            // size={size}
            />
            <p
                className={cn(
                    "font-medium mt-2 text-sky-700",
                    colorByVariant[variant || "default"],
                    sizeByVariant[size || "default"],
                )}
            >
                {Math.round(value)}% Complete
            </p>
        </div>
    )
}