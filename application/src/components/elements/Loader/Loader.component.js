import React from 'react';
import { connect } from 'react-redux';
class Loader extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.status === true &&
                <div className="loader-container">
                    <div>Please wait, untill compiling </div>
                    <span className="loader"></span>
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
