import React, { Component } from 'react';


type GroupInfo = {
  name: string,
  department: string,
  branch: string,
  chair: string,
  day: string,
  time: string,
  headman: string,
  course: string,
  subject: string,
  leader: string,
}

interface Props {
  json: GroupInfo[];
  isJsonLoaded: boolean;
}

interface State {
  jsonToExport: GroupInfo[],
}

export class LoadFile extends Component<Props, State> {
  private readonly fileInputRef: React.RefObject<unknown>;

  openSaveDialog = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.electron.ipcRenderer.sendMessage('export-to-html', [this.state.jsonToExport]);
  };

  constructor(props: any) {
    super(props);
    this.fileInputRef = React.createRef();

    this.state = {
      jsonToExport: {},
    };
  }

  // When component receives json & isJsonLoaded in props, we set it to the local state
  // to be able to use it in the export function & allow the user to export it
  static getDerivedStateFromProps(props: Props, _state: State) {
    if (props.isJsonLoaded) {
      return {
        jsonToExport: props.json,
      };
    }
    return null;
  }


  render() {
    console.log(this.state);
    // @ts-ignore
    return (
      <div className='container mt-5'>
        <div className='row'>
          <h1 className='text-white'>File load</h1>
          <form onSubmit={(e) => {
            e.preventDefault();

            let selectedFilePath = '';
            try {
              // @ts-ignore
              selectedFilePath = this.fileInputRef.current.files[0].path;
            } catch (err) {
              window.electron.ipcRenderer.sendMessage('show-error-dialog', ['Please select a file']);
              return;
            }
            window.electron.ipcRenderer.sendMessage('json-uploaded', [selectedFilePath]);
            alert(
              // @ts-ignore
              `Selected file - ${this.fileInputRef.current.files[0].name}`
            );
          }}>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label text-white'>Please, select the XML file:</label>
              {/*// @ts-ignore*/}
              <input className='form-control' type='file' accept='application/json' id='formFile'
                     ref={this.fileInputRef} />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>


          {this.props.isJsonLoaded ? <div className='tableView mt-5 p-3 bg-dark rounded'>
            <h2 className='text-white'>File preview</h2>
            <div className={'d-flex justify-content-between'}>
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
                {this.state.jsonToExport.map((group, index) => (
                  <tr className={'text-white'} key={index}>
                    <td> {group.name} </td>
                    <td> {group.department}</td>
                    <td> {group.branch} </td>
                    <td>{group.chair} </td>
                    <td> {group.day}</td>
                    <td> {group.time}</td>
                    <td> {group.headman}</td>
                    <td> {group.course} </td>
                    <td> {group.subject}</td>
                    <td> {group.leader}</td>
                  </tr>
                ))}

                </tbody>
              </table>

            </div>
          </div>: null}
        </div>
      </div>
    );
  }
}
