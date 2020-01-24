import React from 'react';
import { connect } from 'react-redux';

class Editor extends React.Component {
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
                html: '',
                css: '',
                script: '',
                external: []
            }
        }
    }
    runYourCode = () => {
        var html = document.getElementById("htmlEditor");
        var css = document.getElementById("cssEditor");
        var js = document.getElementById("scriptEditor");
        var code = document.getElementById("run_code_iframe").contentWindow.document;
        this.props.dispatch({
            type: 'SHOW_HIDE',
            status: true
        })
        new Promise((resolve, reject) => {
            this.setState({
                editorCodeElement: {
                    ...this.state.editorCodeElement,
                    html: html.innerText,
                    css: css.innerText,
                    script: js.innerText
                }
            });
            resolve(true);
        }).then(() => {
            setTimeout(() => {
                this.props.dispatch({
                    type: 'SHOW_HIDE',
                    status: false
                });

                let externalContent = '';
                this.state.editorCodeElement.external.map((item) => {
                    if (item.type == 'script') {
                        externalContent += `<script src="` + item.value + `"></script>`
                    } else if (item.type == 'css') {
                        externalContent += `<link rel="stylesheet" href="` + item.value + `"/>`
                    }
                });
                try {


                    code.open();
                    code.writeln(
                        this.state.editorCodeElement.html +
                        " " +
                        externalContent +
                        ((this.state.editorCodeElement.css) ? "<style>" +
                            this.state.editorCodeElement.css +
                            "</style>" : "") +
                        ((this.state.editorCodeElement.script) ?
                            "<script>" +
                            this.state.editorCodeElement.script +
                            "</script>" : "")
                    );
                    code.close();
                } catch(err) {
                    console.log(err);
                }
            }, 5000)

        })



    }
    render() {

        return (
            <div className="row editor-container">
                <div className="col-md-6 col-xs-12">
                    <br />
                    <div className="row">
                        <div className="col-md-9">
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={"btn btn-primary " + ((this.state.editorElement.html === true) ? "active" : "")}>
                                    <input type="radio" name="options" id="option1" autocomplete="off" onClick={() => {
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
                                    <input type="radio" name="options" id="option2" autocomplete="off" onClick={() => {
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
                                    <input type="radio" name="options" id="option3" autocomplete="off" onClick={() => {
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
                                    <input type="radio" name="options" id="option4" autocomplete="off" onClick={() => {
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
                            <button className="btn btn-primary" onClick={this.runYourCode}>&#x23f5; Run</button>
                        </div>
                    </div>
                    <div className="editor-code-container">
                        <div contentEditable id="htmlEditor" className={"form-control  " + ((this.state.editorElement.html === false) ? 'hidden' : '')} placeholder="Type your HTML"></div>
                        <div contentEditable id="scriptEditor" className={"form-control  " + ((this.state.editorElement.script === false) ? 'hidden' : '')} placeholder="Type your Script"></div>
                        <div contentEditable id="cssEditor" className={"form-control " + ((this.state.editorElement.css === false) ? 'hidden' : '')} placeholder="Type your CSS"></div>
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
                                        new Promise((resolve, reject) => {
                                            this.setState({
                                                editorCodeElement: {
                                                    ...this.state.editorCodeElement,
                                                    external: this.state.editorCodeElement.external.concat({
                                                        type: document.getElementById('ele_type').value,
                                                        value: document.getElementById('ele_value').value,
                                                    })
                                                }
                                            });
                                            resolve(true);
                                        }).then(() => {
                                            document.getElementById('ele_type').value = '';
                                            document.getElementById('ele_value').value = '';
                                        })


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
                <div className="col-md-6 col-xs-12 d-flex align-content-stretch flex-wrap">
                    <iframe id="run_code_iframe" className="iframe-code w-100"></iframe>
                </div>
            </div>
        );
    }
}
export default connect()(Editor);