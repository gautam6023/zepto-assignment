import { generateRandomHexColorCode } from "../utils/hexGenerator";
import Avatar from "./Avatar";
import { IUsers } from "./Users";

interface IDropdownCard extends IUsers {
  onClick: (user: IUsers) => void;
}

const DropdownCard = ({ email, id, name, onClick }: IDropdownCard) => {
  const avatarBg = generateRandomHexColorCode(email);

  return (
    <div
      className="h-[50px] border-gray-200 border-b-[1px] flex items-center gap-[15px] hover:bg-gray-200 px-[10px]"
      onClick={() => onClick({ id, email, name })}
    >
      <Avatar bg={avatarBg} text={name[0]} />
      <div className="flex flex-col items-start">
        <p className="font-normal text-[16px]">{name}</p>
        <p className="text-gray-500 text-[12px]">{email}</p>
      </div>
    </div>
  );
};

export default DropdownCard;
