import { PartyPopper } from "lucide-react";

export default function StartYourJourney() {
  return ( 
    <div className="my-16">
    <div className="bg-[#F4D2E5]/10 py-16 md:px-10 lg:px-80 gap-6 flex flex-col justify-center items-center">
        <div className="p-6 rounded-full bg-[#F4D2E5]" >
            <PartyPopper className=" text-[#715767]" size={48} />
        </div>
        <div className="sm:text-3xl text-2xl text-center font-bold text-[#715767]">
            Ready to Start your journey?
        </div>
        <div className=" text-sm md:text-lg max-w-180 text-center font-semibold text-[#4D4449]">
            Join thousands of others who have turned their money stress into money joy. It's free to join and sweet to stay.
        </div>
        <div className="mt-6 px-10 py-4 md:px-16 md:py-6 text-lg md:text-2xl font-bold rounded-full text-white bg-[#715767]">
            Join the Club Now
        </div>
    </div>
    </div>
  );
}
