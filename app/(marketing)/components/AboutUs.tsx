import { ChartPie, Hand, Laugh } from "lucide-react";

export default function AboutUs() {
  const Content = [
    {
      id: 1,
      title: "Easy Peasy Tracking",
      description:
        "Record every treat with just a tap. Our interface is designed to be so simple, you'll actually look forward to logging to your coffee.",
      hook: "try it now",
      icon: <Hand />,
      backgroundColor: "bg-[#C8E9E2]/30",
      iconColor: "bg-[#C8E9E2] text-[#46645F]",
    },
    {
      id: 2,
      title: "Budgeting with a Smile",
      description:
        "Set goals that feel like high-fives. Watch your progress bars fill with happy mint green as you reach your milestones.",
      hook: "Learn how",
      icon: <Laugh />,
      backgroundColor: "bg-[#F4D2E5]/30",
      iconColor: "bg-[#F4D2E5] text-[#715767]",
    },
    {
        id : 3,
        title : "Cute Insights",
        description : "See where your pennies go with adorable charts. Our visual reports are as delightful as they are informative",
        hook : "View Demo",
        icon : <ChartPie />,
        backgroundColor : "bg-[#F9D5B4]/30",
        iconColor : "bg-[#F9D5B4] text-[#74593F]"
    }
  ];
  return (
    <div className="min-h-[100vh] py-16 bg-gradient-to-b from-[#F4D2E5]/40 to-[#FFFFFF]">
    <div className="text-[#715767] flex gap-4 justify-center items-center text-center flex-col ">
        <div className="text-3xl capitalize font-bold">Why You'll Love PennyPal</div>
        <div className="font-medium text-xl max-w-180">We've stripped away the scary spreadsheets and replaced them with softness, smiles, and sweet success.</div>
    </div>
    <div className="flex gap-10 justify-center items-center h-full">
        {Content.map((item)=>(
            <div key={item.id}>
                <div>{item.icon}</div>
                <div>{item.title}</div>
                <div>{item.description}</div>
                <div>{item.hook}</div>
            </div>
        ))}
    </div>
    </div>
  );
}
