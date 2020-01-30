import React from 'react';
import { connect } from 'react-redux';
class EditorViewer extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.codeData.action === 'generate') {
            setTimeout(() => {
                var code = document.getElementById("run_code_iframe").contentWindow.document;
                this.props.dispatch({
                    type: 'SHOW_HIDE',
                    status: false
                });

                let externalContent = '';
                let codeElement = this.props.codeData.data;

                if (codeElement.type === 'snippet') {
                    codeElement.external.map((item) => {
                        if (item.type == 'script') {
                            externalContent += `<script src="` + item.value + `"></script>`
                        } else if (item.type == 'css') {
                            externalContent += `<link rel="stylesheet" href="` + item.value + `"/>`
                        }
                    });
                    try {


                        code.open();
                        code.writeln(
                            codeElement.html +
                            " " +
                            externalContent +
                            ((codeElement.css) ? "<style>" +
                            codeElement.css +
                                "</style>" : "") +
                            ((codeElement.script) ?
                                "<script>" +
                                codeElement.script +
                                "</script>" : "")
                        );
                        code.close();
                        this.props.dispatch({
                            type:'RUN_COMPLETE',
                            data:codeElement
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }

            }, 2000)
        }

    }

    render() {
        return (
            <div className="editr-viewr-container">
                <iframe id="run_code_iframe" className="iframe-code"></iframe>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        codeData: state.EditorReducer
    }
}
export default connect(mapStateToProps)(EditorViewer);