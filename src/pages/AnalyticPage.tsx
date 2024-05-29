import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typeHooks";
import { getMaterials, getAuthors, getDisciplines, getMaterialsTypes, deleteMaterials, changeMaterials } from "../store/action_creators/actionCreatos";
import Dropdown from "../components/DropDown";
import MaterialsList from "../components/MaterialList";

const AnalyticPage: FC = () => {
    const dispatch = useAppDispatch();
    const { disciplines } = useAppSelector((state) => state.disciplineReducer);
    const { materials, materialsTypes } = useAppSelector((state) => state.materialReducer);
    const { authors} = useAppSelector((state) => state.userManageReducer);
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
    const [selectedMaterialType, setSelectedMaterialType] = useState<string>('');

    useEffect(() => {
        dispatch(getMaterials());
        dispatch(getAuthors());
        dispatch(getDisciplines());
        dispatch(getMaterialsTypes());
    }, [dispatch]);

    const handleDownload = (id: string) => {
        console.log('Download material', id);
    };

    const handleSave = (id: string, change : object) => {
        dispatch(changeMaterials({ id : id , change : change}))
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteMaterials(id))
        await dispatch(getMaterials())
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
            (selectedMaterialType === '' || material.materialType === selectedMaterialType)
        );
    });

    return (
        <div>
            <div className="p-8">
                <div className="pl-9 mb-[62px] flex gap-4">
                    <Dropdown
                        value={selectedDiscipline}
                        onChange={handleDisciplineChange}
                        options={disciplines.map(discipline => ({
                            value: discipline._id,
                            label: discipline.name,
                        }))}
                        placeholder="Вибір дисципліни"
                    />
                    <Dropdown
                        value={selectedMaterialType}
                        onChange={handleMaterialTypeChange}
                        options={materialsTypes.map(type => ({
                            value: type._id,
                            label: type.name,
                        }))}
                        placeholder="Вибір типу матеріалу"
                    />
                </div>
                <MaterialsList 
                    materials={filteredMaterials} 
                    authors={authors}
                    disciplines={disciplines}
                    materialsTypes={materialsTypes}
                    onDownload={handleDownload} 
                    onSave={handleSave} 
                    onDelete={handleDelete} 
                />
            </div>
        </div>
    );
};

export default AnalyticPage;
