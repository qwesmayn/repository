import { FC, useEffect, useState } from "react";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { IMaterials } from "../models/IMaterials";
import { ITypesMaterials } from "../models/ITypesMaterials";
import MaterialBlock from "./MaterialBlock";
import StudentMaterialBlock from "./StudentMaterialBlock";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { getDisciplinesOnIdGroups, getStudents } from "../store/action_creators/actionCreatos";
import { IUser } from "../models/IUser";
import { jwtDecode } from "jwt-decode";
import Loading from "./Loadind";

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
  const { students, isLoading: studentsLoading } = useAppSelector((state) => state.userManageReducer);
  const { groupsById, isLoading: groupsLoading } = useAppSelector((state) => state.groupsByIdReducer);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    dispatch(getStudents());
    if (isStudentView) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode<IUser>(token);
        setUserId(decodedToken.id);
      }
    }
  }, [dispatch, isStudentView]);

  useEffect(() => {
    if (isStudentView && userId && students.length > 0) {
      const user = students.find(student => student._id === userId);
      if (user) {
        dispatch(getDisciplinesOnIdGroups(user.group._id));
      }
    }
  }, [isStudentView, userId, students, dispatch]);

  useEffect(() => {
    // Check if both students and groupsById are loaded and filteredMaterials can be populated
    if (!studentsLoading && !groupsLoading && userId && groupsById.length > 0) {
      setLoading(false); // Set loading to false when everything is ready
    }
  }, [studentsLoading, groupsLoading, userId, groupsById]);

  const filteredMaterials = isStudentView && !loading
    ? materials.filter(material =>
        groupsById.some(groupById => groupById.discipline._id === material.discipline)
      )
    : [];

  return (
    loading ? <Loading /> :
    <div className="flex pl-9 flex-wrap gap-20">
      {filteredMaterials.map((material) =>
        isStudentView ? (
          <StudentMaterialBlock
            key={material._id}
            material={material}
            authors={authors}
            disciplines={disciplines}
            materialsTypes={materialsTypes}
          />
        ) : (
          <MaterialBlock
            key={material._id}
            material={material}
            authors={authors}
            disciplines={disciplines}
            materialsTypes={materialsTypes}
            onSave={onSave}
            openModal={openModal}
          />
        )
      )}
    </div>
  );
};

export default MaterialsList;
