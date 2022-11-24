import React, {Component} from "react";
import {JSONTree} from 'react-json-tree';


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
type JsonTreeProps = {
  scientistpersonnel: {
    group: GroupInfo[]
  }
}

interface Props {
  json: JsonTreeProps
  isJsonLoaded: boolean
}

interface State {
  nameSearch: string,
  departmentSearch: string,
  branchSearch: string,
  chairSearch: string,
  daySearch: string,
  timeSearch: string,
  headmanSearch: string,
  courseSearch: string,
  subjectSearch: string,
  leaderSearch: string,
  jsonSearchRes: any,
  isJsonToExportValid: boolean,
}

export class LoadFile extends Component<Props, State> {
  private readonly fileInputRef: React.RefObject<unknown>;
  private readonly theme = {
    scheme: 'apathy',
    author: 'jannik siebert (https://github.com/janniks)',
    base00: '#031A16',
    base01: '#0B342D',
    base02: '#184E45',
    base03: '#2B685E',
    base04: '#5F9C92',
    base05: '#81B5AC',
    base06: '#A7CEC8',
    base07: '#D2E7E4',
    base08: '#3E9688',
    base09: '#3E7996',
    base0A: '#3E4C96',
    base0B: '#883E96',
    base0C: '#963E4C',
    base0D: '#96883E',
    base0E: '#4C963E',
    base0F: '#3E965B'
  };


  private searchGroupsByKeyValue(key: keyof GroupInfo, value: string) {
    let result: any[] = [];
    // perform substring search for every group in data.scientistpersonnel.group.
    // If the  group[key] === "Linear Algebra" and value === "Linear" then it will return true
    try {
      this.props.json.scientistpersonnel.group.forEach(group => {
        if (group[key].toLowerCase().includes(value.toLowerCase())) {
          result.push(group);
        }
      });
    } catch (e) {
      this.state.isJsonToExportValid = false;
      window.electron.ipcRenderer.sendMessage('show-error-dialog', ["Error while searching. Please check your file"]);
    }
    // typescript things that jsonSearchRes is readonly, so we need to suppress it
    // @ts-ignore
    this.state.jsonSearchRes = result;
  }

  openSaveDialog = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.electron.ipcRenderer.sendMessage('export-to-html', [this.state.jsonSearchRes]);
  }

  constructor(props: any) {
    super(props);
    this.fileInputRef = React.createRef();

    this.state = {
      nameSearch: '',
      departmentSearch: '',
      branchSearch: '',
      chairSearch: '',
      daySearch: '',
      timeSearch: '',
      headmanSearch: '',
      courseSearch: '',
      subjectSearch: '',
      leaderSearch: '',
      jsonSearchRes: {},
      isJsonToExportValid: true,
    }

  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-4">
            <h1 className="text-white">File load</h1>
            <form onSubmit={(e) => {
              e.preventDefault();

              let selectedFilePath = "";
              try {
                // @ts-ignore
                selectedFilePath = this.fileInputRef.current.files[0].path;
              } catch (err) {
                window.electron.ipcRenderer.sendMessage("show-error-dialog", ["Please select a file"]);
                return;
              }



              window.electron.ipcRenderer.sendMessage('xml-uploaded', [selectedFilePath]);
              alert(
                // @ts-ignore
                `Selected file - ${this.fileInputRef.current.files[0].name}`
              );
            }}>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label text-white">Please, select the XML file:</label>
                {/*// @ts-ignore*/}
                <input className="form-control" type="file" accept="text/xml" id="formFile" ref={this.fileInputRef}/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>


          </div>
          <div className="col-8">
            <div className={"d-flex justify-content-between"}>
              <h2 className="text-white">File preview</h2>
            </div>
            {/*@ts-ignore*/}
            <JSONTree data={this.props.json || {}} theme={this.theme}/>

          </div>
        </div>

        {this.props.isJsonLoaded ? <div className="row">
          <div className={"mt-5 col-4"}>
            <h3 className={"text-white"}>Search needed info</h3>
            <form onSubmit={e => {
              e.preventDefault();
            }}>
              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp"
                       placeholder="Enter name" value={this.state.nameSearch} onChange={e => {
                  this.setState({nameSearch: e.target.value})
                  this.searchGroupsByKeyValue('name', this.state.nameSearch);
                }}/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputDepartment1"
                       aria-describedby="departmentHelp"
                       placeholder="Enter department" value={this.state.departmentSearch} onChange={e => {
                  this.setState({departmentSearch: e.target.value})
                  this.searchGroupsByKeyValue('department', this.state.departmentSearch);
                }}/>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputBranch" aria-describedby="branchHelp"
                       placeholder="Enter branch" value={this.state.branchSearch} onChange={e => {
                  this.setState({branchSearch: e.target.value})
                  this.searchGroupsByKeyValue('branch', this.state.branchSearch);
                }}/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputChair" aria-describedby="chairHelp"
                       placeholder="Enter chair" value={this.state.chairSearch} onChange={e => {
                  this.setState({chairSearch: e.target.value})
                  this.searchGroupsByKeyValue('chair', this.state.chairSearch);
                }}/>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputDay" aria-describedby="dayHelp"
                       placeholder="Enter day" value={this.state.daySearch} onChange={e => {
                  this.setState({daySearch: e.target.value})
                  this.searchGroupsByKeyValue('day', this.state.daySearch);
                }}/>
              </div>


              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputTime" aria-describedby="timeHelp"
                       placeholder="Enter time" value={this.state.timeSearch} onChange={e => {
                  this.setState({timeSearch: e.target.value})
                  this.searchGroupsByKeyValue("time", this.state.timeSearch);
                }}/>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputHeadman" aria-describedby="headmenHelp"
                       placeholder="Enter headman" value={this.state.headmanSearch} onChange={e => {
                  this.setState({headmanSearch: e.target.value})
                  this.searchGroupsByKeyValue("headman", this.state.headmanSearch);
                }}/>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputCourse" aria-describedby="courseHelp"
                       placeholder="Enter course" value={this.state.courseSearch} onChange={e => {
                  this.setState({courseSearch: e.target.value})
                  this.searchGroupsByKeyValue("course", this.state.courseSearch);
                }}/>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputSubject" aria-describedby="subjectHelp"
                       placeholder="Enter subject" value={this.state.subjectSearch} onChange={e => {
                  this.setState({subjectSearch: e.target.value})
                  this.searchGroupsByKeyValue("subject", this.state.subjectSearch);
                }}/>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="exampleInputLeader" aria-describedby="leaderHelp"
                       placeholder="Enter leader" value={this.state.leaderSearch} onChange={e => {
                  this.setState({leaderSearch: e.target.value})
                  this.searchGroupsByKeyValue("leader", this.state.leaderSearch);
                }}/>
              </div>
            </form>
          </div>
          <div className={"col-8 mt-5 "}>

            <div className={"d-flex justify-content-between"}>
              <h3 className={"text-white"}>Search results</h3>
              <button className="btn btn-secondary" disabled={!this.state.isJsonToExportValid} onClick={this.openSaveDialog}>Export to HTML</button>
            </div>
            <pre className={"text-white"}>{JSON.stringify(this.state.jsonSearchRes || "No results yet", null, 2)}</pre>
          </div>
        </div> : null}
      </div>
    )
  }
}
