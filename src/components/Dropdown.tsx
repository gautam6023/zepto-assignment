import { useEffect, useRef, useState } from "react";
import { IUsers, users } from "./Users";
import DropdownCard from "./DropdownCard";

const Dropdown = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [userlist, setUserList] = useState<IUsers[]>(users);
  const [selectedUsers, setSelectedUsers] = useState<IUsers[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<IUsers[]>([]);

  useEffect(() => {
    searchUsersAndSet(searchText);
  }, [searchText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [containerRef]);

  const searchUsersAndSet = (text: string) => {
    if (!text) {
      setUserList(userlist);
    } else {
      text = text.trim();
      const searchedUsers = userlist.filter((el) => {
        const cleanedName = el.name.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove non-alphanumeric characters and spaces
        const searchPattern = new RegExp(text, "i"); // Case-insensitive search

        return cleanedName.match(searchPattern);
      });

      setFilteredUsers([...searchedUsers]);
    }
  };

  return (
    <div className="w-[400px] m-auto">
      <div
        ref={containerRef}
        onClick={() => {
          if (containerRef.current) {
            containerRef.current.focus();
            setIsFocused(true);
          }
        }}
        onBlur={() => setIsFocused(false)}
        className={`m-auto border-[1px] ${
          isFocused ? "border-blue-500 cursor-text" : "border-gray-300"
        }  mt-[50px] h-[50px] rounded-full hover:cursor-text px-[15px] py-[5px]`}
      >
        <input
          type="text"
          className="border-[1px] w-[100%] h-[100%] focus:outline-none"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        />
        <div className="mt-[6px] h-[500px] overflow-y-scroll border-[1px] border-gray-200 cursor-pointer rounded-md">
          {searchText
            ? filteredUsers.map((el) => <DropdownCard {...el} key={el.id} />)
            : userlist.map((el) => <DropdownCard {...el} key={el.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
