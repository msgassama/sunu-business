import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'


const ProductPage = ({ match }) => {

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])


    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Retour</Link>
            {loading ?
                <Loader /> :
                error ?
                    <Message variant="danger">{`Page non trouvée`}</Message> :
                    (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {
                                            product.numReviews &&
                                            <Rating value={product.rating} text={`${product.numReviews} avis`} />
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Prix: {product.price}F CFA
                        </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={4}>Prix:</Col>
                                                <Col>{product.price}F CFA</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={4}>Status:</Col>
                                                <Col>{product.countInStock > 0 ? 'En Stock' : 'En rupture de Stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block btn-dark"
                                                type="button"
                                                disabled={product.countInStock === 0}
                                            >
                                                Ajouter au panier
                                </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </>
    )
}

export default ProductPage
