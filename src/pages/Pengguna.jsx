import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { store, actions } from "../store/store";
import { Container } from "react-bootstrap";
import Header from "../components/header";
import NavigasiAdmin from "../components/navigasi";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import '../styles/pengguna.css';


class Pengguna extends Component {
    // inisiasi variabel di state untuk digunakan dalam halaman pengguna
    state = {
        halaman: '',
        perHalaman: '',
        totalHalaman: '',
        memuat: false,
        pengguna: [],
        penggunaHeader: [{ 
            ID: '', 
            Nama: '', 
            Email: '', 
            Telepon: '', 
            Diperbarui: '',
            Status: '',
            Verifikasi: ''
        }]
    }

    componentDidMount = () => {
        // jika admin tidak memiliki token, maka akan diarahkan untuk ke halaman '/masuk'
        if (localStorage.getItem("token") === null) {
        this.props.history.push("/masuk");
        }

        // fungsi untuk menampilkan seluruh data pengguna
        const req = {
        method: 'get',
        url: `https://api.lokesal.online/admin/pengguna?${
                this.state.halaman === '' ? '' : `halaman=${this.state.halaman}`
                }&${
                    this.state.perHalaman === '' ? '' : `per_halaman=${this.state.perHalaman}`
                    }`,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: {kota: store.getState().namaKota}
        };

        axios(req)
        .then((response) => {
        this.setState({
            'halaman': response.data.halaman,
            'perHalaman': response.data.per_halaman,
            'totalHalaman': response.data.totaal_halaman,
            'pengguna': response.data.daftar_pengguna
        })
        console.log('ini respons', response.data)
        })
    }

    // fungsi keluar dari akun admin
    penangananKeluar = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        this.props.history.push("/masuk")
    }

    // membuat header untuk tabel pengguna
    renderTabelHeader() {
        let header = Object.keys(this.state.penggunaHeader[0])
        return header.map((key, index) => {
        return <Th key={index}>{key.toUpperCase()}</Th>
        })
    }
        
    render() {
        return (
        <React.Fragment>
            <Header penangananKeluar={this.penangananKeluar}/>
            <NavigasiAdmin 
                keluhan={false} 
                berita={false} 
                pengguna={true} 
                komentar={false} 
                kustomisasi={false} 
            />
            <Container style={{marginTop:'50px', marginBottom:'10px'}}>
                <h3 id='title'>Tabel Pengguna {store.getState().namaKota}</h3>
                <Table id='pengguna'>
                    <Thead>
                        <Tr>
                        {this.renderTabelHeader()}
                        </Tr>
                    </Thead>
                    {/* <Tbody>
                        {this.state.pengguna.map((item) => (
                        <BarisPengguna 
                            id={item.detail_pengguna.id} 
                            namaDepan={item.detail_pengguna.nama_depan}
                            namaBelakang={item.detail_pengguna.nama_belakang}
                            email={item.detail_pengguna.email}
                            telepon={item.detail_pengguna.telepon}
                            diperbarui={item.detail_pengguna.diperbarui}
                            status={item.detail_pengguna.status}
                            verifikasi={item.detail_pengguna.verifikasi}
                        />
                        ))}
                    </Tbody> */}
                </Table>
            </Container>
        </React.Fragment>
        );
    }
}

export default connect("namaKota", actions)(withRouter(Pengguna));