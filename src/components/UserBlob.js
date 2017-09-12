import React, {Component} from 'react';
import './UserBlob.css';

class UserBlob extends Component {
    render() {
        return (
            <div className="blob-container">
                <div className="blob-count-container">
                    <h1>{this.props.numUsers}</h1>
                    <h3>{this.props.numUsers == 1 ? 'person' : 'people'} drawing</h3>
                </div>
                <div className="blobs">
                    <div className="blob"></div>
                    <div className="blob"></div>
                    <div className="blob"></div>
                </div>
            </div>
        )
    }
}

export default UserBlob;