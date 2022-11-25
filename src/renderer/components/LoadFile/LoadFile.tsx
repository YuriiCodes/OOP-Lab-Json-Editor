import React, { Component } from 'react';
import { GroupInfo } from '../types';
import { EditableTable } from '../EditableTable/EditableTable';



interface Props {
  json: GroupInfo[];
  isJsonLoaded: boolean;
}

interface State {
  jsonToExport: GroupInfo[],
}

export class LoadFile extends Component<Props, State> {
  private readonly fileInputRef: React.LegacyRef<HTMLInputElement>;

  openSaveDialog = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.electron.ipcRenderer.sendMessage('export-to-html', [this.state.jsonToExport]);
  };

  constructor(props: any) {
    super(props);
    this.fileInputRef = React.createRef();


    this.state = {
      // @ts-ignore
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
              <label htmlFor='formFile' className='form-label text-white'>Please, select the JSON file:</label>
              {/*// @ts-ignore*/}
              <input className='form-control' type='file' accept='application/json' id='formFile'
                     ref={this.fileInputRef} />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>


          {this.props.isJsonLoaded ? <div className='tableView mt-5 p-3 bg-dark rounded'>
            <h2 className='text-white'>File preview</h2>
            <div className={'d-flex justify-content-between'}>
              <EditableTable jsonToExport={this.props.json} />
            </div>
          </div>: null}
        </div>
      </div>
    );
  }
}
