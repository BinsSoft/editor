import React from 'react';
import { connect } from 'react-redux';
import EditorHeader from '../elements/editor/EditorHeader.component';
import EditorSnippet from '../elements/editor/EditorSnippet.component';
import EditorViewer from '../elements/editor/EditorViewer.component';
class Editor extends React.Component {

    render() {

        return (
            <div className="row editor-container">
                <div className="col-md-6 col-xs-12 column-one">
                    <EditorHeader />
                    <br />
                    <EditorSnippet/>
                </div>
                <div className="col-md-6 col-xs-12">
                    <EditorViewer/>
                </div>
            </div>
        );
    }
}
export default connect()(Editor);