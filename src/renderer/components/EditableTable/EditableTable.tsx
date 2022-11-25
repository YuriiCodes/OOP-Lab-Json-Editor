import { TableInput } from './TableInput/TableInput';
import React from 'react';
import { GroupInfo } from '../types';

type EditableTableProps = {
  jsonToExport: GroupInfo[];
}

// function to validate time. Must be in format HH:MM
const validateTime = (time: string) => {
  const timeRegex = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$');
  return timeRegex.test(time);
}
export const EditableTable = (props: EditableTableProps) => {
  const [jsonToExport, setJsonToExport] = React.useState(props.jsonToExport);

  // state variables to add new objects to the table
  const [newName, setNewName] = React.useState('');
  const [newDepartment, setNewDepartment] = React.useState('');
  const [newBranch, setNewBranch] = React.useState('');
  const [newChair, setNewChair] = React.useState('');
  const [newDay, setNewDay] = React.useState('');
  const [newTime, setNewTime] = React.useState('');
  const [newHeadman, setNewHeadman] = React.useState('');
  const [newCourse, setNewCourse] = React.useState('');
  const [newSubject, setNewSubject] = React.useState('');
  const [newLeader, setNewLeader] = React.useState('');


  return (
    <div>
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
        <>
          {jsonToExport.map((group, index) => (
            <tr className={'text-white'} key={index}>
              <TableInput text={group.name} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'name'} />
              <TableInput text={group.department} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'department'} />
              <TableInput text={group.branch} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'branch'} />
              <TableInput text={group.chair} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'chair'} />
              <TableInput text={group.day} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'day'} />
              <TableInput text={group.time} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'time'} />
              <TableInput text={group.headman} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'headman'} />
              <TableInput text={group.course} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'course'} />
              <TableInput text={group.subject} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'subject'} />
              <TableInput text={group.leader} objectNumber={index} setJsonToExport={setJsonToExport}
                          jsonToExport={jsonToExport} fieldName={'leader'} />
            </tr>

          ))}
          <tr>
            <td>
              <input className={'w-100 h-auto'} type='text' value={newName} placeholder={'Name'} onChange={(e) => {
                setNewName(e.target.value);
              }} />
            </td>
            <td>
              <input className={'w-100 h-auto'} type='text' value={newDepartment} placeholder={'Department'}
                     onChange={(e) => {
                       setNewDepartment(e.target.value);
                     }} />
            </td>
            <td><input className={'w-75 h-50'} type='text' value={newBranch} placeholder={'Branch'} onChange={(e) => {
              setNewBranch(e.target.value);
            }} />
            </td>
            <td><input className={'w-100 h-auto'} type='text' value={newChair} placeholder={'Chair'} onChange={(e) => {
              setNewChair(e.target.value);
            }} /></td>
            <td>
              <input type='text' value={newDay} placeholder={'Day'} onChange={(e) => {
                setNewDay(e.target.value);
              }} />
            </td>
            <td><input className={'w-100 h-auto'} type='text' value={newTime} placeholder={'Time'} onChange={(e) => {
              setNewTime(e.target.value);
            }} /></td>
            <td><input className={'w-100 h-auto'} type='text' value={newHeadman} placeholder={'Headman'} onChange={(e) => {
              setNewHeadman(e.target.value);
            }} /></td>
            <td><input className={'w-100 h-auto'} type='text' value={newCourse} placeholder={'Course'} onChange={(e) => {
              setNewCourse(e.target.value);
            }} /></td>
            <td><input className={'w-100 h-auto'} type='text' value={newSubject} placeholder={'Subject'} onChange={(e) => {
              setNewSubject(e.target.value);
            }} /></td>

            <td className={'d-flex'}>
              <input className={'w-100 h-auto'} type='text' value={newLeader} placeholder={'Leader'} onChange={(e) => {
                setNewLeader(e.target.value);
              }} />
              <button className={'btn btn-success'} onClick={(e) => {
                e.preventDefault();
                // check if values are empty
                if (newName === '' || newDepartment === '' || newBranch === '' || newChair === '' || newDay === '' || newTime === '' || newHeadman === '' || newCourse === '' || newSubject === '' || newLeader === '') {
                  alert('Please fill all fields');
                  return;
                }

                // validate day value case insensitive:
                if (newDay.toLowerCase() !== 'monday' && newDay.toLowerCase() !== 'tuesday' && newDay.toLowerCase() !== 'wednesday' && newDay.toLowerCase() !== 'thursday' && newDay.toLowerCase() !== 'friday' && newDay.toLowerCase() !== 'saturday' && newDay.toLowerCase() !== 'sunday') {
                  alert('Please enter a valid day');
                  return;
                }

                // validate time value, must be in format hh:mm
                if (!validateTime(newTime)) {
                  alert('Please enter a valid time');
                  return;
                }
                setJsonToExport([...jsonToExport, {
                  name: newName,
                  department: newDepartment,
                  branch: newBranch,
                  chair: newChair,
                  day: newDay,
                  time: newTime,
                  headman: newHeadman,
                  course: newCourse,
                  subject: newSubject,
                  leader: newLeader
                }]);
                setNewName('');
                setNewDepartment('');
                setNewBranch('');
                setNewChair('');
                setNewDay('');
                setNewTime('');
                setNewHeadman('');
                setNewCourse('');
                setNewSubject('');
                setNewLeader('');

              }}>Add
              </button>
            </td>

          </tr>
        </>
        </tbody>
      </table>
    </div>
  );
};
