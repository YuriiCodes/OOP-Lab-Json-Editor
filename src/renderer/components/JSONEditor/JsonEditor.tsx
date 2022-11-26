import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import React, { useRef, useState } from 'react';


export const JsonEditor = () => {


  const JsonFileInputRef = useRef(null);
  const [json, setJson] = useState({});

  window.electron.ipcRenderer.on("general-json-ready", (args) => {
    console.log("received json");
    // @ts-ignore
    setJson(args);
  })
  return (
    <div className={'container'}>
      <div className='row'>
        <div className='col-10'>
          <h1 className={'text-white'}>Json editor</h1>
          <JSONInput
            id='a_unique_id'
            placeholder={json}
            colors={{
              string: '#DAA520' // overrides theme colors with whatever color value you want
            }}
            onChange={(obj: any) => {
              setJson(obj.jsObject);
            }}
            locale={locale}
            height='80vh'
            width={'100%'}
          />
        </div>
        <div className='col-2'>
          <form onSubmit={(e) => {
            e.preventDefault();

            console.log(JsonFileInputRef);
            debugger;
            let selectedFilePath = '';
            try {
              // @ts-ignore
              selectedFilePath = JsonFileInputRef.current.files[0].path;
            } catch (err) {
              window.electron.ipcRenderer.sendMessage('show-error-dialog', ['Please select a file']);
              return;
            }
            window.electron.ipcRenderer.sendMessage('general-json-uploaded', [selectedFilePath]);
            alert(
              // @ts-ignore
              `Selected file - ${JsonFileInputRef.current.files[0].name}`
            );
          }}>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label text-white'>Please, select the JSON file:</label>
              <input className='form-control' type='file' accept='application/json' id='formFile'
                     ref={JsonFileInputRef} />
            </div>
            <button type='submit' className='btn btn-secondary'>Submit</button>
          </form>
          <hr/>

          <button className='btn btn-primary' onClick={(e) => {
          //   export json from state to the JSON file:
            e.preventDefault();
            if(json === undefined) {
              window.electron.ipcRenderer.sendMessage('show-error-dialog', ['Please fix JSON errors']);
              return;
            }
            window.electron.ipcRenderer.sendMessage('export-json', [JSON.stringify(json)]);
          }}>Save JSON file</button>
        </div>
      </div>
    </div>
  );
};
