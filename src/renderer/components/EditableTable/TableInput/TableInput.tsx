import React, { SetStateAction } from 'react';
import { GroupInfo } from '../../types';


type TableInputProps = {
  text: string,
  objectNumber: number,
  setJsonToExport: React.Dispatch<SetStateAction<GroupInfo[]>>,
  jsonToExport: GroupInfo[],
  fieldName: string,
  validators? : {
    [key: string]: (value: string) => boolean
  }
}

export const TableInput = (props: TableInputProps) => {
  const [isEditable, setIsEditable] = React.useState(true);

  const handleInputDoubleClick = () => {
    if (props.validators && props.validators[props.fieldName] && !props.validators[props.fieldName](props.text)) {
      // When the value is invalid we show the user error message & don't toggle the editable state
        alert('Please enter a valid value');
        return;
    }
    setIsEditable(!isEditable);
  }
  return (
    <>
      {isEditable ? (
        <td onDoubleClick={handleInputDoubleClick}> {props.text} </td>) : (
        <td onDoubleClick={handleInputDoubleClick}>
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
