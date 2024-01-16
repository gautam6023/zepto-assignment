import { generateRandomHexColorCode } from "../utils/hexGenerator";
import { IUsers } from "./Users";

const DropdownCard = ({ email, id, name }: IUsers) => {
  const avatarBg = generateRandomHexColorCode(email);
  console.log(avatarBg);

  return (
    <div className="h-[50px] border-gray-200 border-b-[1px] flex items-center gap-[15px] hover:bg-gray-200 px-[10px]">
      <div
        className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-[18px] text-[#FFF]"
        style={{
          background: avatarBg,
        }}
      >
        {name[0]}
      </div>
      <div className="flex flex-col items-start">
        <p className="font-normal text-[16px]">{name}</p>
        <p className="text-gray-500 text-[12px]">{email}</p>
      </div>
    </div>
  );
};

export default DropdownCard;
