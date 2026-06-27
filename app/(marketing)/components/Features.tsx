import { ArrowRight, ChartPie, Hand, Laugh } from "lucide-react";

export default function Features() {
  const Content = [
    {
      id: 1,
      title: "Easy Peasy Tracking",
      description:
        "Record every treat with just a tap. Our interface is designed to be so simple, you'll actually look forward to logging to your coffee.",
      hook: "Try it now",
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
      backgroundColor: "bg-[#FFFFFF]/30",
      iconColor: "bg-[#F4D2E5] text-[#715767]",
    },
    {
        id : 3,
        title : "Cute Insights",
        description : "See where your pennies go with adorable charts. Our visual reports are as delightful as they are informative",
        hook : "View demo",
        icon : <ChartPie />,
        backgroundColor : "bg-[#F9D5B4]/30",
        iconColor : "bg-[#F9D5B4] text-[#74593F]"
    }
  ];
  return (
    <div className=" py-16 bg-gradient-to-b from-[#F4D2E5]/40 to-[#FFFFFF]">
    <div className="text-[#715767]  flex gap-4 justify-center items-center text-center flex-col ">
        <div className="text-3xl capitalize font-bold">Why You'll Love PennyPal</div>
        <div className="font-medium text-xl max-w-180">We've stripped away the scary spreadsheets and replaced them with softness, smiles, and sweet success.</div>
    </div>
    <div className="flex gap-10 px-10 xl:px-40 flex-wrap mt-12  justify-center items-center min-h-[70vh]">
        {Content.map((item)=>(
            <div className={`${item.backgroundColor} cursor-pointer group transition-all duration-500 hover:scale-[110%] w-80 h-120 sm:h-110 text-[#715767] shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]  p-10  flex flex-col justify-start text-start gap-6 rounded-4xl`} key={item.id}>
                <div className={`rounded-full ${item.iconColor} w-fit flex justify-center items-center text-center p-4 `}>{item.icon}</div>
                <div className="font-semibold  text-3xl">{item.title}</div>
                <div className="text-[#4D4449] font-medium text-lg">{item.description}</div>
                <div className="font-bold mt-auto flex gap-2 text-sm items-center text-center  ">{item.hook}<span className="transition-all duration-300 group-hover:translate-x-2">< ArrowRight size={16} strokeWidth={3} /></span></div>
            </div>
        ))}
    </div>
    </div>
  );
}
