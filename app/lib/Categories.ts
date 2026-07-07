import {Box, CarTaxiFront, GraduationCap, HandPlatter, Hospital, House, Plane, ReceiptText, ShoppingBag, TvMinimal} from "lucide-react"
export const CATEGORIES = [
    {
        id : "food",
        name : "Food",
        icon : HandPlatter,
        color : "#EF4444",
    },
    {
        id : "shopping",
        name : "Shopping",
        icon : ShoppingBag,
        color : "#8B5CF6",
    },
    {
        id : "transport",
        name : "Transport",
        icon : CarTaxiFront,
        color : '#3B62F6'
    },
    {
        id : "entertainment",
        name : "Entertainment",
        icon : TvMinimal,
        color : "#EC4899"
    },
    {
        id : "health",
        name : "Health",
        icon : Hospital,
        color : "#10B981",
    },
    {
        id : "education",
        name : "Education",
        icon : GraduationCap,
        color : "#F59E0B"
    },
    {
        id : "bills",
        name : "Bills",
        icon : ReceiptText,
        color : "#6366F1"
    },
    {
        id : "rent",
        name : "Rent",
        icon : House,
        color : "#14B8A6",
    },
    {
        id : "travel",
        name :"Travel",
        icon : Plane,
        color : "#06B6D4",
    },
    {
        id :"other",
        name : "Other",
        icon : Box,
        color : "#6B7280"   
    }
]