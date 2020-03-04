import React, { Component } from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="alert alert-danger">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                   Không tìm thấy trang
                </div>
            </div>
            
        );
    }
}

export default NotFoundPage;
