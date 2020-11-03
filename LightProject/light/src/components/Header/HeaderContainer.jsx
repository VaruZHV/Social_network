import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import { LogOutThunk} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => (
    {
     ...state.auth
    }
)
export default connect(mapStateToProps,
    {
        LogOutThunk
    })(HeaderContainer)
