import React from 'react';
import { withRouter } from "react-router-dom";
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';
import "moment-timezone";
import "moment/locale/id";

// component stateless untuk menampilkan isi masing-masing baris keluhan
const BarisKeluhan = props => {
  return (
    <Tr 
      onClick={() => props.history.push(`/keluhan/${props.id}`)} 
      style={{cursor:'pointer'}}
    >
      <Td>{props.id}</Td>
      <Td><strong>{props.namaDepan+' '+props.namaBelakang}</strong></Td>
      <Td>{props.status}</Td>
      <Td>{props.dukungan+""}</Td>
      <Td>{moment(`${props.diperbarui}Z`)
            .tz("Asia/Jakarta")
            .format("LL")}{", "}
          {moment(`${props.diperbarui}Z`).format("HH:mm")} WIB
      </Td>
    </Tr>
  );
}

export default withRouter(BarisKeluhan);