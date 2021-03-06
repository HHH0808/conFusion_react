import React, { Component }from 'react';
import { Card, CardImg, CardText, Button, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/basedUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


    function RenderDish({dish}) {
        if (dish !=null) {
            return(
                <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle heading>{dish.name}</CardTitle>  
                            <CardText> {dish.description} </CardText>              
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <=len);
    const minLength = (len) => (val) => (val) && (val.length >= len);
    
    class CommentForm extends Component { 
        
        constructor(props) {
            super(props);

            this.state = {
                isCommentModalOpen: false
            };
    
            this.toggleCommentModal = this.toggleCommentModal.bind(this);
            this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        }
    
        handleCommentSubmit(values) {
            this.toggleCommentModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);  
        }
    
        toggleCommentModal() {
            this.setState({
                isCommentModalOpen: !this.state.isCommentModalOpen
            });
        }
    
    
        render() {
            return (
                <React.Fragment>
                    <Button outline onClick={this.toggleCommentModal}>
                        <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                    </Button>
    
                        <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal} >
                        <ModalHeader toggle={this.toggleCommentModal}> Submit Comment </ModalHeader>
                        <ModalBody>
    
                            <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
    
                                    <Row className="form-group">
                                    <Label htmlFor="rating" md={12} >Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating"
                                            className="form-control"
                                            name="rating"
                                            id="rating"
                                            validators={{
                                                required
                                            }}
                                        >
                                            <option>Please Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model=".rating"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                            }}
                                        />
                                    </Col>
                                </Row>
    
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}> Your Name </Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
        
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".comment"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',
                                            }}
                                        />
                                    </Col>
                                </Row>
    
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm> 
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

    function RenderComments({ comments, postComment, dishId}) {

        if (comments != null) {
            return(
                <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        <Stagger in>
                           {comments.map((comment) => {
                                return(
                                    <Fade in>
                                        <li key={comment.id}>
                                            <p>{comment.comment}</p>
                                            <p>-- {comment.author},
                                            &nbsp;
                                            {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit'
                                            }).format(new Date(comment.date))}
                                            </p>
                                        </li>
                                    </Fade>
                                    );
                                })
                            } 
                        </Stagger>
                        
                        <CommentForm comments={comments} dishId={dishId} postComment={postComment}/>
                    </ul>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    const DishDetail =(props) => {
        if (props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return ( 
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'> Home </Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/menu'> Menu </Link></BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderDish dish ={props.dish} />
                        </div>
                        <RenderComments comments={ props.comments} 
                                        postComment = {props.postComment}
                                        dishId={props.dish.id}/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;