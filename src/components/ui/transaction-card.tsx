
import { Calendar, Tag, Edit2, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatters";

export interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  category: string;
  date: Date;
  note?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  currency: string;
  className?: string;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

export function TransactionCard({ 
  transaction, 
  currency, 
  className,
  onEdit,
  onDelete
}: TransactionCardProps) {
  const { type, amount, category, date, note } = transaction;
  
  return (
    <div
      className={cn(
        "flex items-center rounded-lg p-3 border border-border hover:bg-accent/50 transition-all-200",
        className
      )}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{category}</span>
            </div>
          </div>
          <span
            className={cn(
              "font-semibold",
              type === "expense" ? "text-expense" : "text-income"
            )}
          >
            {type === "expense" ? "-" : "+"}{currency} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className="flex items-center mt-1 gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{formatDate(date)}</span>
          </div>
          {note && <p className="text-xs text-muted-foreground line-clamp-1">{note}</p>}
        </div>
      </div>
      
      {/* Action buttons */}
      {(onEdit || onDelete) && (
        <div className="flex items-center gap-1 ml-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(transaction)} 
              className="p-1.5 rounded-full hover:bg-accent"
            >
              <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(transaction)} 
              className="p-1.5 rounded-full hover:bg-accent"
            >
              <Trash className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
