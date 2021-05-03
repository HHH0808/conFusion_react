import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedDishDetail: null
        }
    }



    renderDish(dish) {
        if (dish !=null) {
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle heading>{dish.name}</CardTitle>  
                        <CardText> {dish.description} </CardText>              
                    </CardBody>
                </Card>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    renderComments(comments) {
        const cmnts = comments.map(comment => {
            return(
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
            );
        })

        if (comments != null) {
            return(
                <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        {cmnts}
                    </ul>

                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    render() {
        const dish = this.props.dish
        if (dish != null) {
            return ( 
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            {this.renderDish(dish)}
                        </div>
                        {this.renderComments(dish.comments)}
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
}

export default DishDetail;