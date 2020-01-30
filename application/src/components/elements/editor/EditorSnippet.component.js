import React from 'react';
import { connect } from 'react-redux';
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import { Tabs, Tab } from "react-bootstrap";
class EditorSnippet extends React.Component {
    constructor() {
        super();
        this.editorInstance = {
            html: null,
            css: null,
            script: null,
            external: []
        }
        this.state = {
            editorElement: {
                html: true,
                css: false,
                script: false,
                external: false
            },

            editorCodeElement: {
                type: 'snippet',
                html: '',
                css: '',
                script: '',
                external: []
            }
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem('_sc')) {
            let snippetData = JSON.parse(sessionStorage.getItem('_sc'));
            // this.editorInstance.html = snippetData.html;
            this.setState({
                editorCodeElement: {
                    ...this.state.editorCodeElement,
                    html: snippetData.html,
                    css: snippetData.css,
                    script: snippetData.script,
                    external: snippetData.external
                }
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.runInit.action === 'init') {
            var snippetData = {};
            var html = document.getElementById("htmlEditor");
            var css = document.getElementById("cssEditor");
            var js = document.getElementById("scriptEditor");
            new Promise((resolve, reject) => {
                snippetData = {
                    ...this.state.editorCodeElement,
                    html: this.editorInstance.html,
                    css: this.editorInstance.css,
                    script: this.editorInstance.script
                };
                resolve(true);
            }).then(() => {
                this.props.dispatch({
                    type: 'GENERATE_SNIPPET',
                    snippetData: snippetData
                });
            });

        }
    }

    render() {
        return (
            <div className="editor-snippet-container">

                <div className="row">
                    <div className="col-md-9">
                        {/* <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={"btn btn-primary " + ((this.state.editorElement.html === true) ? "active" : "")}>
                                <input type="radio" name="options" id="option1" autoComplete="off" onClick={() => {
                                    this.setState({
                                        editorElement: {
                                            html: true,
                                            css: false,
                                            script: false,
                                            external: false
                                        }
                                    })
                                }} /> HTML
                                    </label>

                            <label className={"btn btn-primary " + ((this.state.editorElement.script === true) ? "active" : "")}>
                                <input type="radio" name="options" id="option2" autoComplete="off" onClick={() => {
                                    this.setState({
                                        editorElement: {
                                            html: false,
                                            css: false,
                                            script: true,
                                            external: false
                                        }
                                    })
                                }} /> Script
                                    </label>
                            <label className={"btn btn-primary " + ((this.state.editorElement.css === true) ? "active" : "")}>
                                <input type="radio" name="options" id="option3" autoComplete="off" onClick={() => {
                                    this.setState({
                                        editorElement: {
                                            html: false,
                                            css: true,
                                            script: false,
                                            external: false
                                        }
                                    })
                                }} /> CSS
                                    </label>
                            <label className={"btn btn-primary " + ((this.state.editorElement.external === true) ? "active" : "")}>
                                <input type="radio" name="options" id="option4" autoComplete="off" onClick={() => {
                                    this.setState({
                                        editorElement: {
                                            html: false,
                                            css: false,
                                            script: false,
                                            external: true
                                        }
                                    })
                                }} /> External
                                    </label>
                        </div> */}
                    </div>
                    <div className="col-md-3 text-right">

                    </div>
                </div>
                <div className="editor-code-container">
                    <Tabs defaultActiveKey="html" id="uncontrolled-tab-example">
                        <Tab eventKey="html" title="HTML">
                        <CodeMirror
                        value={this.state.editorCodeElement.html}
                        className={"form-control  "} placeholder="Type your HTML" options={{
                            mode: 'htmlmixed',
                            lineNumbers: true,
                            smartIndent: true,
                            autofocus: true
                        }} onChange={(editor, data, value) => { this.editorInstance.html = value }} />
                        </Tab>
                        <Tab eventKey="script" title="Script">

                        <CodeMirror
                        value={this.state.editorCodeElement.script}
                        className={"form-control  "} placeholder="Type your Script" options={{
                            mode: 'javascript',
                            lineNumbers: true,
                            smartIndent: true
                        }} onChange={(editor, data, value) => { this.editorInstance.script = value }} />
                        </Tab>
                        <Tab eventKey="css" title="CSS">

                        <CodeMirror
                        value={this.state.editorCodeElement.css}
                        className={"form-control "} placeholder="Type your CSS" options={{
                            mode: 'xml',
                            lineNumbers: true,
                            smartIndent: true
                        }} onChange={(editor, data, value) => { this.editorInstance.css = value }} />
                        </Tab>

                        <Tab eventKey="external" title="External">

                        <div id="externalEditor" className={"editor-element-container "}>
                        <div className="row">
                            <div className="col-md-3">
                                <select className="form-control" id="ele_type">
                                    <option value="">js / css</option>
                                    <option value="script">Script</option>
                                    <option value="css">CSS</option>
                                </select>
                            </div>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="ele_value" placeholder="Enter Link" />
                            </div>
                            <div className="col-md-2 text-right">
                                <button className="btn btn-primary " onClick={() => {
                                    let type = document.getElementById('ele_type');
                                    let value = document.getElementById('ele_value');
                                    if (type.value !== '' && value.value !== '') {
                                        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                                        if (regexp.test(value.value)) {
                                            new Promise((resolve, reject) => {
                                                this.setState({
                                                    editorCodeElement: {
                                                        ...this.state.editorCodeElement,
                                                        external: this.state.editorCodeElement.external.concat({
                                                            type: type.value,
                                                            value: value.value,
                                                        })
                                                    }
                                                });
                                                resolve(true);
                                            }).then(() => {
                                                type.value = '';
                                                value.value = '';
                                            })
                                        } else {
                                            this.props.dispatch({
                                                type: 'ERROR',
                                                message: 'Link is not valid'
                                            })
                                        }

                                    } else {

                                        this.props.dispatch({
                                            type: 'ERROR',
                                            message: 'Please add type and link '
                                        })
                                    }


                                }} ><i className="fa fa-plus-circle"></i></button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <table className="table">
                                    <tbody>
                                        {this.state.editorCodeElement.external.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td><span className={"badge " + ((item.type === 'css') ? 'badge-danger' : 'badge-success')}>{item.type}</span></td>
                                                    <td><a target="_blank" href={item.value}>{item.value}</a></td>
                                                    <td><button className="btn btn-danger btn-sm" onClick={() => {
                                                        let externalItem = this.state.editorCodeElement.external;
                                                        externalItem.splice(index, 1);
                                                        this.setState({
                                                            editorCodeElement: {
                                                                ...this.state.editorCodeElement,
                                                                external: externalItem
                                                            }
                                                        });
                                                    }}><i className="fa fa-times-circle"></i></button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
                
                        </Tab>
                    </Tabs>
                    
                    
                   
                
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        runInit: state.EditorReducer
    }
}
export default connect(mapStateToProps)(EditorSnippet);