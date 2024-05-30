import { ChangeEvent, FC, useState } from "react";
import { IDiscipline } from "../models/IDiscipline";
import { IGroupsByiD } from "../models/IGroupById";

interface DisciplineRowProps {
  index: number;
  discipline: IDiscipline;
  selectedDisciplineId: string | null;
  toggleDisciplineGroups: (disciplineId: string) => void;
  groupsById: IGroupsByiD[];
  handleDeleteGroup: (groupId: string, disciplineId: string) => void;
  openModalAddGroup: () => void;
  saveDisciplineChanges: (id: string, changes: { [key: string]: any }) => void;
  handleDeleteDiscipline: (disciplineId: string) => void;
}

const DisciplineRow: FC<DisciplineRowProps> = ({
  index,
  discipline,
  selectedDisciplineId,
  toggleDisciplineGroups,
  groupsById,
  handleDeleteGroup,
  openModalAddGroup,
  handleDeleteDiscipline,
  saveDisciplineChanges,
}) => {

  const [editedDiscipline, setEditedDiscipline] = useState<IDiscipline>({ ...discipline });
  const [isEditingName, setIsEditingName] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDiscipline((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    debugger
    if (editedDiscipline.name !== discipline.name) {
      saveDisciplineChanges(discipline._id, { name: editedDiscipline.name });
    }
  };

  const handleDoubleClickName = () => {
    setIsEditingName(true);
  };

  return (
    <div key={discipline._id} className="flex transition-all justify-between duration-300 border-2 border-black mb-5 p-3">
      <div className="align-top shadow-dark-lg w-20 h-max py-3 text-center">{index + 1}</div>
      <div className="align-top shadow-dark-lg w-96 h-max py-3 overflow-hidden whitespace-nowrap text-center" onDoubleClick={handleDoubleClickName}>
        {isEditingName ? (
          <input
            type="text"
            name="name"
            value={editedDiscipline.name}
            onChange={handleChange}
            onBlur={() => setIsEditingName(false)}
            autoFocus
          />
        ) : (
          <span>{editedDiscipline.name}</span>
        )}
      </div>
      <div className="align-top">
        <button
          className="bg-white shadow-dark-lg px-20 text-black py-3 rounded transition-colors duration-300"
          onClick={() => toggleDisciplineGroups(discipline._id)}
        >
          Група ▼
        </button>
        <div
          className={`overflow-hidden transition-all duration-700 ${
            selectedDisciplineId === discipline._id ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="m-auto mb-3 mt-5 w-max bg-white border border-gray-300 rounded shadow-dark-lg p-2 overflow-y-auto">
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
      </div>
      <div className="align-top">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-3 rounded-2xl shadow-dark-lg" onClick={handleSave}>
          Зберегти зміни
        </button>
      </div>
      <div className="align-top">
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-3 rounded-2xl mr-2 shadow-dark-lg"
          onClick={() => handleDeleteDiscipline(discipline._id)}
        >
          Видалити дисципліну
        </button>
      </div>
    </div>
  );
};

export default DisciplineRow;
