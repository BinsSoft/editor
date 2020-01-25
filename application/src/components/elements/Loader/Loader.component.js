import React from 'react';
import { connect } from 'react-redux';
class Loader extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.status === true &&
                <div className="loader-container">
                <i className="fa fa-circle-o-notch fa-spin"></i> Please wait, untill compiling
                </div>
                }
                
            </React.Fragment>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.LoaderReducer
    }
}
export default connect(mapStateToProps)(Loader);
