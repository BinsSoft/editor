import React from 'react';
import { connect } from 'react-redux';
class EditorSnippet extends React.Component {
    constructor() {
        super()
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.runInit.action === 'init') {
            var snippetData = {};
            var html = document.getElementById("htmlEditor");
            var css = document.getElementById("cssEditor");
            var js = document.getElementById("scriptEditor");
            new Promise((resolve, reject) => {
                snippetData = {
                    ...this.state.editorCodeElement,
                    html: html.value,
                    css: css.value,
                    script: js.value
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
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
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
                        </div>
                    </div>
                    <div className="col-md-3 text-right">
                       
                    </div>
                </div>
                <div className="editor-code-container">
                    <textarea id="htmlEditor" className={"form-control  " + ((this.state.editorElement.html === false) ? 'hidden' : '')} placeholder="Type your HTML"></textarea>
                    <textarea id="scriptEditor" className={"form-control  " + ((this.state.editorElement.script === false) ? 'hidden' : '')} placeholder="Type your Script"></textarea>
                    <textarea id="cssEditor" className={"form-control " + ((this.state.editorElement.css === false) ? 'hidden' : '')} placeholder="Type your CSS"></textarea>
                    <div id="externalEditor" className={"editor-element-container " + ((this.state.editorElement.external === false) ? 'hidden' : '')}>
                        <div className="row">
                            <div className="col-md-3">
                                <select className="form-control" id="ele_type">
                                    <option value="">Select</option>
                                    <option value="script">Script</option>
                                    <option value="css">CSS</option>
                                </select>
                            </div>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="ele_value" placeholder="Enter Link" />
                            </div>
                            <div className="col-md-2 text-right">
                                <input type="button" value="Add" className="btn btn-primary " onClick={() => {
                                    let type = document.getElementById('ele_type');
                                    let value = document.getElementById('ele_value');
                                    if (type.value !== '' && value.value !== '') {
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
                                    }


                                }} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <table className="table">
                                    {this.state.editorCodeElement.external.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td><span class="badge badge-primary">{item.type}</span></td>
                                                <td><a href={item.value}>{item.value}</a></td>
                                                <td><button className="btn btn-danger btn-sm" onClick={() => {
                                                    let externalItem = this.state.editorCodeElement.external;
                                                    externalItem.splice(index, 1);
                                                    this.setState({
                                                        editorCodeElement: {
                                                            ...this.state.editorCodeElement,
                                                            external: externalItem
                                                        }
                                                    });
                                                }}>x</button></td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
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