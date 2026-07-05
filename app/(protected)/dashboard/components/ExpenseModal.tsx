interface addExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ExpenseModal({ isOpen, onClose }: addExpenseProps) {
  if (!isOpen) return null;

  return (
    <div className={` bg-black/20 fixed flex inset-0 z-40 backdrop-blur-sm justify-center items-center `}>
      <div className="bg-white p-4 flex justify-center items-center  rounded-2xl">
        <h2>My Modal</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}