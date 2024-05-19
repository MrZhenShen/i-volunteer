import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/volunteersActions';

/**
 * Higher-order component to inject volunteers state and actions as props.
 * 
 * @param {React.Component} WrappedComponent - The component to wrap.
 */
const WithVolunteers = (WrappedComponent) => {
    class HOC extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state) => ({
        volunteers: state.volunteers.volunteersData.volunteers,
        loading: state.volunteers.volunteersData.loading,
        error: state.volunteers.volunteersData.error,
    });

    const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default WithVolunteers;

