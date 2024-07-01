import { FC, useEffect, useState } from "react";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { IMaterials } from "../models/IMaterials";
import { ITypesMaterials } from "../models/ITypesMaterials";
import MaterialBlock from "./MaterialBlock";
import StudentMaterialBlock from "./StudentMaterialBlock";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import {
  getDisciplinesOnIdGroups,
  getDisciplinesOnIdStudents,
  getStudents,
} from "../store/action_creators/actionCreatos";
import { IUser } from "../models/IUser";
import { jwtDecode } from "jwt-decode";
import Loading from "./Loadind";
import { IStudentById } from "../models/IStudentById";

interface MaterialsListProps {
  materials: IMaterials[];
  authors: IAuthors[];
  disciplines: IDiscipline[];
  materialsTypes: ITypesMaterials[];
  onSave: (id: string, change: object) => void;
  openModal: (id: string) => void;
  isStudentView?: boolean;
}

const MaterialsList: FC<MaterialsListProps> = ({
  materials,
  authors,
  disciplines,
  materialsTypes,
  onSave,
  openModal,
  isStudentView = false,
}) => {
  const dispatch = useAppDispatch();
  const { students, isLoading: studentsLoading } = useAppSelector(
    (state) => state.userManageReducer
  );
  const { groupsById, isLoading: groupsLoading } = useAppSelector(
    (state) => state.groupsByIdReducer
  );
  const { studentsById } = useAppSelector(
    (state) => state.studentByIdReducer
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isStudentView) {
      dispatch(getStudents());
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<IUser>(token);
        setUserId(decodedToken.id);
      }
    }
  }, [dispatch, isStudentView]);

  useEffect(() => {
    if (isStudentView && userId && students.length > 0) {
      const user = students.find((student) => student._id === userId);
      if (user) {
          dispatch(getDisciplinesOnIdGroups(user.group._id));
          dispatch(getDisciplinesOnIdStudents(user._id));
                            setLoading(true);
      }
    }
  }, [isStudentView, userId, students, dispatch]);

  useEffect(() => {
    if (
      isStudentView &&
      userId &&
      !studentsLoading &&
      !groupsLoading &&
      groupsById.length > 0 || studentsById.length > 0
    ) {
      setLoading(false);
    }
  }, [isStudentView, userId, studentsLoading, groupsLoading, groupsById, studentsById]);

  // Filter materials based on student's disciplines
  const filteredMaterials = isStudentView && !loading
    ? materials.filter((material) => {
        return groupsById.some((group) => group.discipline?._id === material.discipline) ||
        studentsById.some((student) => student.discipline?._id  === material.discipline)
      })
    : materials;
  

  return loading ? (
    <Loading />
  ) : (
    <div className="flex pl-9 flex-wrap gap-20">
      {isStudentView
        ? filteredMaterials.map((material) => (
            <StudentMaterialBlock
              key={material._id}
              material={material}
              authors={authors}
              disciplines={disciplines}
              materialsTypes={materialsTypes}
            />
          ))
        : materials.map((material) => (
            <MaterialBlock
              key={material._id}
              material={material}
              authors={authors}
              disciplines={disciplines}
              materialsTypes={materialsTypes}
              onSave={onSave}
              openModal={openModal}
            />
          ))}
    </div>
  );
};

export default MaterialsList;
