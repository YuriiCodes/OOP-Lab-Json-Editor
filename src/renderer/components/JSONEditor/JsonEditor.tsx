import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { useEffect, useState } from 'react';


export const JsonEditor = () => {
  // set json after 5 seconds of initial loading:
  useEffect(() => {
    setTimeout(() => {
      setJson({
        "name": "Linear Algrebra",
        "department": "Mathematics",
        "branch": "Mathematical Analysis",
        "chair": "Professor, Doctor of Technical Sciences, Professor of the Department of Computer Science and Engineering",
        "day": "Wednesday",
        "time": "18:00",
        "headman": "Alexander the great",
        "course": "Linear algebra basics",
        "subject": "Computer Science",
        "leader": "Kozlovsky Alexander"
      });
    }, 5000);
  }, [])
  const [json, setJson] = useState({});
  return (
    <div className={'container'}>
      <div className='row'>
        <div className='col-10'>
        <h1 className={"text-white"}>Json editor</h1>
        <JSONInput
          id='a_unique_id'
          placeholder={json}
          colors={{
            string: '#DAA520' // overrides theme colors with whatever color value you want
          }}
          locale={locale}
          height='80vh'
          width={'100%'}
        />
        </div>
        <div className='col-2'>
          Hello
        </div>
      </div>
    </div>
  );
};
