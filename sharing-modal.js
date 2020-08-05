import React, {useState } from 'react';
import {Modal, Container, Row, Col } from 'react-bootstrap';
import { FaShareAlt } from 'react-icons/fa';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon, EmailIcon } from 'react-share';

const Example = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        
        <>
            <FaShareAlt onClick={handleShow} style={{ cursor: 'pointer' }} className="share-icon"></FaShareAlt>
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    {props.source === undefined ? <Modal.Title>{props.title}</Modal.Title> : <Modal.Title ><h4><b>{props.source.toUpperCase()}</b></h4><p style={{margin: "0px"}}>{props.title}</p></Modal.Title> }
                    
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='share-via'>
                            Share Via
                        </Row>
                        <Row>
                            <Col xs={4} sm={4}>
                                <FacebookShareButton
                                    className="share-button"
                                    url={props.url}
                                    quote="#CSCI_571_NewsApp">
                                    <FacebookIcon size={60} round />
                                </FacebookShareButton>
                            </Col>
                            <Col xs={4} sm={4}>
                                <TwitterShareButton
                                    className="share-button"
                                    url={props.url}
                                    title="#CSCI_571_NewsApp">
                                    <TwitterIcon size={60} round />
                                </TwitterShareButton>
                            </Col>
                            <Col xs={4} sm={4}>
                                <EmailShareButton
                                    className="share-button"
                                    url={props.url}
                                    subject="#CSCI_571_NewsApp"
                                    >
                                    <EmailIcon size={60} round />
                                </EmailShareButton>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;