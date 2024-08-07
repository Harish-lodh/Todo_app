import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import { ChakraProvider, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: "",
      list: [],
      showAlert: false,
      alertMessage: "", 
      alertStatus: 'success', // New state for alert type (success, error, etc.)
    };
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Function to handle showing the alert
  handleAlert(message, status) {
    this.setState({
      showAlert: true,
      alertMessage: message,
      alertStatus: status,
    });

    // Hide the alert after 3 seconds
    setTimeout(() => this.setState({ showAlert: false }), 3000);
  }

  // Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),
        // Add a user value to list
        value: this.state.userInput,
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // Reset state
      this.setState({
        list,
        userInput: "",
      });

      // Show success alert
      this.handleAlert("The item has been added to your list.", "success");
    } else {
      // Show error alert
      this.handleAlert("Please enter notes or etc", "error");
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list];
    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    // Update list in state
    this.setState({
      list: updateList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  }

  render() {
    return (
      <ChakraProvider>
        <Container style={{
    
    boxSizing: 'border-box' // Ensure padding and border are included in the width and height
  }}
         >
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
              color: "Orangered",
            }}
          >
            TODO LIST
          </Row>

          <hr />
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="add item . . "
                  size="lg"
                  value={this.state.userInput}
                  onChange={(item) => this.updateInput(item.target.value)}
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                />
                <InputGroup>
                  <Button
                    style={{
                      backgroundColor: "green"
                    }}
                    className="mt-2"
                    onClick={() => this.addItem()}
                  >
                    ADD
                  </Button>
                </InputGroup>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <ListGroup>
                {/* map over and print items */}
                {this.state.list.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListGroup.Item
                        variant="dark"
                        action
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: "#E2EAF4",
                        }}
                      >
                        {item.value}
                        <span>
                          <Button
                            style={{
                              marginRight: "10px",
                              backgroundColor: "red"
                            }}
                            variant="light"
                            onClick={() => this.deleteItem(item.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "blue"
                            }}
                            variant="light"
                            onClick={() => this.editItem(index)}
                          >
                            Edit
                          </Button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
          <footer className="footer">
    
          {this.state.showAlert && (
  <Alert 
   
        status={this.state.alertStatus}
        style={{ 
          position: 'fixed', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 1000, 
          width: '500px', // Adjust the width as needed
        }}
      >
    <AlertIcon />
    <AlertTitle>{this.state.alertStatus === 'error' ? "Error!" : "Success!"}</AlertTitle>
    <AlertDescription>{this.state.alertMessage}</AlertDescription>
  </Alert>
)}
</footer>
        </Container>
      </ChakraProvider>
    );
  }
}

export default App;
