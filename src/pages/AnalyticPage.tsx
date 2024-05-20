import { FC, useState } from "react";
import MaterialsList from "../components/MaterialList";
import { Material } from "../components/MaterialBlock";
import Dropdown from "../components/DropDown";
const AnalyticPage: FC = () => {
    const materials: Material[] = [
        {
            id: 1,
            image: 'https://via.placeholder.com/250x100',
            name: 'Навчальний матеріал 1',
            description: 'Опис матеріалу 1',
            discipline: 'Математика',
            material_type: 'Підручник',
            author: 'Іван Іванов',
            view: 123,
            date: '2023-05-17',
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/250x100',
            name: 'Навчальний матеріал 2',
            description: 'Опис матеріалу 2',
            discipline: 'Фізика',
            material_type: 'Лабораторна',
            author: 'Петро Петренко',
            view: 45,
            date: '2023-05-18',
        },
    ];

    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
    const [selectedMaterialType, setSelectedMaterialType] = useState<string>('');

    const handleDownload = (id: number) => {
        console.log('Download material', id);
    };

    const handleSave = (id: number) => {
        console.log('Save changes', id);
    };

    const handleDelete = (id: number) => {
        console.log('Delete material', id);
    };

    const handleDisciplineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDiscipline(event.target.value);
    };

    const handleMaterialTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMaterialType(event.target.value);
    };

    const filteredMaterials = materials.filter((material) => {
        return (
            (selectedDiscipline === '' || material.discipline === selectedDiscipline) &&
            (selectedMaterialType === '' || material.material_type === selectedMaterialType)
        );
    });

    return (
        <div>
            <div className="p-8">
                <div className="pl-9 mb-[62px] flex gap-4">
                    <Dropdown
                        value={selectedDiscipline}
                        onChange={handleDisciplineChange}
                        options={[
                            { value: 'Математика', label: 'Математика' },
                            { value: 'Фізика', label: 'Фізика' },
                        ]}
                        placeholder="Вибір дисципліни"
                    />
                    <Dropdown
                        value={selectedMaterialType}
                        onChange={handleMaterialTypeChange}
                        options={[
                            { value: 'Підручник', label: 'Підручник' },
                            { value: 'Лабораторна', label: 'Лабораторна' },
                        ]}
                        placeholder="Вибір типу матеріалу"
                    />
                </div>
                <MaterialsList 
                    materials={filteredMaterials} 
                    onDownload={handleDownload} 
                    onSave={handleSave} 
                    onDelete={handleDelete} 
                />
            </div>
        </div>
    );
};

export default AnalyticPage;
