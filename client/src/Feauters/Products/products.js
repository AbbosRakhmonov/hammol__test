import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {getProducts, getCategories} from "./productsSlice";
import Pagination from 'react-responsive-pagination';
import {useDispatch, useSelector} from "react-redux";
import "./style.css";
import {Link} from "react-router-dom";

function Products(props) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByCategory, setSearchByCategory] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const {products, total, categories, loading} = useSelector(state => state.products);
    const handePageChange = (page) => {
        setCurrentPage(page);
        let offset = (page - 1) * limit;
        setOffset(offset);
        dispatch(getProducts({
            offset: offset,
            name: searchByTitle,
            category: searchByCategory,
            limit: limit,
        }));
    }
    const handleCategoryChange = (e) => {
        setSearchByCategory(e.target.value);
        let str = searchByTitle.replace(/  +/g, ' ')
        dispatch(getProducts({
            offset: offset,
            name: str,
            category: e.target.value,
            limit: limit,
        }));
    }
    const handleTitleChange = (e) => {
        let str = e.target.value.replace(/  +/g, ' ')
        setSearchByTitle(e.target.value);
        dispatch(getProducts({
            offset: offset,
            name: str,
            category: searchByCategory,
            limit: limit,
        }));
    }
    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        let str = searchByTitle.replace(/  +/g, ' ')
        dispatch(getProducts({
            offset: offset,
            name: str,
            category: searchByCategory,
            limit: e.target.value,
        }));
    }
    const resetAll = () => {
        setSearchByTitle('');
        setSearchByCategory('');
        setLimit(10);
        dispatch(getProducts({
            offset: offset,
            name: "",
            category: "",
            limit: 10,
        }));
    }

    useEffect(() => {
        dispatch(getProducts({
            offset: offset,
            name: searchByTitle,
            category: searchByCategory,
            limit: limit,
        }));
        dispatch(getCategories());
    }, [])
    return (
        <Container>
            <Row className={'mt-3'}>
                <Col md={3}>
                    <Form.Control type="search" placeholder="search by name" value={searchByTitle}
                                  onChange={handleTitleChange}/>
                </Col>
                <Col md={3}>
                    <Form.Select aria-label="Default select example" value={searchByCategory}
                                 onChange={handleCategoryChange}>
                        <option value={''}>Sort by Category</option>
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>))

                        }
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select aria-label="Default select example" value={`${limit}`}
                                 onChange={handleLimitChange}>
                        <option value={"10"}>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Button variant="danger" disabled={searchByTitle === "" && searchByCategory === "" && limit === 10}
                            onClick={resetAll}>Clear</Button>
                </Col>
            </Row>
            <Row>
                {
                    loading ? <Col xs={12} className={'text-center my-5'}>
                        <Spinner animation="border" role="status" variant={'primary'}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col> : products.map(product => (
                        <Col xs md={6} lg={4} key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <div className="product-card">
                                    <div className="product-tumb">
                                        <img src={product.thumbnail} alt={product.title}/>
                                    </div>
                                    <div className="product-details">
                                        <span className="product-category">{product.category}</span>
                                        <h4>{product.title}</h4>
                                        <p>{product.description}</p>
                                        <div className="product-bottom-details">
                                            <div className="product-price">
                                                <small>${(product.price * 100 / Number(product.discountPercentage)).toFixed()}</small>${product.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Col xs={12}>
                    <Pagination
                        current={currentPage}
                        total={total}
                        onPageChange={handePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Products;