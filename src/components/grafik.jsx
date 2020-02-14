import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Col, Row, Container } from "react-bootstrap";
import { GiPlainCircle } from "react-icons/gi";

const COLORS = ['red', 'rgb(255,180,0)', 'green'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class Grafik extends React.Component {
    state = {
        data: this.props.data,
        dataUlasan : this.props.dataUlasan
    }
  render() {
    return (
        <Container style={{marginTop: "30px"}}>
            <Row>
                <Col md={6} xs={12}>
                    <Container>
                    <Row>
                        <Col>
                            <h5 style={{
                                textAlign:"center", 
                                marginTop:"30px"
                            }}><strong>Data Status Keluhan</strong></h5>
                        </Col>
                    </Row>
                    </Container>
                    <Container>
                    <Row>
                    <Col xs="auto">
                    <PieChart width={300} height={300} style={{marginLeft:"auto", marginRight:"auto"}}>
                        <Pie
                        data={this.state.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        >
                            <Tooltip />
                        {
                            this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                    </PieChart>
                    </Col>
                    <Col style={{minHeight: "70px"}}>
                        <div style={{position: "absolute", top: "50%", transform: "translateY(-50%)"}}>
                        <h6><GiPlainCircle style={{color:"red", paddingBottom:"3px"}}/> Keluhan Diterima</h6>
                        <h6><GiPlainCircle style={{color:"rgb(255,180,0)", paddingBottom:"3px"}}/> Sedang Diproses</h6>
                        <h6><GiPlainCircle style={{color:"green", paddingBottom:"3px"}}/> Laporan Selesai</h6>
                        </div>
                    </Col>
                    </Row>
                    </Container>
                </Col>
                <Col md={6} xs={12}>
                    <Container>
                        <Row>
                            <Col>
                                <h5 style={{textAlign:"center", marginTop:"30px"}}>
                                    <strong>Data Ulasan Keluhan</strong>
                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="auto">
                                <PieChart width={300} height={300} style={{marginLeft:"auto", marginRight:"auto"}}>
                                    <Pie
                                    data={this.state.dataUlasan}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={130}
                                    fill="#8884d8"
                                    dataKey="value"
                                    >
                                        <Tooltip />
                                    {
                                        this.state.dataUlasan.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                    </Pie>
                                </PieChart>
                            </Col>
                            <Col style={{minHeight: "70px"}}>
                                <div style={{position: "absolute", top: "50%", transform: "translateY(-50%)"}}>
                                    <h6><GiPlainCircle style={{color:"green", paddingBottom:"3px"}}/> Puas</h6>
                                    <h6><GiPlainCircle style={{color:"red", paddingBottom:"3px"}}/> Kurang Puas</h6>
                                    <h6><GiPlainCircle style={{color:"rgb(255,180,0)", paddingBottom:"3px"}}/> Belum Diulas</h6>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Grafik;
