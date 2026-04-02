"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  GripVertical,
  Type,
  Mail,
  Phone,
  AlignLeft,
  List,
  CheckSquare,
  Hash,
  Asterisk,
} from "lucide-react";
import { FormField } from "../../../../../../../../../generated/prisma/client";

const FIELD_TYPE_ICONS: Record<string, React.ElementType> = {
  TEXT: Type,
  EMAIL: Mail,
  PHONE: Phone,
  TEXTAREA: AlignLeft,
  SELECT: List,
  CHECKBOX: CheckSquare,
  NUMBER: Hash,
};

const FIELD_TYPE_COLORS: Record<string, string> = {
  TEXT: "bg-blue-500/10 text-blue-600",
  EMAIL: "bg-violet-500/10 text-violet-600",
  PHONE: "bg-emerald-500/10 text-emerald-600",
  TEXTAREA: "bg-amber-500/10 text-amber-600",
  SELECT: "bg-pink-500/10 text-pink-600",
  CHECKBOX: "bg-teal-500/10 text-teal-600",
  NUMBER: "bg-orange-500/10 text-orange-600",
};

type Props = {
  field: FormField;
  index: number;
  totalFields: number;
  onDelete: (fieldId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export default function FormFieldItem({
  field,
  index,
  totalFields,
  onDelete,
  onMoveUp,
  onMoveDown,
}: Props) {
  const Icon = FIELD_TYPE_ICONS[field.type] || Type;
  const colorClass = FIELD_TYPE_COLORS[field.type] || "bg-muted text-muted-foreground";

  return (
    <div className="flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-muted/30 transition-colors group">
      <div className="text-muted-foreground">
        <GripVertical className="size-4" />
      </div>

      <div className={`p-1.5 rounded-md ${colorClass}`}>
        <Icon className="size-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{field.label}</span>
          {field.required && (
            <Asterisk className="size-3 text-destructive" />
          )}
        </div>
        {field.placeholder && (
          <span className="text-xs text-muted-foreground truncate block">
            {field.placeholder}
          </span>
        )}
      </div>

      <Badge variant="secondary" className="text-xs font-normal">
        {field.type.charAt(0) + field.type.slice(1).toLowerCase()}
      </Badge>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={onMoveUp}
          disabled={index === 0}
        >
          <ArrowUp className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={onMoveDown}
          disabled={index === totalFields - 1}
        >
          <ArrowDown className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 text-destructive hover:text-destructive"
          onClick={() => onDelete(field.id)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
