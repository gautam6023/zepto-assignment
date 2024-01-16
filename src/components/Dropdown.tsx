import { useEffect, useRef, useState } from "react";
import { IUsers, users } from "./Users";
import DropdownCard from "./DropdownCard";
import Avatar from "./Avatar";
import { generateRandomHexColorCode } from "../utils/hexGenerator";
import { IoMdClose } from "react-icons/io";

const Dropdown = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(true);
  const [userlist, setUserList] = useState<IUsers[]>(users);
  const [selectedUsers, setSelectedUsers] = useState<IUsers[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  const dropdownContentRef = useRef<null | HTMLDivElement>(null);
  const [isBackspacePressed, setIsBackspacePressed] = useState<boolean>(false);
  useEffect(() => {
    searchUsersAndSet(searchText);
  }, [searchText]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!containerRef.current || containerRef.current.contains(event.target as Node)) {
        return;
      }
      setIsFocused(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [containerRef, dropdownContentRef]);

  const searchUsersAndSet = (text: string) => {
    if (!text) {
      if (selectedUsers.length > 0) {
        handleRemainedUsers(users);
      } else {
        setUserList(users);
      }
    } else {
      text = text.trim();
      const searchedUsers = userlist.filter((el) => {
        const cleanedName = el.name.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove non-alphanumeric characters and spaces
        const searchPattern = new RegExp(text, "i"); // Case-insensitive search

        return cleanedName.match(searchPattern);
      });

      setUserList([...searchedUsers]);
    }
  };

  const handleAddUser = (user: IUsers) => {
    //removed user from user list
    setSearchText("");
    inputRef.current?.focus();
    setIsFocused(true);
    setIsBackspacePressed(false);
    const filteredUsers = userlist.filter((el) => {
      return el.id !== user.id;
    });

    //Added that user id to the selected list
    setSelectedUsers([...selectedUsers, user]);

    //Updated the user list
    setUserList(filteredUsers);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && selectedUsers.length > 0 && !isBackspacePressed) {
      setIsBackspacePressed(true);
    }
    if (isBackspacePressed) {
      const newSelectedUsers = [...selectedUsers];
      newSelectedUsers.pop();
      setSelectedUsers([...newSelectedUsers]);
      setIsBackspacePressed(false);
      handleRemainedUsers(newSelectedUsers);
    }
  };

  const handleDelete = (id: string) => {
    const updatedUsers = selectedUsers.filter((el) => el.id !== id);
    setSelectedUsers([...updatedUsers]);
    handleRemainedUsers(updatedUsers);
  };

  const handleRemainedUsers = (userList: IUsers[]) => {
    const remainedUsers = users.filter((el) => !userList.find((e) => el.id === e.id));
    setUserList(remainedUsers);
  };
  return (
    <>
      {/* Container */}
      <div
        className="m-auto w-[650px]"
        ref={containerRef}
        onClick={() => {
          if (containerRef.current) {
            setIsFocused(true);
          }
        }}
      >
        <div
          className={`border-[1px] ${
            isFocused ? "border-blue-500 cursor-text" : "border-gray-300"
          }  mt-[50px] h-min-[50px] rounded-md hover:cursor-text px-[15px] py-[5px] flex flex-wrap w-[100%]`}
        >
          {/* Selected Users */}
          <div className="flex items-center gap-[10px] flex-wrap flex-grow">
            {selectedUsers.map((el, idx) => {
              return (
                <div
                  key={el.id}
                  className={`h-[30px] flex items-center w-fit rounded-full pr-[15px] ${
                    isBackspacePressed && idx === selectedUsers.length - 1
                      ? "bg-red-500 border-black-600  text-[#FFF]"
                      : "bg-zinc-300"
                  } gap-[15px]`}
                >
                  <Avatar size={"35px"} bg={generateRandomHexColorCode(el.email)} text={el.name[0]} />
                  <p>{el.name}</p>
                  <span className="text-[20px] font-semibold cursor-pointer" onClick={() => handleDelete(el.id)}>
                    <IoMdClose />
                  </span>
                </div>
              );
            })}

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              className="h-[35px] focus:outline-none flex-grow"
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={!isFocused ? "Click here and search user name !" : ""}
            />
          </div>
        </div>
        {isFocused && (
          <div
            className="mt-[6px] max-h-[500px] overflow-y-scroll border-[1px] border-gray-200 cursor-pointer rounded-md"
            ref={dropdownContentRef}
          >
            {userlist.map((el) => (
              <DropdownCard onClick={handleAddUser} {...el} key={el.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
