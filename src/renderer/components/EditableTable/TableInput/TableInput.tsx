import React, { SetStateAction } from 'react';
import { GroupInfo } from '../../types';


type TableInputProps = {
  text: string,
  objectNumber: number,
  setJsonToExport: React.Dispatch<SetStateAction<GroupInfo[]>>,
  jsonToExport: GroupInfo[],
  fieldName: string,
}

export const TableInput = (props: TableInputProps) => {
  const [isEditable, setIsEditable] = React.useState(true);
  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };
  return (
    <>
      {isEditable ? (
        <td onDoubleClick={toggleEditable}> {props.text} </td>) : (
        <td onDoubleClick={toggleEditable}>
          <input type='text' value={props.text} onChange={(e) => {
            const newJsonToExport = [...props.jsonToExport];

            // Find the object in the state we need to change, gives pne of the objects in the array
            const objectToChange = newJsonToExport[props.objectNumber];

            // Find the key in the object we need to change based on the props.key:
            objectToChange[props.fieldName as keyof GroupInfo] = e.target.value;
            // Change the props:
            props.setJsonToExport(newJsonToExport);
          }} />
        </td>
      )}
    </>
  );
};
