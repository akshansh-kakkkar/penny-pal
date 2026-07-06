import { CATEGORIES } from "@/app/lib/Categories";
import { Heart } from "lucide-react";

interface addExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseModal({ isOpen, onClose }: addExpenseProps) {
  const categories = CATEGORIES;
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={` bg-black/20 fixed  flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white lg:w-[800px] sm:w-[400px] w-[300px] md:w-[600px] flex-col flex justify-center gap-4 items-center  rounded-3xl p-10"
      >
        <div className="flex flex-col justify-center text-center items-center">
          <div className="flex flex-col gap-2">
            <h2>Treat Yourself?</h2>
            <p>Every penny tells a story, Bestie. Let's log this one!</p>
          </div>
        </div>
        <div>
          <input placeholder="0.00" />
        </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <p>Where did it go</p>
          </div>

            <div className=" overflow-x-auto w-full ">
              <div className="min-w-max flex gap-8">
                {categories.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div  className="flex flex-shrink-0 flex-col items-center" key={item.id}>
                      <span>
                        <IconComponent />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          <div className="flex gap-6 ">
            <div className="flex gap-2 flex-col">
              <p>When happened?</p>
              <input type="date" />
            </div>
            <div className="flex gap-2 flex-col">
              <p>Details? darling.</p>
              <input type="text" placeholder="Pink latte with oat milk..." />
            </div>
          </div>

          <div>
            <button className="flex gap-4">
              <span>
                <Heart />
              </span>
              <span>Save Expense</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
