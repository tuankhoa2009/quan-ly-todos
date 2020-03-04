import React, { Component } from 'react';
import callApi from './../../utils/apiCaller';
import { connect } from 'react-redux';
import { actAddProductRequest, actGetProductRequest } from '../../actions';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        };
    }

    componentDidMount() //Sau khi xuất hiện component lấy id để thực hiên biding dữ liêu ra form
    {
        var { match } = this.props;
        if (match) {
            var id = match.params.id; //id trên url
            this.props.onEditProduct(id);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus: itemEditing.status
            })
        }

    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (event) => {
        event.preventDefault();
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history } = this.props;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id) //
        {
            callApi(`products/${id}`, 'PUT', {
                id: id,
                name: txtName,
                price: txtPrice,
                status: chkbStatus
            }).then(res => {    
                history.goBack();
            })

        } else {
            this.props.onAddProduct(product);
            history.goBack();
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <form onSubmit={this.onSave} >
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input type="text"
                                    className="form-control"
                                    name='txtName'
                                    value={this.state.txtName}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Giá</label>
                                <input type="number"
                                    className="form-control"
                                    name='txtPrice'
                                    value={this.state.txtPrice}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label >Trạng thái</label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox"
                                        name='chkbStatus'
                                        value={this.state.chkbStatus}
                                        onChange={this.onChange}
                                        checked={this.state.chkbStatus}
                                    />
                                    Còn hàng
                              </label>
                            </div>
                            <button type="submit" className="btn btn-primary">Lưu lại</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
  
        itemEditing: state.itemEditing
   
})


const mapDispatchToProps = (dispatch) => ({
    onAddProduct: (product) => {
        dispatch(actAddProductRequest(product));
    },
    onEditProduct: (id) => {
        dispatch(actGetProductRequest(id));
    }


})

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);