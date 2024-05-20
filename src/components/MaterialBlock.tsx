import { FC } from "react";

export interface Material {
    id: number;
    image: string;
    name: string;
    description: string;
    discipline: string;
    material_type: string;
    author: string;
    view: number;
    date: string;
}

interface MaterialBlockProps {
    materials: Material[];
    onDownload: (id: number) => void;
    onSave: (id: number) => void;
    onDelete: (id: number) => void;
}

const MaterialBlock: FC<MaterialBlockProps> = ({ materials, onDownload, onSave, onDelete }) => {
    return (
        <>
            {materials.map(({ id, image, name, description, discipline, material_type, author, view, date }) => (
                <div key={id} className="flex flex-col justify-between w-max py-6 px-9 h-full rounded-3xl border-x-2 border-gray-200 shadow-2xl">
                    <img src={image} alt={name} className="object-cover rounded-lg mb-4" />
                    <div className="h-full flex flex-col text-center">
                        <div>
                            <p className="text-2xl mb-2">{name}</p>
                            <p className="text-gray-600 mb-2">{description}</p>
                            <p className="text-gray-600 mb-2">{discipline}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center flex-col">
                                    <p className="text-gray-600 mb-4">{material_type}</p>
                                    <p className="text-gray-600"><strong>{view}</strong> переглядів</p>
                                </div>
                                <div className="flex items-center flex-col">
                                    <p className="text-gray-600 mb-4">{author}</p>
                                    <strong className="text-gray-600">{new Date(date).toLocaleDateString()}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 mt-2"> {/* Изменение пространства здесь */}
                            <button onClick={() => onDownload(id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Скачати матеріал</button>
                            <button onClick={() => onSave(id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Зберегти зміни</button>
                            <button onClick={() => onDelete(id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Видалити</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MaterialBlock;
