import { FC } from "react";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { IMaterials } from "../models/IMaterials";
import { ITypesMaterials } from "../models/ITypesMaterials";
import MaterialBlock from "./MaterialBlock";
import StudentMaterialBlock from "./StudentMaterialBlock";

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
  isStudentView
}) => {
  return (
    <div className="flex pl-9 flex-wrap gap-20">
      {materials.map((material) =>
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
