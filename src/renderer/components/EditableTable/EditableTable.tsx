import { TableInput } from './TableInput/TableInput';
import React from 'react';
import { GroupInfo } from '../types';

type EditableTableProps = {
  jsonToExport: GroupInfo[];
}
export const EditableTable = (props: EditableTableProps) => {
  const [jsonToExport, setJsonToExport] = React.useState(props.jsonToExport);
  return (
    <table className='table text-white table-dark'>
      <thead>
      <tr>
        <th scope='col'>Name</th>
        <th scope='col'>Department</th>
        <th scope='col'>Branch</th>
        <th scope='col'>Chair</th>
        <th scope='col'>Day</th>
        <th scope='col'>Time</th>
        <th scope='col'>Headman</th>
        <th scope='col'>Course</th>
        <th scope='col'>subject</th>
        <th scope='col'>leader</th>
      </tr>
      </thead>
      <tbody>
      {jsonToExport.map((group, index) => (
        <tr className={'text-white'} key={index}>
          <TableInput text={group.name} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"name"} />
          <TableInput text={group.department} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"department"}/>
          <TableInput text={group.branch} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"branch"}/>
          <TableInput text={group.chair} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"chair"}/>
          <TableInput text={group.day} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"day"}/>
          <TableInput text={group.time} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"time"}/>
          <TableInput text={group.headman} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"headman"}/>
          <TableInput text={group.course} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"course"}/>
          <TableInput text={group.subject} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"subject"}/>
          <TableInput text={group.leader} objectNumber={index} setJsonToExport={setJsonToExport}
                      jsonToExport={jsonToExport} fieldName={"leader"}/>
        </tr>
      ))}
      </tbody>
    </table>
  );
};
