import React from 'react'
import Loader from '../../elements/Loader/Loader.component'
class EditorHeader extends React.Component {

    constructor() {
        super();
        this.state = {
            editMode: false,
            snippet: JSON.parse(sessionStorage.getItem('_sc')),
        }
    }
    render() {
        return (
            <React.Fragment>
               <div className="editor-header">
                <div className="row">
                    <div className="col-md-3 col-xs-12">
                        { this.state.editMode === false &&
                        <div>
                            <span className="title">{this.state.snippet.name}</span>&nbsp;
                            <span className="header-icon" onClick={()=>{
                                this.setState({editMode:true})
                            }}><i className="fa fa-pencil"></i></span>
                        </div>
                        }
                        { this.state.editMode === true &&
                        <div>
                            <input type="text" id="snippet_name" className="name-control" defaultValue={this.state.snippet.name}/>
                            <span className="header-icon" onClick={()=>{
                                let snippet = this.state.snippet;
                                let newName = document.getElementById('snippet_name').value;
                                if (newName) {
                                    snippet.name = newName;
                                    this.setState({'snippet':snippet});
                                    sessionStorage.setItem('_sc', JSON.stringify(snippet) );
                                }

                                this.setState({editMode:false})
                            }}><i className="fa fa-floppy-o"></i></span>
                        </div>
                        }
                        
                    </div>
                    <div className="col-md-6 col-xs-12 text-center">
                        <Loader />
                    </div>
                    <div className="col-md-3 col-xs-12 text-right">
                    {/* <span className="header-icon"><i className="fa fa-floppy-o"></i></span>&nbsp;
                    <span className="header-icon"><i className="fa fa-play"></i></span> */}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default EditorHeader;