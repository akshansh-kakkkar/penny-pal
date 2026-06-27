import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <div className="rounded-t-4xl flex-col gap-6 bg-[#F4D2E5]/10 flex justify-center items-center px-4  py-16 md:px-40">
      <div className="text-2xl font-bold text-[#715767]">
        PennyPal
      </div>
      <div className="flex gap-5 md:gap-10 text-lg text-[#4D4449] font-semibold">
        <div>About Us</div>
        <div>Features</div>
        <div>Join the Club</div>
      </div>
      <div className="text-[#46645F] font-semibold text-lg text-center">&copy; 2026 PennyPal. Made with love by Akshansh</div>
      <div className="mt-6 flex gap-4">
        <div className="bg-[#F4D2E5] rounded-full p-2">
            <FontAwesomeIcon  icon={faInstagram} color="#1A1C1A"  width={32} height={32}/>
        </div>
                <div className="bg-[#F4D2E5] rounded-full p-2">
            <FontAwesomeIcon  icon={faLinkedin} color="#1A1C1A"  width={32} height={32}/>
        </div>
                <div className="bg-[#F4D2E5] rounded-full p-2">
            <FontAwesomeIcon  icon={faGithub} color="#1A1C1A"  width={32} height={32}/>
        </div>
      </div>
    </div>
  );
}
