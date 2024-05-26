import { FC } from "react";

interface DisciplinesFilterProps {
  selectedDiscipline: string;
  handleDisciplineChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disciplines: string[];
}

const DisciplinesFilter: FC<DisciplinesFilterProps> = ({ 
  selectedDiscipline, 
  handleDisciplineChange, 
  disciplines 
}) => (
  <select
    value={selectedDiscipline}
    onChange={handleDisciplineChange}
    className="px-4 py-2 bg-gray-200 rounded-2xl shadow-xl"
  >
    <option value="all">Всі дисципліни</option>
    {Array.from(new Set(disciplines))
      .filter((disciplineName) => disciplineName)
      .map((disciplineName) => (
        <option key={disciplineName} value={disciplineName}>
          {disciplineName}
        </option>
      ))}
  </select>
);

export default DisciplinesFilter;
