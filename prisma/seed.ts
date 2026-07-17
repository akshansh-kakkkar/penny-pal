import { PrismaClient } from "@prisma/client"
import { Box, CarTaxiFront, GraduationCap, HandPlatter, Hospital, House, Plane, ReceiptText, ShoppingBag, TvMinimal } from "lucide-react"
const prisma = new PrismaClient();
async function main() {
    

await prisma.category.createMany ({
    data : [
    {
        id: "food",
        name: "Food",
        icon: "HandPlatter",
        color: "#B85E3D",
        background: "#F9EBE7"
    },
    {
        id: "shopping",
        name: "Shopping",
        icon: "ShoppingBag",
        color: "#815991",
        background: "#EFE8F3"
    },
    {
        id: "transport",
        name: "Transport",
        icon: "CarTaxiFront",
        color: '#5A7BAF',
        background: "#EAEEF6"
    },
    {
        id: "entertainment",
        name: "Entertainment",
        icon: "TvMinimal",
        color: "#B65D7E",
        background: "#F7E9EE"
    },
    {
        id: "health",
        name: "Health",
        icon: "Hospital",
        color: "#4F876B",
        background: "#E1EFE8" 
    },
    {
        id: "education",
        name: "Education",
        icon: "GraduationCap",
        color: "#BD8C42",
        background: "#F7EFE3"
    },
    {
        id: "bills",
        name: "Bills",
        icon: "ReceiptText",
        color: "#756FAE",
        background: "#EBEAF5"
    },
    {
        id: "rent",
        name: "Rent",
        icon: "House",
        color: "#3F837C",
        background: "#DFF1EF"
    },
    {
        id: "travel",
        name: "Travel",
        icon: "Plane",
        color: "#5091A5",
        background: "#E6F1F5"
    },
    {
        id: "other",
        name: "Other",
        icon: "Box",
        color: "#806F60",
        background: "#F1EDEA"
    }
]
})
console.log("Categories Seeded")

}

main().catch((e)=>{
    console.error(e);
    process.exit(1);
}).finally(async ()=> {
    await prisma.$disconnect();
})