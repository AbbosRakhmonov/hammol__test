import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getProduct} from "./productSlice";
import {Col, Container, Row, Spinner, Table} from "react-bootstrap";

function Product({children}) {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {product, loading} = useSelector(state => state.product);
    useEffect(() => {
        const productId = Number(id);
        dispatch(getProduct(productId));
    }, [])
    return (
        <Container>
            <Row className={'mt-4'}>
                {
                    loading ? <Col xs={12} className={'text-center my-5'}>
                            <Spinner animation="border" role="status" variant={'primary'}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col> :
                        <>
                            <Col sx={8}>
                                <div className="product-img">
                                    <img src={product.thumbnail} alt={product.title} width={"100%"}/>
                                </div>
                                <Row className={"mt-3"}>
                                    {
                                        product && product.images.map((image, index) => (
                                            <Col key={index} xs={2} className={'mb-2'}>
                                                <img src={image} alt={product.title} width={"100%"} height={"100%"}/>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Col>
                            <Col sx={4}>
                                <h3>{product.title}</h3>
                                <hr/>
                                <p>{product.description}</p>
                                <Table striped bordered hover>
                                    <tbody>
                                    <tr>
                                        <th>Brand:</th>
                                        <td>{product.brand}</td>
                                    </tr>
                                    <tr>
                                        <th>Price:</th>
                                        <td>${product.price}</td>
                                    </tr>
                                    <tr>
                                        <th>Discount Percentage:</th>
                                        <td>%{product.discountPercentage}</td>
                                    </tr>
                                    <tr>
                                        <th>Rating</th>
                                        <td>{product.rating}</td>
                                    </tr>
                                    <tr>
                                        <th>Stock</th>
                                        <td>{product.stock}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{product.category}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </>
                }
            </Row>
        </Container>
    );
}

export default Product;