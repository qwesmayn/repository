import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks";
import { createLinkStudnet, getDisciplines, getStudents } from "../../store/action_creators/actionCreatos";
import { clearErrors } from "../../store/reducers/groupSlice";
import ErrorAlert from "../ErrorAlert";
import i18n from "../../i18n";

interface ModalAddStudentProps {
  isOpen: boolean;
  onRequestClose: (isOpen: boolean) => void;
  disciplineId: string;
}

const ModalAddStudent: FC<ModalAddStudentProps> = ({ isOpen, onRequestClose, disciplineId }) => {
  const dispatch = useAppDispatch();
  const { students } = useAppSelector(
    (state) => state.userManageReducer
  );
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isStudentListOpen, setIsStudentListOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(getStudents());
    }
  }, [isOpen]);

  const handleToggleStudentList = () => {
    setIsStudentListOpen(!isStudentListOpen);
  };

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedStudents.length > 0) {
        await Promise.all(selectedStudents.map(studentId => dispatch(createLinkStudnet({ studentId, disciplineId }))));
        debugger
        dispatch(getDisciplines());
        onRequestClose(false);
      }
    } catch (error) {
      setLocalError("Не удалось добавить связь между дисциплиной и студентом");
    }
  };

  const clearError = () => {
    dispatch(clearErrors());
    setLocalError(null);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/12">
            <h2 className="text-xl mb-4">{i18n.t('userManage.addStudent')}</h2>
            <div className="flex justify-center space-x-4">
              <div>
                <button
                  className="bg-bg-blue-design border border-gray-300 rounded-lg p-2 w-64 transition duration-500 ease-in-out"
                  onClick={handleToggleStudentList}
                >
                  {i18n.t('userManage.student')}
                </button>
                {isStudentListOpen && (
                  <ul className="bg-bg-blue-design mt-1 border border-gray-300 w-64 rounded-lg p-2 max-h-60 overflow-y-auto">
                    {students.map((student) => (
                      <li key={student._id}>
                        <button
                          className={`w-full text-left py-2 rounded-lg ${selectedStudents.includes(student._id) ? "bg-blue-500 mb-1 text-center text-white" : "bg-white mb-2 text-black text-center"}`}
                          onClick={() => handleToggleStudent(student._id)}
                        >
                          {student.fullName}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleSubmit}
                    className={`bg-bg-blue-design mr-3 text-black px-4 py-2 rounded-2xl shadow-dark-lg  ${selectedStudents.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={selectedStudents.length === 0}
                  >
                    {i18n.t('userManage.buttonSave')}
                  </button>
                  <button
                    onClick={() => onRequestClose(false)}
                    className="bg-bg-blue-design text-black py-2 px-4 rounded-2xl shadow-dark-lg"
                  >
                    {i18n.t('userManage.buttonCancel')}
                  </button>
                </div>
                <div className="bg-bg-blue-design flex flex-col border border-gray-300 rounded-lg p-4 w-full">
                  <h3 className="text-lg">{i18n.t('disciplinesManage.selectedStudent')}</h3>
                  {selectedStudents.map(studentId => (
                    <p key={studentId} className="mt-2">{students.find((student) => student._id === studentId)?.fullName}</p>
                  ))}
                </div>
              </div>
            </div>
            {localError && (
              <ErrorAlert error={localError} clearError={clearError} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAddStudent;
