import { FC } from "react";
import MaterialBlock from "./MaterialBlock";
import { IMaterials} from "../models/IMaterials";
import { IAuthors } from "../models/IAuthors";
import { IDiscipline } from "../models/IDiscipline";
import { ITypesMaterials } from "../models/ITypesMaterials";

interface MaterialsListProps {
    materials: IMaterials[];
    authors: IAuthors[];
    disciplines: IDiscipline[];
    materialsTypes: ITypesMaterials[];
    onDownload: (id: string) => void;
    onSave: (id: string, change : object) => void;
    openModal: (id: string) => void;
}

const MaterialsList: FC<MaterialsListProps> = ({ materials, authors, disciplines, materialsTypes, onDownload, onSave, openModal }) => {
    return (
        <div className="flex pl-9 flex-wrap gap-20">
            {materials.map(material => (
                <MaterialBlock 
                    key={material._id}
                    material={material}
                    authors={authors}
                    disciplines={disciplines}
                    materialsTypes={materialsTypes}
                    onDownload={onDownload} 
                    onSave={onSave} 
                    openModal={openModal} 
                />
            ))}
        </div>
    );
};

export default MaterialsList;
