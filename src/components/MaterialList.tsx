import { FC } from "react";
import MaterialBlock, { Material } from "./MaterialBlock";

interface MaterialsListProps {
    materials: Material[];
    onDownload: (id: number) => void;
    onSave: (id: number) => void;
    onDelete: (id: number) => void;
}

const MaterialsList: FC<MaterialsListProps> = ({ materials, onDownload, onSave, onDelete }) => {
    return (
        <div className="flex flex-wrap gap-20">
            {materials.map(material => (
                <MaterialBlock 
                    key={material.id}
                    materials={[material]} 
                    onDownload={onDownload} 
                    onSave={onSave} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
};

export default MaterialsList;
