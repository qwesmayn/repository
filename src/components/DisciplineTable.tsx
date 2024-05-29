import { FC } from "react";
import { IDiscipline } from "../models/IDiscipline";
import { IGroupsByiD } from "../models/IGroupById";

interface Props {
  disciplines: IDiscipline[];
  groupsById: IGroupsByiD[];
  selectedDisciplineId: string | null;
  toggleDisciplineGroups: (disciplineId: string) => void;
  handleDeleteDiscipline: (disciplineId: string) => void;
  handleDeleteGroup: (groupId: string, disciplineId: string) => void;
  openModalAddGroup: () => void;
}

const DisciplineTable: FC<Props> = ({
  disciplines,
  groupsById,
  selectedDisciplineId,
  toggleDisciplineGroups,
  handleDeleteDiscipline,
  handleDeleteGroup,
  openModalAddGroup,
}) => {
  // Если не выбрано значение дисциплины, показываем все дисциплины
  const filteredDisciplines = selectedDisciplineId
    ? disciplines.filter((discipline) => discipline._id === selectedDisciplineId)
    : disciplines;

  return (
    <table className="min-w-full bg-white border-separate border-spacing-5 text-center">
      <tbody>
        {filteredDisciplines.map((discipline, index) => (
          <tr key={discipline._id}>
            <td className="align-top">{index + 1}</td>
            <td className="align-top">{discipline.name}</td>
            <td className="align-top">
              <button
                className="bg-white shadow-xl px-20 text-black py-2 rounded transition-colors duration-300"
                onClick={() => toggleDisciplineGroups(discipline._id)}
              >
                Група ▼
              </button>
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  selectedDisciplineId === discipline._id ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-lg p-2 overflow-y-auto">
                  {groupsById
                    .filter((group) => group.discipline === discipline._id)
                    .map((group) => (
                      <li
                        key={group._id}
                        className="flex justify-between items-center px-2 py-1 border-b"
                      >
                        <span className="mr-6">{group.group.name}</span>
                        <button
                          className="text-red-500 transition-colors duration-300"
                          onClick={() =>
                            handleDeleteGroup(group.group._id, group.discipline)
                          }
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  <li className="flex justify-between items-center px-2 py-1 border-b">
                    <button
                      className="text-blue-500 transition-colors duration-300"
                      onClick={() => {
                        openModalAddGroup();
                      }}
                    >
                      Додати групу
                    </button>
                  </li>
                </ul>
              </div>
            </td>
            <td className="align-top">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md">
                Зберегти зміни
              </button>
            </td>
            <td className="align-top">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mr-2"
                onClick={() => handleDeleteDiscipline(discipline._id)}
              >
                Видалити дисципліну
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisciplineTable;
