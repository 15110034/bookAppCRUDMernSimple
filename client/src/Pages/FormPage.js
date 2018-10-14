import React, { Component } from "react";
import Axios from "axios";
import { Input, Button2 } from "@key46/theme";

class FormPage extends Component {
  state = {
    isbn: "",
    title: "",
    author: "",
    description: "",
    publisher: "",
    updated_date: "",
    error: null
  };
  componentDidMount = async () => {
    const { match } = this.props;
    if (match.params.id) {
      try {
        const res = await Axios.get(`/api/books/${match.params.id}`);
        this.setState({ ...res.data });
      } catch (e) {
        alert("error", JSON.stringify(e.response));
      }
    }
  };

  onChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(event.target.name, name);

    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
    const { match } = this.props;
    if (match.params.id) {
      try {
        await this.validator();
        if (this.state.error) {
          return;
        } else {
          const res = await Axios.put(
            `/api/books/${match.params.id}`,
            this.state
          );
          alert(JSON.stringify(res.data));
        }
      } catch (e) {
        alert(JSON.stringify(e.response));
      }
    } else {
      try {
        await this.validator();
        if (this.state.error) {
          return;
        } else {
          const res = await Axios.post(`/api/books`, this.state);
          alert(JSON.stringify(res.data));
        }
      } catch (e) {
        alert(JSON.stringify(e.response));
      }
    }
  };

  onDelete = async () => {
    try {
      const { match, history } = this.props;

      const res = await Axios.delete(`/api/books/${match.params.id}`);
      alert(JSON.stringify(res.data));
      history.push(`/`);
    } catch (e) {
      alert(JSON.stringify(e.response));
    }
  };

  validator = async () => {
    const {
      isbn,
      title,
      author
      // description,
      // publisher,
      // updated_date
    } = this.state;
    let { error } = this.state;
    console.log(isbn, title, author, isbn.length, title.length, author.length);
    if (!isbn) {
      error = "isbn must not be empty";
      alert(error);
      this.setState({ error });
      return;
    }
    if (!title) {
      error = "title must not be empty";
      alert(error);

      this.setState({ error });
      return;
    }
    if (!author) {
      error = "author must not be empty";
      alert(error);

      this.setState({ error });
      return;
    }
    this.setState({ error: null });
    return;
  };
  render() {
    const {
      isbn,
      title,
      author,
      description,
      publisher,
      updated_date,
      error
    } = this.state;
    const { match } = this.props;
    return (
      <div className="key46--form">
        <Input
          inputLabel="isbn"
          inputValue={isbn}
          inputType="text"
          inputProps={{
            name: "isbn",
            onChange: this.onChange
          }}
        />
        <Input
          inputLabel="title"
          inputValue={title}
          inputType="text"
          inputProps={{
            name: "title",
            onChange: this.onChange
          }}
        />
        <Input
          inputLabel="author"
          inputValue={author}
          inputType="text"
          inputProps={{
            name: "author",
            onChange: this.onChange
          }}
        />
        <Input
          inputLabel="description"
          inputValue={description}
          inputType="text"
          inputProps={{
            name: "description",
            onChange: this.onChange
          }}
        />
        <Input
          inputLabel="publisher"
          inputValue={publisher}
          inputType="text"
          inputProps={{
            name: "publisher",
            onChange: this.onChange
          }}
        />
        <Input
          inputLabel="updated_date"
          inputValue={
            updated_date
              ? updated_date.slice(0, 16)
              : new Date().toISOString().slice(0, 16)
          }
          inputProps={{
            name: "updated_date",
            onChange: this.onChange,
            type: "datetime-local"
          }}
        />
        <p style={{ color: "red" }}>{error}</p>
        <Button2 onClick={this.onSubmit}>Submit</Button2>
        {match.params.id ? (
          <Button2 onClick={this.onDelete}>Delete</Button2>
        ) : null}
      </div>
    );
  }
}

export default FormPage;
