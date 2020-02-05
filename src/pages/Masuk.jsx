import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { store } from '../store/store';
import logo from '../images/LOKESALtransparent.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css';

class Masuk extends Component {
    state = {
        email: "",
        kataSandi: "",
        // eslint-disable-next-line
        regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/,
        tampilkanSandi: false,
        loading: false
    }

    // fungsi untuk mengarahkan formulir masuk
    penangananMasuk = () => {
        this.setState({loading: true})
        const req = {
            method: 'post',
            url: 'https://api.lokesal.online/admin/masuk',
            headers: {'Content-Type': 'application/json'},
            data: {
                email: this.state.email,
                kata_sandi: this.state.kataSandi,
                kota: store.getState().namaKota
            }
        };
        axios(req)
        .then(function (response) {
            if (response.data.hasOwnProperty('token')) {
            localStorage.setItem('adminId', response.data.id);
            localStorage.setItem('token', response.data.token);
            this.props.history.push('/');
            }
            console.log('response data', response.data);
        })
        .catch(function (error) {
            swal({
                title: "Admin Gagal Masuk!",
                text: "Email atau password admin tidak valid",
                icon: "error"
            });
        });
    }

    componentDidMount = () => {
        if (localStorage.getItem("token") !== null) {
          this.props.history.push("/");
        }
    }
    render() {
        return (
        <React.Fragment>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img style={{ marginTop: '30px', marginBottom: '30px' }} src={logo} id="icon" alt="User Icon" />
                    </div>
                    {/* <!-- Formulir Masuk --> */}
                    <form onSubmit={e => e.preventDefault()}>
                        <Form.Group className="fadeIn second">
                        <Form.Label>Masukkan email anda</Form.Label>
                        <Form.Control
                            type="text"
                            id="email"
                            name="email"
                            onChange={e => this.setState({email: e.target.value})}
                            placeholder="email@domain.com"
                            className={
                            this.state.regexEmail.test(this.state.email) || this.state.email === ""
                            ? ""
                            : "masuk-email"
                            }
                        />
                        {
                            this.state.regexEmail.test(this.state.email) || this.state.email === ""
                            ? <div></div>
                            : <Form.Text className="masuk-emailtext">Format email anda salah</Form.Text>
                        }
                        </Form.Group>

                        <Form.Group className="fadeIn third">
                        <Form.Label>Masukkan password anda</Form.Label>
                        <Form.Control
                            type={this.state.tampilkanSandi ? "text" : "password"}
                            id="kataSandi"
                            name="kataSandi"
                            placeholder="*************"
                            onChange={e => this.setState({password: e.target.value})}
                        />
                        <div
                            className="masuk-tampilkanSandi"
                            onClick={() => {
                            this.state.tampilkanSandi
                            ? this.setState({tampilkanSandi: false})
                            : this.setState({tampilkanSandi: true})
                            }}
                        >
                            {this.state.tampilkanSandi ? <FaEye /> : <FaEyeSlash />}
                        </div>
                        </Form.Group>
                        
                        {
                        this.state.loading
                        ? <div className="masuk-spinner">
                            <Spinner animation="grow" variant="success" />
                        </div>
                        : <Button
                            variant="success"
                            style={{marginBottom:'30px'}}
                            className="fadeIn fourth"
                            type="submit"
                            onClick={() => this.penangananMasuk()}
                            disabled={
                            !this.state.regexEmail.test(this.state.email)
                            || this.state.email === ""
                            || this.state.kataSandi === ""
                            ? true
                            : false
                            }
                        >
                            Masuk
                        </Button>
                        }
                    </form>
                </div>
            </div>
        </React.Fragment>
        )
    };
}

export default withRouter(Masuk);