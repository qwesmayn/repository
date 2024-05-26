import { FC } from "react";

interface GroupFilterProps {
  selectedGroup: string;
  handleGroupChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  groups: (string | undefined)[];
}

const GroupFilter: FC<GroupFilterProps> = ({ selectedGroup, handleGroupChange, groups }) => (
  <select
    value={selectedGroup}
    onChange={handleGroupChange}
    className="px-4 py-2 bg-gray-200 rounded-3xl shadow-xl"
  >
    <option value="all">Вибор групи</option>
    {Array.from(new Set(groups))
      .filter((groupName) => groupName)
      .map((groupName) => (
        <option key={groupName} value={groupName}>
          {groupName}
        </option>
      ))}
  </select>
);

export default GroupFilter;
